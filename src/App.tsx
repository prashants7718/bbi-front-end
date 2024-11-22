import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
 import EmployeeSidebar from './components/Sidebar/EmployeeSidebar'
 
function App() {

  return (
    <div className='min-h-screen'>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<EmployeeSidebar />} />
      </Routes>
    </div>
  )
}

export default App
