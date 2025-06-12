import { useEffect, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import Spinner from "./Spinner";

// Dummy mock data
const mockShipments = [
  {
    id: "TRK123456",
    receiverName: "John Doe",
    receiverAddress: "123 Main Street, Lagos",
    package: "Electronics",
    weight: 2.5,
    carrierMode: "Air",
    createdAt: new Date(),
  },
  {
    id: "TRK654321",
    receiverName: "Jane Smith",
    receiverAddress: "456 Elm Street, Abuja",
    package: "Clothing",
    weight: 1.2,
    carrierMode: "Road",
    createdAt: new Date(),
  },
  {
    id: "TRK789012",
    receiverName: "Mike Johnson",
    receiverAddress: "789 Maple Avenue, Port Harcourt",
    package: "Books",
    weight: 3.1,
    carrierMode: "Sea",
    createdAt: new Date(),
  },
];

const RecentShipment = () => {
  const [shipments, setShipments] = useState<typeof mockShipments>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      try {
        setShipments(mockShipments);
        setLoading(false);
      } catch {
        setError("Failed to load shipments.");
        setLoading(false);
      }
    }, 1000); // Simulate loading delay
  }, []);

  if (loading) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-600">
            <Spinner />
          </div>
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
                className="block lg:table-row border-t border-orange-100 text-sm bg-orange-50 text-gray-800 p-2"
              >
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">
                    Receiver Name:{" "}
                  </span>
                  {item.receiverName}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">
                    Receiver Address:{" "}
                  </span>
                  {item.receiverAddress}
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
                  {item.carrierMode}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">Date: </span>
                  {item.createdAt.toLocaleDateString()}
                </td>
                <td className="block lg:table-cell p-3 lg:p-3">
                  <span className="font-semibold lg:hidden">Time: </span>
                  {item.createdAt.toLocaleTimeString([], {
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
                      {item.id}
                    </span>
                    {copiedId === item.id ? (
                      <FiCheck
                        className="text-green-600"
                        size={18}
                        title="Copied"
                      />
                    ) : (
                      <FiCopy
                        className="text-gray-500 hover:text-gray-800"
                        size={18}
                        onClick={() => handleCopy(item.id)}
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
