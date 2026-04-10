function SuccessCard({ message, onClose }) {
  if (!message) return null;

  // return (
  //   <div className="w-full mb-4">
  //     <div className="flex items-start gap-3 p-3 rounded-xl border border-green-200 bg-green-50">
  //       {/* Icon */}
  //       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
  //         ✓
  //       </div>

  //       {/* Text */}
  //       <div className="flex-1">
  //         <p className="text-sm text-green-700 font-medium">{message}</p>

  //         {/* Optional close */}
  //         {onClose && (
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="text-xs text-green-600 hover:text-green-800 mt-1"
  //           >
  //             Dismiss
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full mb-4 animate-fade-in">
      <div className="flex items-center justify-center gap-3 p-3 rounded-xl border border-green-200 bg-green-50">
        <div className="w-8 h-8 flex items-center justify-center rounded-full  bg-green-100 text-green-600 font-bold">
          ✓
        </div>

        <p className="text-sm text-green-700 font-medium">{message}</p>
      </div>

      {/* Close button */}
      {/* {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-green-600 hover:text-green-800 text-xl font-bold leading-none"
          >
            ×
          </button>
        )} */}
    </div>
  );
}

export default SuccessCard;
