import React from 'react';
import { Button } from 'react-bootstrap';
import { useState ,useRef} from 'react';
import './Auth.css';
import { useSelector ,useDispatch} from 'react-redux';
import { authActions } from '../store/authstore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';
//import { passwordreset } from './Forgotpassword';
const Signin = () => {
  const emailref=useRef();
  const passwordref=useRef();
  const[error,setError]=useState(false);
  const history=useNavigate();
  const dispatch=useDispatch();
  const login=useSelector(state => state.auth.islogin);
  const isverified=useSelector(state=>state.auth.emailverified);
  const [showpassword,setShowpassword]=useState(false);
  const getAuthid = (id) =>{
    dispatch(authActions.setAuthid(id));
    console.log(id);
  } ;
  const passwordreset = () =>{
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {email:emailref.current.value ,requestType:"PASSWORD_RESET"})
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})
  } ;
  const signinhandler = () =>{
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {email:emailref.current.value,password:passwordref.current.value,returnSecureToken:true},{headers:{'Content-Type': 'application/json',}}
    )
    .then((data)=>{console.log(data.data);history(isverified?'/home':'/emailverify');getAuthid(data.data.idToken);})
    .catch((err)=>{console.log(err);setError(true);});
    emailref.current.value='';
    passwordref.current.value='';

  } 
  return (
    <div style={{alignItems:'-moz-initial',margin:'10% 20% 0% 20%',border:'5px solid black',backgroundColor:'violet'}}><h2><center>Sign in </center></h2>
    {error && <p style={{color:'red',textAlign:'center'}}>error occured during login...!</p>}
      <div style={{margin:'0.5cm'}}>
        <label>User Email:</label>
        <input  ref={emailref}  required type='email' />
      </div>
      <div style={{marginLeft:'0.5cm'}}>
        <label>Password:</label>
        <input ref={passwordref} required type={showpassword?'text':'password'}/>
        <Button onClick={(event)=>{setShowpassword(!showpassword)}}>{showpassword?<Icon icon={eye}/>:<Icon icon={eyeBlocked}/>}</Button>
      </div>
      <div style={{margin:'0.5cm'}}>
        <Button variant='success'onClick={(event)=>{signinhandler()}}>Signin</Button>
        <Button style={{marginLeft:'0.5cm'}} onClick={(event)=>{dispatch(authActions.isloginverify());console.log(login)}} variant='warning'>Go to Signout</Button>
        <Button style={{marginLeft:'0.5cm'}} variant='info' onClick={(event)=>{passwordreset()}}>forgot password</Button>
      </div>

    </div>
  )
}

export default Signin;