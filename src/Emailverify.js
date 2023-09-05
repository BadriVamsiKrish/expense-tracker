import React, { useContext ,useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { store } from './App';
import { useNavigate } from 'react-router-dom';
const Emailverify = () => {
  const[verical,setVercal]=useState(false);
  const[check,setCheck]=useState(false);
  const [logindata,setlogindata]=useContext(store);
  const history=useNavigate();
  useEffect(()=>{var url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g'; // Replace with your actual API key.
  //console.log(logindata);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      idToken: logindata,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      //console.log(logindata);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication failed';
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      setVercal(data.users[0].emailVerified)
      console.log(data.users[0].emailVerified); // Log the response data if the request was successful.
    })
    .catch((err) => {
      console.error(err); // Log any errors.
      alert(err.message);
    });
},[check])
  const verify = () => {
    setTimeout(setCheck(!(check)),30000);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',{
      method:'POST',
      body:JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken:logindata,

      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        return res.json();
      }
      else{
        return res.json().then((data)=>{
          let errorMessage='Authentication is failed';
          throw new Error(errorMessage);
        })
      }
  
  }).then(data=>{console.log(data);})
  .catch(err=>{
  alert(err.message);
  });
  
  }
  return (
    <div>
      <Button onClick={(event)=>verify()}>verify mail</Button>
      {verical && history('/home')}
    </div>
  )
}

export default Emailverify;