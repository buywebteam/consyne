/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface ShipmentForm {
  shipperName: string;
  receiverName: string;
  shipperAddress: string;
  receiverAddress: string;
  pickupDate: string;
  deliveryDate: string;
  weight: string;
  package: string;
  shipmentMode: string;
  shipmentType: string;
  carrierMode: string;
}

interface ShipmentContextType {
  createShipment: (formData: ShipmentForm) => Promise<unknown>;
  loading: boolean;
  error: string | null;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShipment = async (formData: ShipmentForm) => {
    setLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await fetch(
        "https://ddlyeqosflhwbyggnnxb.supabase.co/functions/v1/create-shipment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // ✅ Use token from context
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

  return (
    <ShipmentContext.Provider value={{ createShipment, loading, error }}>
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
