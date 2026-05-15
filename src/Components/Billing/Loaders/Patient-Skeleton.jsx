import React from 'react';

const PatientSkeleton = () => {
  // Hum 2 skeleton cards dikhayenge loading ke waqt
  const skeletonCards = [1, 2];

  return (
    <div className="space-y-3 animate-pulse">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-100 rounded-md shadow-sm p-3 flex flex-col gap-3"
        >
          {/* 1. Doctor Info Section Skeleton (gray background) */}
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="flex gap-4 items-center">
              {/* Doctor Photo Skeleton (Square with rounded corners) */}
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-md border-2 border-white shadow-sm flex-shrink-0" />

              <div className="flex-1 flex justify-between items-center">
                <div className="flex-1 space-y-2">
                  {/* Doctor Name Skeleton (Bold text line) */}
                  <div className="h-5 bg-gray-300 rounded w-3/4" />
                  {/* Doctor Type Skeleton (Smaller text line) */}
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>

                <div className="text-right ml-4">
                  {/* Total Patients Badge Skeleton (Rounded pill) */}
                  <div className="h-6 bg-gray-300 rounded-full w-20" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Table Section Skeleton */}
          <div className="overflow-x-auto">
            <div className="w-full space-y-2">
              {/* Table Header Skeleton */}
              <div className="flex gap-2 border-b border-gray-200 py-2">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>

              {/* Table Rows Skeleton (3 rows per card) */}
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex gap-2 py-2 items-center">
                  {/* Patient Name with Icon Skeleton */}
                  <div className="flex items-center gap-2 w-1/4">
                    <div className="w-3 h-3 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                  {/* Patient ID Skeleton */}
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                  {/* Appt Date Skeleton */}
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                  {/* Appt Time Skeleton */}
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientSkeleton;