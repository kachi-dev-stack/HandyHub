import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import { signup } from "../../auth";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../UIS/PasswordInput";
import { useAuth } from "../../AuthContext";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uiPasswordError, setUiPasswordError] = useState("");
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

    if (password !== confirmPassword) {
      setUiPasswordError("Passwords do not match. Try Again.");
      setTimeout(() => setUiPasswordError(""), 3000);
      return;
    }

    setLoading(true);

    try {
      const user = await signup(email, password);

      alert(
        `Verification email sent to ${user.email}. Please check your inbox and verify before logging`,
      );

      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // min-h-screen
    <div className=" flex flex-col">
      <main className="flex-grow bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-12 ">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] mb-2">
                Create your HandyHub account
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base md:text-lg">
                Join HandyHub to find verified local technicians near you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Full Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all text-[#111827] placeholder-gray-400"
                  required
                />
              </div>

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

              {/* Confirm Password */}
              <PasswordInput
                placeholder="Confirm Password"
                Icon={FiCheckCircle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* Error */}
              {uiPasswordError && (
                <p style={{ color: "red" }}>{uiPasswordError}</p>
              )}
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F97316] text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-[#ea580c] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* Footer Text */}
            <div className="mt-6 text-center text-sm sm:text-base">
              <p className="text-[#6B7280]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#1E3A8A] font-semibold hover:text-[#F97316] transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
