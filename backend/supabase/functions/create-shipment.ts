import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    console.log("Starting create-shipment function...");
    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log("Request body parsed:", Object.keys(body));
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON body",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (!body) {
      return new Response(
        JSON.stringify({
          error: "Empty request body",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Extract and validate JWT
    const authHeader = req.headers.get("Authorization");
    const jwt = authHeader?.replace("Bearer ", "");
    if (!jwt) {
      console.error("No JWT token provided");
      return new Response(
        JSON.stringify({
          error: "Unauthorized - No JWT provided",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Get environment variables
    const supabaseUrl = Deno.env.get("PROJECT_URL");
    const supabaseServiceKey = Deno.env.get("SERVICE_ROLE_KEY");
    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    });
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing environment variables");
      return new Response(
        JSON.stringify({
          error: "Server configuration error",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Create Supabase client with service role (bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    // Create client for user authentication
    const supabaseAuth = createClient(
      supabaseUrl,
      Deno.env.get("ANON_KEY") || "",
      {
        global: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      }
    );
    // Verify user authentication
    console.log("Verifying user authentication...");
    const { data: userData, error: userError } =
      await supabaseAuth.auth.getUser(jwt);
    if (userError) {
      console.error("User verification error:", userError);
      return new Response(
        JSON.stringify({
          error: "Authentication failed",
          details: userError.message,
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    const userId = userData?.user?.id;
    if (!userId) {
      console.error("No user ID found");
      return new Response(
        JSON.stringify({
          error: "Could not get authenticated user",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    console.log("User authenticated:", userId);
    // Validate required fields
    const requiredFields = [
      "shipperName",
      "receiverName",
      "shipperAddress",
      "receiverAddress",
      "pickupDate",
      "deliveryDate",
      "weight",
      "package",
      "shipmentMode",
      "shipmentType",
      "carrierMode",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
          missingFields,
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Generate tracking number
    const trackingNumber = crypto.randomUUID().split("-")[0].toUpperCase();
    console.log("Generated tracking number:", trackingNumber);
    // Prepare shipment data
    const shipmentData = {
      tracking_number: trackingNumber,
      user_id: userId,
      shipper_name: body.shipperName,
      receiver_name: body.receiverName,
      shipper_address: body.shipperAddress,
      receiver_address: body.receiverAddress,
      pickup_date: body.pickupDate,
      delivery_date: body.deliveryDate,
      weight: parseFloat(body.weight) || 0,
      package: body.package,
      shipment_mode: body.shipmentMode,
      shipment_type: body.shipmentType,
      carrier_mode: body.carrierMode,
      status: "Shipment Created",
      history: JSON.stringify([
        {
          status: "Shipment Created",
          timestamp: new Date().toISOString(),
          location: "Processing Center",
        },
      ]),
      created_at: new Date().toISOString(),
    };
    console.log("Inserting shipment data...");
    // Insert shipment into database using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from("shipment") // Use your actual table name
      .insert([shipmentData])
      .select();
    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to create shipment",
          details: error.message,
          code: error.code,
          hint: error.hint,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    console.log("Shipment created successfully:", data);
    return new Response(
      JSON.stringify({
        success: true,
        data: data[0],
        message: "Shipment created successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
