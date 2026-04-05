function Spinner({ text = "Loading...", fullScreen = true }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen bg-gray-50" : "py-10"
      }`}
    >
      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-orange-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>

      {/* Text */}
      {text && <p className="text-gray-500 text-sm font-medium">{text}</p>}
    </div>
  );
}

export default Spinner;
