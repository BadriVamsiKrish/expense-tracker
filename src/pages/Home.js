// import React, { useEffect } from 'react';
// import { useState ,useContext,useRef } from 'react';
// import { Button } from 'react-bootstrap';
// import { store } from '../App';
// import { useNavigate } from 'react-router-dom';
// import Expenceform from './Expenceform';
// const Home = () => {
//   const history=useNavigate();
//   const[updateprofile,setUpdateprofile]=useState(false);
//   const[name,setName]=useState('');
//   const[photourl,setPhotourl]=useState('');
//   const[logindata,setlogindata]=useContext(store);
//   const nameref=useRef();
//   const photoref=useRef();
//   useEffect(()=>{var url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g'; // Replace with your actual API key.
//   console.log(logindata);
  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     idToken: logindata,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
//     .then((res) => {
//       console.log(logindata);
//       if (res.ok) {
//         return res.json();
//       } else {
//         return res.json().then((data) => {
//           let errorMessage = 'Authentication failed';
//           throw new Error(errorMessage);
//         });
//       }
//     })
//     .then((data) => {
//       console.log(data);
//       setName(data.users[0].displayName);
//       setPhotourl(data.users[0].photoUrl);
//       console.log(data.users[0].displayName,data.users[0].photoUrl) // Log the response data if the request was successful.
//     })
//     .catch((err) => {
//       console.error(err); // Log any errors.
//       alert(err.message);
//     });
// },[updateprofile])
//   const submitHandler = () => {
//     var url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g'; // Replace with your actual API key.
  
//     fetch(url, {
//       method: 'POST',
//       body: JSON.stringify({
//         idToken: logindata,
//         displayName: nameref.current.value,
//         photoUrl:photoref.current.value,
//         returnSecureToken: true,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             let errorMessage = 'Authentication failed';
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         console.log(data); // Log the response data if the request was successful.
//       })
//       .catch((err) => {
//         console.error(err); // Log any errors.
//         alert(err.message);
//       });
//   };
//   const logouthandler = () =>{
//     localStorage.removeItem('token');
//     history('/');
//   } 
  
//   return (
//     <div style={{margin:'50px'}}>
//       <Button style={{padding:'10px',backgroundColor:'gray',color:'white',fontSize:'20px'}} onClick={(event)=>{setUpdateprofile(!(updateprofile))}}>click to complete profile.</Button> 
//       {updateprofile && <div style={{backgroundColor:'aqua',padding:'30px',border:'10px grove gray',fontSize:'20px'}}>username:<input onChange={(event)=>setName(event.target.value)}type='text' ref={nameref} value={name}/><br/>
//       photoUrl:<input type='text' onChange={(event)=>setPhotourl(event.target.value)} ref={photoref} value={photourl}/><br/><Button onClick={(event)=>{setUpdateprofile(!(updateprofile));console.log(logindata);submitHandler();}}>Update</Button></div>}
//       <h1>Welcome to expence tracker...</h1>
//       <Expenceform/>
//       <Button variant='danger' style={{padding:'10px',backgroundColor:'red',color:'white',fontSize:'10px'}} onClick={(event)=>logouthandler()} >logout</Button>
//     </div>
//   )
// }

// export default Home;
import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector ,useDispatch } from 'react-redux';
import { authActions } from '../store/authstore';
import axios from 'axios';
import Expenceform from './Expenceform';
import { expenseActions } from '../store/expences';
import { Icon } from 'react-icons-kit';
import {brightnessContrast} from 'react-icons-kit/icomoon/brightnessContrast'
//import Expenceform from './Expenceform';
const Home = () => {
  const nameref=useRef();
  const photoref=useRef();
  const showupdateform=useSelector(state=>state.auth.showupdateform);
  const id=useSelector(state=>state.auth.authId);
  const bgcolor=useSelector(state=>state.expense.bgcolor);
  const dispatch=useDispatch();
  const setShowupdateform = () =>{
    dispatch(authActions.setshowupdateform());
    console.log('home button clicked',showupdateform);
  } ;
  const updatefunction = (event) =>{
    //event.preventDefault();
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
    {idToken:id,displayName:nameref.current.value,photoUrl:photoref.current.value,returnSecureToken:true})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
    nameref.current.value='';
    photoref.current.value='';

  } ;
  const settheme = () =>{
    dispatch(expenseActions.setbgcolor());
  } 
  //const [bgcolor,setBgcolor]=useState('white');
  return (
    <div>
      <Button variant='secondary' onClick={settheme}><Icon icon={brightnessContrast}/></Button>
      <div style={{backgroundColor:bgcolor?'white':'gray'}}>
      <div>

        <h1>welcome to expense tracker...</h1>
        <Button variant='warning'onClick={(event)=>{event.preventDefault();setShowupdateform();}}>update</Button></div>
        {showupdateform && <div>
          <div>
            <label>Display Name:</label>
            <input type='text' ref={nameref}/>
          </div>
          <div>
            <label>Photo Url:</label>
            <input type='text' ref={photoref}/>
          </div>
          <div><Button variant='success' onClick={(event)=>updatefunction()}>update profile</Button></div>
          </div>}
          <Expenceform/>
    </div>
    </div>
  )
}

export default Home;