// components/Loader.js
import React from 'react';

const Loader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
);

export default Loader;
