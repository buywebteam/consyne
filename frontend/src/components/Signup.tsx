import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as needed
import { useState } from "react";

type SignupFormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await signup(data.email, data.password, data.displayName);

    if (error) {
      setError(error.message);
    } else {
      navigate("/email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register("displayName", {
                required: "Display name is required",
              })}
              placeholder="Enter Display Name"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.displayName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="name@example.com"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 rounded cursor-pointer hover:bg-orange-600"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
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
          © 2025 <span className="font-semibold text-gray-600">Consyne</span>.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
