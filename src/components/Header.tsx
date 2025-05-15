import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = (id: string) =>
    `hover:underline ${
      activeLink === id ? "text-purple-500 font-semibold" : ""
    }`;

  // Function to handle smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
    }
  };

  return (
    <nav className="bg-white text-black shadow sticky top-0 z-50 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">ConsiTrack</div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <ul className="hidden md:flex space-x-6 text-base">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className={linkClass("home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className={linkClass("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                className={linkClass("services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className={linkClass("contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen
              ? "absolute top-16 left-0 w-full bg-white z-40 p-4 shadow"
              : "hidden"
          } md:hidden`}
        >
          {" "}
          <ul className="flex flex-col space-y-4 text-base">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                  toggleMenu();
                }}
                className={linkClass("home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                  toggleMenu();
                }}
                className={linkClass("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                  toggleMenu();
                }}
                className={linkClass("services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                  toggleMenu();
                }}
                className={linkClass("contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
