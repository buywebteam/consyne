import { useState } from "react";
import { Menu, X, Truck, PlusSquare, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({
  onSelect,
  activePage,
}: {
  onSelect: (page: string) => void;
  activePage: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSelect = (page: string) => {
    onSelect(page);
    setIsOpen(false); // Close sidebar after navigation on mobile/tablet
  };

  const navItems = [
    { label: "Create Shipment", value: "create", icon: PlusSquare },
    { label: "Track Shipment", value: "track", icon: Truck },
  ];

  return (
    <>
      {/* Top bar for mobile & tablet */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center p-4 bg-orange-500 text-white">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-lg font-semibold">Dashboard</span>
      </div>

      {/* Sidebar (mobile + tablet via isOpen; large screens always visible) */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex flex-col justify-between w-64 bg-orange-500 text-white min-h-screen p-6 fixed lg:static z-20 top-0 left-0`}
      >
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center pt-16 lg:pt-10">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white text-black">
              <h1 className="text-5xl font-bold">
                {" "}
                {user?.user_metadata?.display_name?.charAt(0) ?? "?"}
              </h1>
            </div>
            <h2 className="mt-3 font-bold text-lg">
              {user?.user_metadata?.display_name}
            </h2>
            <p className="text-base">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="pt-8 space-y-3">
            {navItems.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded ${
                  activePage === value
                    ? "bg-white text-orange-500 font-semibold"
                    : "hover:bg-white hover:text-orange-500"
                }`}
              >
                <Icon size={24} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6">
          <button
            onClick={() => handleSelect("logout")}
            className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded ${
              activePage === "logout"
                ? "bg-white text-black font-semibold"
                : "hover:bg-white hover:text-orange-500"
            }`}
          >
            <LogOut size={24} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
