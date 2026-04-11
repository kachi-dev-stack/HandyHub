import { FiMail, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../auth";
import { login } from "../../firebase/auth/auth";
import PasswordInput from "../UIS/PasswordInput";
import { useAuth } from "../../AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import ErrorCard from "../UIS/ErrorCard";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [error, setError] = useState("");
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !role) return;

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/technicians");
    } else {
      navigate("/");
    }
  }, [user, role]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const timeout = setTimeout(() => {
      setLoading(false);
      setError("Unknown error occurred. Please try again.");
    }, 10000); // 10 seconds max wait

    try {
      await login(email, password);

      clearTimeout(timeout);
    } catch (err) {
      clearTimeout(timeout);

      setError(err?.message || "Unknown error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const resetEmail = prompt("Enter your email");

    if (!resetEmail) {
      alert("Please enter your email to reset your password.");
      return;
    }

    try {
      setLoadingReset(true);
      await sendPasswordResetEmail(auth, resetEmail);
      alert(`Password reset email sent to ${resetEmail}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className=" flex flex-col">
      <main className="flex-grow bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-12 ">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto ">
          <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-10 lg:p-12">
            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {/* ERROR*/}
            {error && <ErrorCard message={error} />}

            {/* Header */}
            <div className="text-center mb-8 sm:mb-10"></div>
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] mb-2">
                Welcome Back to HandyHub
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base md:text-lg">
                Login to access your account and find local technicians.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  disabled={loading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed w-full pl-12 pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all text-[#111827] placeholder-gray-400"
                  placeholder="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <PasswordInput
                disable={loading}
                placeholder="Password"
                Icon={FiLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/*  Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="#"
                  onClick={() => handleForgotPassword()}
                  className="text-sm text-[#1E3A8A] hover:text-[#F97316] transition-colors font-medium"
                >
                  {loadingReset ? "Sending..." : "Forgot password?"}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className=" disabled:cursor-not-allowed w-full bg-[#F97316] text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-[#ea580c] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer Text */}
            <div className="mt-6 text-center text-sm sm:text-base">
              <p className="text-[#6B7280]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#1E3A8A] font-semibold hover:text-[#F97316] transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
