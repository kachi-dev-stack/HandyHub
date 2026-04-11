function ErrorCard({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="w-full mb-4 animate-fade-in">
      <div className="flex items-center justify-center gap-3 p-3 rounded-xl border border-red-200 bg-red-50">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
          !
        </div>

        <p className="text-sm text-red-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

export default ErrorCard;
