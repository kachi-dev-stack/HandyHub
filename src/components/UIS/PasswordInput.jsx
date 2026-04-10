import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({ placeholder, Icon, value, onChange, disable }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {/* Left Icon */}
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-[#6B7280]" />
        </div>
      )}

      {/* Password Input */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        onChange={onChange}
        className={`disabled:opacity-50 disabled:cursor-not-allowed w-full pl-12 pr-12 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all text-[#111827] placeholder-gray-400`}
        required
      />

      {/* Eye Toggle */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1E3A8A]"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput;
