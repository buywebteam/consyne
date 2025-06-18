import { useState, useEffect } from "react";
import { useShipment } from "../context/ShipmentContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ShipmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  shipperName: string;
  shipperAddress: string;
  receiverName: string;
  receiverAddress: string;
  package: string;
  weight: string;
  pickupDate: string;
  deliveryDate: string;
  shipmentType: string;
  shipmentMode: string;
  carrierMode: string;
};

const CreateShipmentModal: React.FC<ShipmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createShipment, loading } = useShipment();
  const [formData, setFormData] = useState<FormData>({
    shipperName: "",
    shipperAddress: "",
    receiverName: "",
    receiverAddress: "",
    package: "",
    shipmentType: "",
    shipmentMode: "",
    carrierMode: "",
    weight: "",
    pickupDate: "",
    deliveryDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        shipperName: "",
        shipperAddress: "",
        receiverName: "",
        receiverAddress: "",
        package: "",
        shipmentType: "",
        shipmentMode: "",
        carrierMode: "",
        weight: "",
        pickupDate: "",
        deliveryDate: "",
      });
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createShipment(formData);
      toast.success("Shipment created successfully!");
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create shipment";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create New Shipment
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-2 gap-6 gap-x-4"
        >
          {[
            { label: "Shipper Name", name: "shipperName" },
            { label: "Shipper Address", name: "shipperAddress" },
            { label: "Receiver Name", name: "receiverName" },
            { label: "Receiver Address", name: "receiverAddress" },
            { label: "Package", name: "package" },
            { label: "Weight (kg)", name: "weight", type: "number" },
            { label: "Pickup Date", name: "pickupDate", type: "date" },
            { label: "Delivery Date", name: "deliveryDate", type: "date" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
                autoComplete="off"
              />
            </div>
          ))}

          <div>
            <label htmlFor="shipmentType" className="block mb-1 font-medium">
              Type of Shipment
            </label>
            <select
              name="shipmentType"
              id="shipmentType"
              value={formData.shipmentType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Type</option>
              <option value="International Shipment">
                International Shipment
              </option>
              <option value="Local Shipment">Local Shipment</option>
            </select>
          </div>

          <div>
            <label htmlFor="shipmentMode" className="block mb-1 font-medium">
              Mode of Shipment
            </label>
            <select
              name="shipmentMode"
              id="shipmentMode"
              value={formData.shipmentMode}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Mode</option>
              <option value="Air Freight">Air Freight</option>
              <option value="Road Freight">Road Freight</option>
              <option value="Sea Freight">Sea Freight</option>
            </select>
          </div>

          <div>
            <label htmlFor="carrierMode" className="block mb-1 font-medium">
              Mode of Carrier
            </label>
            <select
              name="carrierMode"
              id="carrierMode"
              value={formData.carrierMode}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Carrier</option>
              <option value="DHL">DHL</option>
              <option value="FedEx">FedEx</option>
              <option value="USPS">USPS</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-3 py-1 rounded text-sm text-white ${
                loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipmentModal;
