import React, { useEffect } from 'react';
import { useState ,useContext,useRef } from 'react';
import { Button } from 'react-bootstrap';
import { store } from '../App';
const Home = () => {
  const[updateprofile,setUpdateprofile]=useState(false);
  const[name,setName]=useState('');
  const[photourl,setPhotourl]=useState('');
  const[logindata,setlogindata]=useContext(store);
  const nameref=useRef();
  const photoref=useRef();
  useEffect(()=>{var url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g'; // Replace with your actual API key.
  
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
      console.log(logindata);
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
      console.log(data);
      setName(data.users[0].displayName);
      setPhotourl(data.users[0].photoUrl);
      console.log(data.users[0].displayName,data.users[0].photoUrl) // Log the response data if the request was successful.
    })
    .catch((err) => {
      console.error(err); // Log any errors.
      alert(err.message);
    });
},[updateprofile])
  const submitHandler = () => {
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g'; // Replace with your actual API key.
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: logindata,
        displayName: nameref.current.value,
        photoUrl:photoref.current.value,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
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
        console.log(data); // Log the response data if the request was successful.
      })
      .catch((err) => {
        console.error(err); // Log any errors.
        alert(err.message);
      });
  };
  
  return (
    <div style={{margin:'50px'}}>
      <Button style={{padding:'10px',backgroundColor:'gray',color:'white',fontSize:'20px'}} onClick={(event)=>{setUpdateprofile(!(updateprofile))}}>click to complete profile.</Button> 
      {updateprofile && <div style={{backgroundColor:'aqua',padding:'30px',border:'10px grove gray',fontSize:'20px'}}>username:<input onChange={(event)=>setName(event.target.value)}type='text' ref={nameref} value={name}/><br/>
      photoUrl:<input type='text' onChange={(event)=>setPhotourl(event.target.value)} ref={photoref} value={photourl}/><br/><Button onClick={(event)=>{setUpdateprofile(!(updateprofile));console.log(logindata);submitHandler();}}>Update</Button></div>}
      <h1>Welcome to expence tracker...</h1>
    </div>
  )
}

export default Home;