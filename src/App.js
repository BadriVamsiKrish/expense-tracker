
import React, { useEffect ,Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Emailverify from './pages/Emailverify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authActions } from './store/authstore';
import { expenseActions } from './store/expences';
import Notification from './pages/Notification';
let init=true;
let ininit=false;
const App = () => {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth);
  const login = useSelector(state=>state.auth.islogin);
  const bgcolor=useSelector(state=>state.expense.bgcolor);
  const islogin=useSelector(state=>state.auth.isAuthenticated);
  const notification=useSelector(state=>state.expense.notification);
  useEffect(()=>{
    
    const fetchdata=async()=>{ 
      dispatch(expenseActions.setnotification({
        status:'pending',
        message:'data is getting ...',
        title:'data is getting...!'
      }));
      const response=await fetch('https://react-http-f171e-default-rtdb.firebaseio.com/expense_authaction.json');
      if(!response.ok){
        throw new Error('fetching data is failed');
      };
      const responsedata=await response.json();
      dispatch(authActions.fetchAuthactions(responsedata));
      dispatch(expenseActions.setnotification({
        status:'success',
        message:'data is getting successfull...',
        title:'data is getting successfull...!'
      }))
    };
    fetchdata().catch((err)=>{
      console.log(err);
      dispatch(expenseActions.setnotification({
        status:'error',
        message:'data is getting failed ...',
        title:'data is getting failed...!'
      }))
    })
  },[dispatch]);
 useEffect(()=>{
  if(init){
    init=false;
    return;
  }
  const senddata =async()=>{
    dispatch(expenseActions.setnotification({
      status:'pending',
      message:'data is sendinging ...',
      title:'data is sending...!'
    }));
    const response=await fetch('https://react-http-f171e-default-rtdb.firebaseio.com/expense_authaction.json',{method:'PUT',body:JSON.stringify(auth)});
    if(!response.ok){
      throw new Error('data sending is failed');
    };
    const responsedata=await response.json();
    dispatch(expenseActions.setnotification({
      status:'success',
      message:'data is sending successfully ...',
      title:'data is sending done...!'
    }));
    
  };
  senddata().catch((err)=>{
    console.log(err);
    dispatch(expenseActions.setnotification({
      status:'error',
      message:'data is sending failed ...',
      title:'data is sending failed...!'
    }));
  });
 },[dispatch,auth]);
  return (
    <Fragment>
      {/* {notification && <Notification title={notification.title} message={notification.message} status={notification.status} />} */}
    <div style={{backgroundColor:bgcolor?'white':'gray'}}>
      <BrowserRouter>
      {notification && <Notification title={notification.title} message={notification.message} status={notification.status} />}
        <Routes>
          {!islogin && <Route path='/' Component={login?Signin:Signup}/>}
          {!islogin && <Route path='*' Component={login?Signin:Signup}/>}
          {islogin && <Route path='/emailverify' Component={Emailverify}/>}
          {islogin && <Route path='/home' Component={Home}/>}
        </Routes>
      </BrowserRouter>
    </div>
    </Fragment>
  )
}

export default App;