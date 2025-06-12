import { useState } from "react";
import CreateShipment from "./CreateShipment";
import TrackShipment from "./TrackShipment";
import LogoutModal from "./Logout";
import StickyTelegramIcon from "./TelegramIcon";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [selected, setSelected] = useState<string>(() => {
    const stored = localStorage.getItem("activePage");
    return stored && stored !== "logout" ? stored : "create";
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSelect = (page: string) => {
    if (page === "logout") {
      setShowLogoutModal(true);
    } else {
      setSelected(page);
      localStorage.setItem("activePage", page);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <CreateShipment />;
      case "track":
        return <TrackShipment />;
      default:
        return <p>Welcome to your dashboard!</p>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Fixed */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-40">
        <Sidebar onSelect={handleSelect} activePage={selected} />
      </div>

      {/* Main Content Scrollable */}
      <main className="lg:ml-64 flex-1 overflow-y-auto max-h-screen p-4 sm:p-5 py-20">
        {renderContent()}
      </main>

      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          localStorage.removeItem("activePage");
          window.location.href = "/";
        }}
      />

      <StickyTelegramIcon />
    </div>
  );
};

export default Dashboard;
