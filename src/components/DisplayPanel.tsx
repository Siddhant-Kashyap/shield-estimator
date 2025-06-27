import { useState, useEffect } from "react";
import FancyButton from "./FancyButton";

export default function DisplayPanel() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex-[2] border border-gray-400 p-2 sm:p-4 ml-0 sm:ml-4 flex flex-col justify-between rounded-md shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      style={{ position: 'relative' }}
    >
      {/* Floating Toggle Button */}
      <button
        onClick={() => setDarkMode((d) => !d)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-gray-400 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
        style={{ fontSize: 28 }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          // Moon icon for dark mode
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-yellow-500">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </button>
      <div className="flex justify-between items-center mb-2">
        <div style={{ fontFamily: 'Honk' }} className="text-lg sm:text-3xl font-bold text-center border border-gray-400 p-2 sm:p-4 mb-4 sm:mb-6 rounded flex-1">
          MAR-4114
        </div>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2 sm:gap-4 text-center`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border border-gray-400 p-1 sm:p-2 rounded text-xs sm:text-base" style={{ fontFamily: 'Revalia' }}>
            John Doe - ?
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 flex-col items-center">
        <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
          {["1", "2", "3", "4"].map((label, i) => (
            <FancyButton key={i} label={label} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4">
          {["5", "8", "∞", "☕"].map((label, i) => (
            <FancyButton key={i} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}