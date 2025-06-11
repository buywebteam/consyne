import { useNavigate } from "react-router-dom";

type LogoutModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onCancel }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    sessionStorage.clear();

    navigate("/home");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
