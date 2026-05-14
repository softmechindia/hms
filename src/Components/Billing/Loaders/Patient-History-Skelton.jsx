import React from "react";

/**
 * Professional Skeleton Loader for Patient History Table
 * @param {number} rows - Number of shimmer rows to show (Default: 6)
 */
function PatientHistorySkeleton({ rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr 
          key={index} 
          className="animate-pulse border-b border-gray-100 last:border-0"
        >
          {/* S.No */}
          <td className="p-4">
            <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
          </td>

          {/* Date & Time */}
          <td className="p-4">
            <div className="flex flex-col items-center">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-14 bg-gray-100 rounded"></div>
            </div>
          </td>

          {/* App.ID */}
          <td className="p-4">
            <div className="h-4 w-28 bg-gray-200 rounded mx-auto"></div>
          </td>

          {/* Doctor Name */}
          <td className="p-4">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          </td>

          {/* Status Badge */}
          <td className="p-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full mx-auto"></div>
          </td>

          {/* Action Button */}
          <td className="p-4">
            <div className="h-8 w-16 bg-gray-200 rounded-md mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default PatientHistorySkeleton;