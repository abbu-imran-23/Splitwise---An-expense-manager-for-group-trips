import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
      position='top-center'
      />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App