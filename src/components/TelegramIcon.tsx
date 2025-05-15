import { FaTelegramPlane } from "react-icons/fa";

const StickyTelegramIcon = () => {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      <FaTelegramPlane size={32} />
    </a>
  );
};

export default StickyTelegramIcon;
