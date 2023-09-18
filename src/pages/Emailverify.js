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
  //const isverified=useSelector(state=>state.auth.emailverified);
  const dispatch=useDispatch();
  const emailverification = () =>{
    dispatch(authActions.emailverify());
    //console.log(isverified);

  } ;
  const sendmail = () =>{
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {requestType:"VERIFY_EMAIL",idToken:id})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

  } ;
  const successfunction = () => {
    history('/home');
    emailverification();
    //setTimeout(()=>{emailverification()},1500);
  };
  const failurefunction = () =>{
    //setTimeout(()=>{setEmailverifyerror(false)},10000);
    //setEmailverifyerror(true);
    history('/');

  } ;
  const setname = (a) =>{
    dispatch(authActions.setdisplayname(a));
  };
  const setphoto = (b) =>{
    dispatch(authActions.setphotourl(b));
  }  
  const getdata = async() =>{
    setTimeout(()=>{setEmailverifyerror(false)},5000);
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g', { idToken: id });
      const EmailVerified = response.data.users[0].emailVerified;
      console.log(EmailVerified,response.data,response.data.users[0].displayName);
    
      if (EmailVerified) {
        successfunction();
        setname(response.data.users[0].displayName) ;
        setphoto(response.data.users[0].photoUrl);// Call the success function with the response data
      } else {
        failurefunction(); // Call the failure function with the response data
      }
    } catch (error) {
      console.log(error);
    }
    
  
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
