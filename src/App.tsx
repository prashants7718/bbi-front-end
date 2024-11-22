import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { Roles } from './constant/enum'
 
function App() {
  //get role from cookies to send in dashboard

  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard role={Roles.EMPLOYEE}/>} />
      </Routes>
    </div>
  )
}

export default App
