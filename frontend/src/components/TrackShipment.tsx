import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useAuth } from "../context/AuthContext";
import { useShipment } from "../context/ShipmentContext";

function TrackShipment() {
  const [trackingId, setTrackingId] = useState(
    () => sessionStorage.getItem("trackingId") || ""
  );
  const [shipmentData, setShipmentData] = useState<{
    id: string;
    status: string;
    shipperName: string;
    shipperAddress: string;
    receiverName: string;
    receiverAddress: string;
    package: string;
    weight: number | string;
    carrierMode: string;
    shipmentMode: string;
    shipmentType: string;
    pickupDate: string;
    deliveryDate: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const { user } = useAuth();
  const { trackShipment } = useShipment();

  useEffect(() => {
    sessionStorage.setItem("trackingId", trackingId);
  }, [trackingId]);

  // Define the expected type for the result of trackShipment
  type TrackShipmentResult = {
    tracking_number: string;
    status: string;
    shipper_name: string;
    shipper_address: string;
    receiver_name: string;
    receiver_address: string;
    package: string;
    weight: number | string;
    carrier_mode: string;
    shipment_mode: string;
    shipment_type: string;
    pickup_date: string;
    delivery_date: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchAttempted(true);
    setShipmentData(null);

    try {
      const result = (await trackShipment(
        trackingId.trim()
      )) as TrackShipmentResult | null;
      console.log("TrackShipment result:", result);

      if (result) {
        setShipmentData({
          id: result.tracking_number,
          status: result.status,
          shipperName: result.shipper_name,
          shipperAddress: result.shipper_address,
          receiverName: result.receiver_name,
          receiverAddress: result.receiver_address,
          package: result.package,
          weight: result.weight,
          carrierMode: result.carrier_mode,
          shipmentMode: result.shipment_mode,
          shipmentType: result.shipment_type,
          pickupDate: result.pickup_date,
          deliveryDate: result.delivery_date,
        });
      } else {
        setShipmentData(null);
        setError(null);
      }
    } catch (err: unknown) {
      console.error("TrackShipment error:", err);
      setShipmentData(null);
      if (err instanceof Error) {
        setError(err.message || "Failed to track shipment");
      } else {
        setError("Failed to track shipment");
      }
    } finally {
      setLoading(false);
    }
  };

  type ShipmentStatus =
    | "Pending"
    | "Picked Up"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "On Hold"
    | string;

  const getStatusColor = (status: ShipmentStatus): string => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Picked Up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Transit":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "On Hold":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      <div className="md:my-12 lg:mb-10 mb-10 text-center">
        <h1 className="md:text-4xl text-2xl font-bold">
          Welcome,{" "}
          <span className="text-orange-500">
            {user?.user_metadata?.display_name || "User"}!
          </span>
        </h1>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Track Your Shipment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !trackingId.trim()}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {error && searchAttempted && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 p-8 flex justify-center text-center">
          <div className="text-gray-600">
            <Spinner />
          </div>
        </div>
      )}

      {shipmentData && !loading && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tracking ID: {shipmentData.id}
            </h3>
            <div
              className={`inline-block px-6 py-3 rounded-full border-2 ${getStatusColor(
                shipmentData.status
              )}`}
            >
              <span className="text-lg font-bold">{shipmentData.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                Sender Information
              </h4>
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{shipmentData.shipperName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Address:</span>
                <p className="font-medium">{shipmentData.shipperAddress}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                Receiver Information
              </h4>
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{shipmentData.receiverName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Address:</span>
                <p className="font-medium">{shipmentData.receiverAddress}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-600">Package:</span>
                <p className="font-medium">{shipmentData.package}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Weight:</span>
                <p className="font-medium">{shipmentData.weight}kg</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Mode of Carrier:</span>
                <p className="font-medium">{shipmentData.carrierMode}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Mode of Shipment:</span>
                <p className="font-medium">{shipmentData.shipmentMode}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Type of Shipment:</span>
                <p className="font-medium">{shipmentData.shipmentType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Pickup Date:</span>
                <p className="font-medium">{shipmentData.pickupDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Delivery Date:</span>
                <p className="font-medium">{shipmentData.deliveryDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Shipment Status:</span>
                <p
                  className={`font-medium text-sm inline-block px-2 py-1 border rounded-full ${getStatusColor(
                    shipmentData.status
                  )}`}
                >
                  {shipmentData.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchAttempted && !shipmentData && !loading && !error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-800 font-medium">
            No shipment found with tracking ID: <strong>{trackingId}</strong>
          </div>
          <div className="text-sm text-yellow-600 mt-2">
            Please check your tracking ID and try again.
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackShipment;
