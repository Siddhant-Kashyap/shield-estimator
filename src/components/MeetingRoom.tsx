import TableWithChairs from "./TableWithChairs";

export default function MeetingRoom() {
  return (
    <div className="flex-1 border border-gray-400 p-4 relative bg-white rounded-md shadow-md flex flex-col items-center ">
      <div style={{fontFamily:"Revalia"}} className="text-center font-bold  py-2 mb-4 rounded width-full">
        Travelopia
      </div>
      <TableWithChairs />
    </div>
  )
}
