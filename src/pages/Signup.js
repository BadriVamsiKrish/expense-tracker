import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector ,useDispatch} from 'react-redux';
import { authActions } from '../store/authstore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';
const Signup = () => {
  const getAuthid = (id) =>{
    dispatch(authActions.setAuthid(id));
    console.log(id);
  } ;
  const history=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const dispatch=useDispatch();
  const login=useSelector(state => state.auth.islogin);
  const [showpassword,setShowpassword]=useState(false);
  const signuphandler = () =>{
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {email:email,password:password,returnSecureToken:true},{headers:{'Content-Type': 'application/json',}}
    )
    .then((data)=>{console.log(data.data);history('/emailverify');getAuthid(data.data.idToken);dispatch(authActions.login());dispatch(authActions.login());})
    .catch((err)=>console.log(err));
    setEmail('');
    setPassword('');
    setName('');

  } 
  return (
    <div style={{alignItems:'-moz-initial',margin:'10% 20% 0% 20%',border:'5px solid black',backgroundColor:'violet'}}>
      <h2 style={{margin:'0.5cm'}}><center>Sign up </center></h2>
      <div style={{margin:'0.5cm'}}>
        <label>User Name:</label>
        <input required value={name} onChange={(event)=>{setName(event.target.value)}} type='text'/>
      </div>
      <div style={{marginLeft:'0.5cm'}}>
        <label>User Email:</label>
        <input required value={email} onChange={(event)=>{setEmail(event.target.value)}} type='email'/>
      </div>
      <div style={{margin:'0.5cm'}}>
        <label>Password:</label>
        <input value={password} onChange={(event)=>{setPassword(event.target.value)}} required type={showpassword?'text':'password'}></input>
        <Button variant='secondary' onClick={(event)=>{setShowpassword(!showpassword)}}>{showpassword?<Icon icon={eye}/>:<Icon icon={eyeBlocked}/>}</Button>
      </div>
      <div style={{margin:'0.5cm'}}>
        <Button variant='success' onClick={(event)=>{signuphandler()}}>Signup</Button>
        <Button onClick={(event)=>{dispatch(authActions.isloginverify());console.log(login)}} variant='warning'>Go to Signin</Button>
      </div>
    </div>
  )
}

export default Signup;