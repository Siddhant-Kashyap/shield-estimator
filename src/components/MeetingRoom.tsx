export default function MeetingRoom() {
  return (
    <div className="flex-1 border border-gray-400 p-4 relative bg-white rounded-md shadow-md">
      <div className="text-center font-bold border border-gray-400 py-2 mb-4 rounded">
        Company Name
      </div>
      <div className="relative w-28 h-[300px] mx-auto border border-black">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 bg-white border border-black rounded-full absolute"
            style={{
              ...(i === 0 && { top: 0, left: '50%', transform: 'translateX(-50%)' }),
              ...(i > 0 && i <= 6 && { top: `${i * 40}px`, left: 0 }),
              ...(i > 6 && { top: `${(i - 6) * 40}px`, right: 0 }),
            }}
          />
        ))}
      </div>
    </div>
  )
}
