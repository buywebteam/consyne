import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    console.log("Starting get-shipments function...");
    // Validate JWT from Authorization header
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
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
    // Create Supabase client for user authentication
    const supabaseAuth = createClient(
      supabaseUrl,
      Deno.env.get("ANON_KEY") || "",
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
    // Verify user authentication
    console.log("Verifying user authentication...");
    const { data: userData, error: userError } =
      await supabaseAuth.auth.getUser(token);
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
    // Create Supabase admin client to bypass RLS
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    console.log("Fetching shipments from DB...");
    const { data, error } = await supabaseAdmin
      .from("shipment") // your actual table name
      .select(
        `
        id,
        tracking_number,
        receiver_name,
        receiver_address,
        package,
        weight,
        carrier_mode,
        created_at
      `
      )
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });
    if (error) {
      console.error("DB error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch shipments",
          details: error.message,
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
    console.log(`Fetched ${data.length} shipments`);
    return new Response(
      JSON.stringify({
        success: true,
        data,
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
