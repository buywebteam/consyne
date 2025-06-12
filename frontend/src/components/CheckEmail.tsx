import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const CheckEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // User is already confirmed/logged in
        navigate("/login");
      }
    };

    checkSession(); // Initial check when component mounts

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Check your email</h2>
      <p className="mb-6">
        We’ve sent you a confirmation email. Once you confirm, you’ll be
        redirected here.
      </p>
      <p className="text-sm text-gray-500">
        This page will auto-update when you’re confirmed.
      </p>
    </div>
  );
};

export default CheckEmail;
