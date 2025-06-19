/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";

type NewType = number;

interface ShipmentForm {
  shipperName: string;
  receiverName: string;
  shipperAddress: string;
  receiverAddress: string;
  pickupDate: string;
  deliveryDate: string;
  weight: NewType;
  package: string;
  shipmentMode: string;
  shipmentType: string;
  carrierMode: string;
}

interface ShipmentContextType {
  createShipment: (formData: ShipmentForm) => Promise<unknown>;
  getShipments: () => Promise<[]>;
  trackShipment: (trackingNumber: string) => Promise<unknown>;
  loading: boolean;
  error: string | null;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth(); // <- get user and loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShipment = async (formData: ShipmentForm) => {
    setLoading(true);
    setError(null);

    try {
      if (authLoading) throw new Error("Authentication still loading...");
      if (!user) throw new Error("User is not authenticated");

      // Always get fresh token before calling Edge Function!
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      const freshToken = session?.access_token;
      if (!freshToken) throw new Error("Could not get access token");

      const response = await fetch(
        "https://ddlyeqosflhwbyggnnxb.supabase.co/functions/v1/create-shipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freshToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create shipment");
      }

      return result.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      console.error("Create shipment error:", err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getShipments = async () => {
    setLoading(true);
    setError(null);

    try {
      if (authLoading) throw new Error("Authentication still loading...");
      if (!user) throw new Error("User is not authenticated");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      const freshToken = session?.access_token;
      if (!freshToken) throw new Error("Could not get access token");

      const response = await fetch(
        "https://ddlyeqosflhwbyggnnxb.supabase.co/functions/v1/get-shipment",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freshToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch shipments");
      }

      return result.data; // assuming array of shipments
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      console.error("Get shipments error:", err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const trackShipment = async (trackingNumber: string) => {
    setLoading(true);
    setError(null);

    try {
      if (authLoading) throw new Error("Authentication still loading...");
      if (!user) throw new Error("User is not authenticated");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const freshToken = session?.access_token;
      if (!freshToken) throw new Error("Could not get access token");

      const response = await fetch(
        "https://ddlyeqosflhwbyggnnxb.supabase.co/functions/v1/track-shipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freshToken}`,
          },
          body: JSON.stringify({
            tracking_number: trackingNumber,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to track shipment");
      }

      return result.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      console.error("Track shipment error:", err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShipmentContext.Provider
      value={{ createShipment, getShipments, trackShipment, loading, error }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = (): ShipmentContextType => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error("useShipment must be used within ShipmentProvider");
  }
  return context;
};
