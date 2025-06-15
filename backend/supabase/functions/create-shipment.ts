import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // Parse request body
    const body = await req.json();

    // Get token from headers
    const authHeader = req.headers.get("Authorization");
    const jwt = authHeader?.replace("Bearer ", "");

    if (!jwt) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 401,
      });
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get("PROJECT_URL");
    const supabaseServiceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase environment variables" }),
        { status: 500 }
      );
    }

    // Supabase client to get user from JWT
    const supabaseAuthClient = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        global: { headers: { Authorization: `Bearer ${jwt}` } },
      }
    );

    // Get the user
    const {
      data: { user },
      error: userError,
    } = await supabaseAuthClient.auth.getUser();

    if (userError || !user) {
      console.error("Failed to retrieve user:", userError);
      return new Response(
        JSON.stringify({ error: "Could not retrieve user from token" }),
        { status: 401 }
      );
    }

    // Separate client for inserting data (service role)
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Generate tracking number
    const trackingNumber = crypto.randomUUID().split("-")[0].toUpperCase();

    const shipmentData = {
      user_id: user.id,
      tracking_number: trackingNumber,
      shipper_name: body.shipperName,
      receiver_name: body.receiverName,
      shipper_address: body.shipperAddress,
      receiver_address: body.receiverAddress,
      pickup_date: body.pickupDate,
      delivery_date: body.deliveryDate,
      weight: body.weight,
      package: body.package,
      shipment_mode: body.shipmentMode,
      shipment_type: body.shipmentType,
      carrier_mode: body.carrierMode,
      history: [
        {
          status: "Shipment Created",
          timestamp: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("shipment")
      .insert([shipmentData])
      .select();

    if (error) {
      console.error("Insert error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to create shipment",
          details: error.message,
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({
        error: "Unexpected error",
        details: err.message || String(err),
      }),
      { status: 500 }
    );
  }
});
