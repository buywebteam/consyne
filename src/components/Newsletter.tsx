import { useState } from "react";
import { db } from "../firebaseConfig/firebase"; // Adjust the import path
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: Timestamp.now(),
      });
      setEmail("");
      setSuccess(true);
      toast.success("Newsletter Subscribed successfully!");
    } catch (err) {
      console.error(err);
      setError("Subscription failed. Please try again.");
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-30 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 text-lg">
          Subscribe to our newsletter for the latest logistics news and offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full sm:w-2/3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Subscribing..." : "Subscribe"}{" "}
          </button>
        </form>{" "}
        {success && (
          <p className="text-green-600 mt-4 font-medium">
            You've been subscribed!
          </p>
        )}
        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Newsletter;
