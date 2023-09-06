import React from 'react';
import AuthForm from './AuthForm';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Emailverify from './Emailverify';
export const store=React.createContext();
const App = () => {
  const[logindata,setlogindata]=useState(localStorage.getItem('token'));
  return (
    <div>
      <BrowserRouter>
        <store.Provider value={[logindata,setlogindata]}>
          <Routes>
            {logindata && <Route path={'/home'} element={<Home/>} />}
            <Route path={'/'} element={<AuthForm/>} />
            {logindata &&<Route path={'/emailverify'} element={<Emailverify/>}/>}
            <Route path={'*'} element={<AuthForm/>}/>
          </Routes>
        </store.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App