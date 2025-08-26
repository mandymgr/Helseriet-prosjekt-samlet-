import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
        </div>
        <p className="text-lg text-gray-600">Laster side...</p>
      </div>
    </div>
  );
};

export default PageLoading;