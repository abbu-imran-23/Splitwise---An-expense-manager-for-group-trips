import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Toaster
      position='top-center'
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App