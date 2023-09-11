import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { authActions } from '../store/authstore';
import { useNavigate } from 'react-router-dom';
const Emailverify = () => {
  const [emailverifyerror,setEmailverifyerror]=useState(false);
  const history =useNavigate();
  const id=useSelector(state=>state.auth.authId);
  const isverified=useSelector(state=>state.auth.emailverified);
  const dispatch=useDispatch();
  const emailverification = () =>{
    dispatch(authActions.emailverify());
    console.log(isverified);

  } 
  const sendmail = () =>{
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {requestType:"VERIFY_EMAIL",idToken:id})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

  } ;
  const successfunction = () => {
    history('/home');
    setTimeout(()=>{emailverification()},1500);
  };
  const failurefunction = () =>{
    setTimeout(()=>{setEmailverifyerror(false)},10000);
    setEmailverifyerror(true);
    history('/');

  } 
  const getdata = () =>{
    setTimeout(()=>{setEmailverifyerror(false)},5000);

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',{idToken:id})
     
    .then((data)=>data.data.users[0].emailVerified)
    .then((data)=>data?successfunction():failurefunction())
    .catch((err)=>console.log(err));
   // {data.data.users[0] && emailverification()}; 
   //setTimeout(setEmailverifyerror(false),15000);

  } 
  return (
    <div>
      <h2>hello from emailverify</h2>
      <Button variant='warning' onClick={(event)=>{getdata()}}>confirm mail verified</Button>
      <Button onClick={(event)=>{sendmail()}}>send verification mail</Button>
      {emailverifyerror && <p style={{color:'red',textAlign:'center'}}>email is not verified...!</p>}
    </div>
  )
}

export default Emailverify;
// .then((data)=>{console.log(data.data.users[0]);data.data.users[0].emailVerified && (emailverification() && history('/home') ); !data.data.users[0].emailVerified && setEmailverifyerror(true)})