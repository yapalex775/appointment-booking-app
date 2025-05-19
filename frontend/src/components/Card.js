import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className = '' }) => {
    const baseClasses = 'bg-white shadow-lg rounded-2xl p-6 w-full';
    const combinedClasses = twMerge(baseClasses, className);

    return <div className={combinedClasses}>{children}</div>;
};

export default Card;
