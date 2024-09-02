
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Index from './Vista/Index'
import Detalle from './Vista/Detalle'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/pokemon/:id' element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
