import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.42.3/dist/module/index.js";
import { v4 as uuidv4 } from "https://deno.land/std@0.177.0/uuid/mod.ts";

// Run server
serve(async (req) => {
  try {
    const body = await req.json();

    // Get JWT from Authorization header
    const authHeader = req.headers.get("Authorization");
    const jwt = authHeader?.replace("Bearer ", "");

    if (!jwt) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Create Supabase client with JWT impersonation
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      }
    );

    // Generate tracking number
    const trackingNumber = uuidv4.generate().split("-")[0].toUpperCase();

    // Prepare insert data
    const shipmentData = {
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

    // Insert shipment
    const { error } = await supabase.from("shipments").insert([shipmentData]);

    if (error) {
      console.error("Insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create shipment" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ trackingNumber }), { status: 200 });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
});
