import { useState } from "react";
import { Menu, X, Truck, PlusSquare, LogOut } from "lucide-react"; // Import icons

const Sidebar = ({
  onSelect,
  activePage,
}: {
  onSelect: (page: string) => void;
  activePage: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSelect = (page: string) => {
    onSelect(page);
    setIsOpen(false);
  };

  // Add icons to nav items
  const navItems = [
    { label: "Create Shipment", value: "create", icon: PlusSquare },
    { label: "Track Shipment", value: "track", icon: Truck },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed lg:fixed top-0 left-0 right-0 z-30 flex items-center p-4 bg-orange-500 text-white cursor-pointer">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-lg font-semibold">Dashboard</span>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex flex-col justify-between w-64 bg-orange-500 text-white min-h-screen p-6 fixed left-0 right-0 md:static z-20 top-0 cursor-pointer`}
      >
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center sm:pt-10 pt-16">
            <div className="w-24 h-24 rounded-full  flex items-center justify-center bg-white text-black">
              <h1 className="text-5xl font-bold">K</h1>
            </div>
            <h2 className="mt-3 font-bold text-lg">Ken Akpo</h2>
            <p className="text-base">kennethakpo61@gmail.com</p>
          </div>

          {/* Navigation */}
          <nav className="pt-8 space-y-3">
            {navItems.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded cursor-pointer ${
                  activePage === value
                    ? "bg-black font-semibold"
                    : "hover:bg-white hover:text-orange-500"
                }`}
              >
                <Icon size={24} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6">
          <button
            onClick={() => handleSelect("logout")}
            className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded cursor-pointer ${
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
