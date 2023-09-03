import React from 'react';
import AuthForm from './AuthForm';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/home'} element={<Home/>} />
          <Route path={'/'} element={<AuthForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App