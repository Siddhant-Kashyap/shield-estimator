export default function DisplayPanel() {
  return (
    <div className="flex-[2] border border-gray-400 p-4 ml-4 flex flex-col justify-between bg-white rounded-md shadow-md">
      <div>
        <div className="text-3xl font-bold text-center border border-gray-400 p-4 mb-6 rounded">
          TASK
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border border-gray-400 p-2 rounded">
              John Doe - ?
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-24 h-10 border border-black rounded-full" />
        ))}
      </div>
    </div>
  )
}