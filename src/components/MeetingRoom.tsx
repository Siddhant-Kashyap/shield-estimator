import { useState } from "react";
import TableWithChairs from "./TableWithChairs";

export default function MeetingRoom({ className = "" }: { className?: string }) {
  const [company, setCompany] = useState("MyCompany");
  const [editing, setEditing] = useState(false);

  return (
    <div className={`flex-1 border border-gray-400 p-4 relative bg-white rounded-md shadow-md flex flex-col items-center ${className}`}>
      <div style={{fontFamily:"Revalia"}} className="text-center font-bold py-2 mb-4 rounded w-full text-lg sm:text-2xl">
        {editing ? (
          <input
            className="bg-transparent border-b border-gray-400 outline-none text-center w-32 sm:w-48 text-lg sm:text-2xl font-bold"
            value={company}
            onChange={e => setCompany(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={e => { if (e.key === 'Enter') setEditing(false); }}
            autoFocus
            style={{ fontFamily: 'Revalia' }}
          />
        ) : (
          <span onClick={() => setEditing(true)} className="cursor-pointer select-text">{company}</span>
        )}
      </div>
      <TableWithChairs />
    </div>
  )
}
