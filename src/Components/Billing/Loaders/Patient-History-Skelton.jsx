import React from "react";

function PatientHistorySkeleton({ rows = 6 }) {
  // Shimmer effect ke liye inline CSS animation
  const shimmerStyle = `
    relative overflow-hidden before:absolute before:inset-0 
    before:-translate-x-full before:animate-[shimmer_2s_infinite] 
    before:bg-gradient-to-r before:from-transparent 
    before:via-white/40 before:to-transparent
  `;

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      {Array.from({ length: rows }).map((_, index) => (
        <tr 
          key={index} 
          className="border-b border-gray-100 last:border-0 bg-white"
        >
          {/* S.No - WhatsApp style rounded dots */}
          <td className="p-4">
            <div className={`h-4 w-4 bg-gray-200 rounded ${shimmerStyle}`}></div>
          </td>

          {/* Date & Time - Stacked subtle blocks */}
          <td className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className={`h-3 w-16 bg-gray-200 rounded ${shimmerStyle}`}></div>
              <div className={`h-2 w-12 bg-gray-100 rounded ${shimmerStyle}`}></div>
            </div>
          </td>

          {/* App.ID - Clean pill */}
          <td className="p-4">
            <div className={`h-3 w-24 bg-gray-200 rounded mx-auto ${shimmerStyle}`}></div>
          </td>

          {/* Doctor Name - Profile style wider block */}
          <td className="p-4">
            <div className={`h-3 w-32 bg-gray-200 rounded-sm mx-auto ${shimmerStyle}`}></div>
          </td>

          {/* Status Badge - Smooth rounded-full badge */}
          <td className="p-4">
            <div className={`h-5 w-16 bg-gray-100 rounded-full mx-auto ${shimmerStyle}`}></div>
          </td>

          {/* Action Button - Professional rectangular block */}
          <td className="p-4">
            <div className={`h-7 w-14 bg-gray-200 rounded-md mx-auto ${shimmerStyle}`}></div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default PatientHistorySkeleton;