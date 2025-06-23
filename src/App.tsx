import './App.css'
import DisplayPanel from './components/DisplayPanel'
import MeetingRoom from './components/MeetingRoom'
DisplayPanel


function App() {

  return (
   <div className="flex w-screen h-screen p-4 box-border bg-gray-100">
      <MeetingRoom />
      <DisplayPanel />
    </div>
  )
}

export default App
