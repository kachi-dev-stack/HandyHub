import { FiMail, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../auth";
import PasswordInput from "../UIS/PasswordInput";
import { useAuth } from "../../AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      setLoadingReset(true);
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    // min-h-screen
    <div className=" flex flex-col">
      <main className="flex-grow bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-12 ">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto ">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 lg:p-12">
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
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all text-[#111827] placeholder-gray-400"
                  placeholder="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <PasswordInput
                placeholder="Password"
                Icon={FiLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Remember Me & Forgot Password */}
              <div className="flex justify-end">
                {/* <div className="flex items-center mb-3 sm:mb-0">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-[#6B7280]"
                  >
                    Remember me
                  </label>
                </div> */}

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
                className="w-full bg-[#F97316] text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-[#ea580c] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
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
