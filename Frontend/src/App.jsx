
import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Home from './Components/Home'
import AddProject from './Components/AddProject'

function App() {
 

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/addProject' element={<AddProject/>}/>
   </Routes>
   </BrowserRouter>
    
    </>
  )
}

export default App
