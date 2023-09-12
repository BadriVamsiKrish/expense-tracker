// import React from 'react';
// import AuthForm from './AuthForm';
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Home from './pages/Home';
// import { Button } from 'react-bootstrap';
// import { useState } from 'react';
// import Emailverify from './Emailverify';
// //export const store=React.createContext();
// const App = () => {
//   const[logindata,setlogindata]=useState(localStorage.getItem('token'));
//   return (
//     <div>
//       <BrowserRouter>
//         <store.Provider value={[logindata,setlogindata]}>
//           <Routes>
//             {logindata && <Route path={'/home'} element={<Home/>} />}
//             <Route path={'/'} element={<AuthForm/>} />
//             {logindata &&<Route path={'/emailverify'} element={<Emailverify/>}/>}
//             <Route path={'*'} element={<AuthForm/>}/>
//           </Routes>
//         </store.Provider>
//       </BrowserRouter>
//     </div>
//   )
// }
// export default App
import React from 'react';
import { useSelector } from 'react-redux';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Emailverify from './pages/Emailverify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { useSelector } from 'react-redux';
const App = () => {
  const login = useSelector(state=>state.auth.islogin);
  const bgcolor=useSelector(state=>state.expense.bgcolor);
  return (
    <div style={{backgroundColor:bgcolor?'white':'gray'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={login?Signin:Signup}/>
          <Route path='/emailverify' Component={Emailverify}/>
          <Route path='/home' Component={Home}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;