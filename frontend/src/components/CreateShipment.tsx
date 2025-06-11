// import ShipmentStats from "./ShipmentStats";
import RecentShipment from "./RecentShipment";
import Button from "./Button";
import { useState } from "react";
import CreateShipmentModal from "./CreateShipmentModal";

function CreateShipment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="md:py-16 lg:py-2 py-8 md:text-center lg:text-left">
      <div className="md:my-10 lg:mb-12 mb-10">
        <h1 className="md:text-4xl text-2xl font-bold">
          Welcome, Kenneth Akpo
        </h1>
      </div>
      <h1 className="md:text-3xl text-xl font-bold mb-2">
        Manage Your Shipments
      </h1>
      <p className="text-gray-600 mb-6">
        Create, track, and manage all your shipments in one place.
      </p>

      <div className="mb-10 flex md:justify-center lg:justify-start">
        <Button label="Create Shipment" onClick={openModal} />
      </div>

      {/* <ShipmentStats /> */}
      <RecentShipment />
      <CreateShipmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default CreateShipment;
