import React from 'react';

const Loader = ({ size = 'default', color = 'blue' }) => {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        default: 'w-6 h-6 border-2',
        large: 'w-8 h-8 border-3',
    };

    const colorClasses = {
        blue: 'border-blue-500',
        white: 'border-white',
        gray: 'border-gray-500',
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
            ></div>
        </div>
    );
};

export default Loader;