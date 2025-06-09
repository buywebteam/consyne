import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              placeholder="Enter FullName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400">
          © Copyright 2025{" "}
          <span className="font-semibold text-gray-600">Consyne</span> All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
