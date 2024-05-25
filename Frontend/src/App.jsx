
import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Home from './Components/Home'
import AddProject from './Components/AddProject'
import EditProjects from './Components/EditProjects'

function App() {
 

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/addProject' element={<AddProject/>}/>
    <Route path='/editProject' element={<EditProjects/>}/>
   </Routes>
   </BrowserRouter>
    
    </>
  )
}

export default App
