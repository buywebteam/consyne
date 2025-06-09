import { FaTelegramPlane } from "react-icons/fa";

const StickyTelegramIcon = () => {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-white border border-orange-500 text-orange-500 p-3 rounded-full shadow-lg"
    >
      <FaTelegramPlane size={32} />
    </a>
  );
};

export default StickyTelegramIcon;
