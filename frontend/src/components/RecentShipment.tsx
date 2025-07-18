import { useEffect, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import Spinner from "./Spinner";
import { useShipment } from "../context/ShipmentContext"; // Adjust path if needed

interface Shipment {
  id: string;
  receiver_name: string;
  receiver_address: string;
  package: string;
  weight: number;
  carrier_mode: string;
  created_at: string;
  tracking_number: string;
}

const RecentShipment = () => {
  const { getShipments } = useShipment();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId).then(() => {
      setCopiedId(trackingId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [getShipments]);

  if (loading) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="flex justify-center items-center p-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-600">No shipments found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full">
      <h2 className="text-lg lg:text-xl font-semibold mb-4">
        Recent Shipments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="hidden lg:table-header-group">
            <tr className="bg-orange-200 text-left text-xs lg:text-sm text-gray-600">
              <th className="p-3 lg:p-4">Receiver Name</th>
              <th className="p-3 lg:p-4">Receiver Address</th>
              <th className="p-3 lg:p-4">Package</th>
              <th className="p-3 lg:p-4">Weight</th>
              <th className="p-3 lg:p-4">Mode of Carrier</th>
              <th className="p-3 lg:p-4">Date</th>
              <th className="p-3 lg:p-4">Time</th>
              <th className="p-3 lg:p-4">Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((item) => (
              <tr
                key={item.id}
                className="block lg:table-row border-t border-orange-100 text-xs bg-orange-50 text-gray-800 p-2 "
              >
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">
                    Receiver Name:{" "}
                  </span>
                  {item.receiver_name}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">
                    Receiver Address:{" "}
                  </span>
                  {item.receiver_address}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">Package: </span>
                  {item.package}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">Weight: </span>
                  {item.weight}kg
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">
                    Mode of Carrier:{" "}
                  </span>
                  {item.carrier_mode}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">Date: </span>
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3 whitespace-nowrap">
                  <span className="font-semibold lg:hidden">Time: </span>
                  {new Date(item.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <span>
                      <span className="font-semibold lg:hidden">
                        Tracking ID:{" "}
                      </span>
                      {item.tracking_number}
                    </span>
                    {copiedId === item.tracking_number ? (
                      <FiCheck
                        className="text-green-600"
                        size={18}
                        title="Copied"
                      />
                    ) : (
                      <FiCopy
                        className="text-gray-500 hover:text-gray-800"
                        size={18}
                        onClick={() => handleCopy(item.tracking_number)}
                        title="Copy tracking ID"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentShipment;
