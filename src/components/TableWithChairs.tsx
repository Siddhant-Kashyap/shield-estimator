import React from "react";
import useStore from "../hooks/userHooks";

const TableWithChairs: React.FC = () => {
  const players = useStore((state) => state.players);
  const revealed = useStore((state) => state.revealed);
  // Get current user id (assume stored in localStorage)
  const myId = window.localStorage.getItem('userId');
  // Adjusted table size to match w-45 (180px) and h-[340px]
  const tableWidth = 180; // px (w-45 = 180px)
  const tableHeight = 340; // px (h-[340px])
  const chairWidth = 56; // px (w-9)
  const chairHeight = 46; // px (h-6)
  const chairGap = 22; // px, space between table and chair
  const chairs = [];
  // 4 on left, 4 on right, 2 on top, 2 on bottom
  const positions = [
    // Top side (left to right, skip corners)
    ...Array.from({ length: 2 }, (_, i) => ({
      left: ((i + 1) * (tableWidth / 3)) - chairWidth / 2,
      top: -chairHeight - chairGap,
      rotate: 0,
    })),
    // Right side (top to bottom)
    ...Array.from({ length: 4 }, (_, i) => ({
      left: tableWidth + chairGap,
      top: ((i + 1) * (tableHeight / 5)) - chairHeight / 2,
      rotate: 90,
    })),
    // Bottom side (right to left, skip corners)
    ...Array.from({ length: 2 }, (_, i) => ({
      left: tableWidth - ((i + 1) * (tableWidth / 3)) - chairWidth / 2,
      top: tableHeight + chairGap,
      rotate: 180,
    })),
    // Left side (bottom to top)
    ...Array.from({ length: 4 }, (_, i) => ({
      left: -chairWidth - chairGap,
      top: tableHeight - ((i + 1) * (tableHeight / 5)) - chairHeight / 2,
      rotate: 270,
    })),
  ];
  for (let i = 0; i < 12; i++) {
    const pos = positions[i];
    let label = "";
    let cardDisplay = null;
    if (players[i]) {
      label = players[i].name.slice(0, 4).toUpperCase();
      if (players[i].card !== undefined) {
        if (revealed) {
          cardDisplay = (
            <span className="ml-1 text-green-700 font-bold">{players[i].card}</span>
          );
        } else if (players[i].id === myId) {
          cardDisplay = (
            <span className="ml-1 text-blue-700 font-bold">{players[i].card}</span>
          );
        } else {
          cardDisplay = (
            <span className="ml-1 text-gray-400 font-bold">??</span>
          );
        }
      }
    }
    chairs.push(
      <div
        key={i}
        className="absolute flex items-center justify-center shadow"
        style={{
          left: pos.left,
          top: pos.top,
          width: chairWidth,
          height: chairHeight,
          zIndex: 2,
          transform: `rotate(${pos.rotate}deg)`
        }}
      >
        <div
          className="w-full h-full  border-black rounded-b-md flex items-end justify-center bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/src/assets/chair.png')",
            backgroundColor: 'white',
          }}
        >
          <span className="text-xs font-bold text-gray-700 pb-1 bg-white bg-opacity-70 rounded px-1 flex items-center justify-center">
            {label}{cardDisplay}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-45 h-[340px] mt-40 mx-auto border border-black bg-[#C19A6B] rounded-md shadow-md">
      {chairs}
    </div>
  );
};

export default TableWithChairs;
