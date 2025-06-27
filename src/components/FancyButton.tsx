import React from "react";

interface FancyButtonProps {
  label: string;
}

const FancyButton: React.FC<FancyButtonProps> = ({ label }) => (
  <button
    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-3xl font-bold rounded-full group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 w-24 h-20 border border-black shadow-lg"
    style={{ fontFamily: 'Honk', fontSize: label === '∞' || label === '☕' ? '3.5rem' : '2rem' }}
  >
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent w-full h-full flex items-center justify-center">
      {label}
    </span>
  </button>
);

export default FancyButton;
