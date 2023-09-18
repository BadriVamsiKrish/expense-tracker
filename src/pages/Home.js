import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authstore';
import axios from 'axios';
import Expenceform from './Expenceform';
import { expenseActions } from '../store/expences';
import { Icon } from 'react-icons-kit';
//import { authActions } from '../store/authstore';
import { brightnessContrast } from 'react-icons-kit/icomoon/brightnessContrast';

const Home = () => {
  
  const nameref = useRef();
  const photoref = useRef();
  const showupdateform = useSelector(state => state.auth.showupdateform);
  const id = useSelector(state => state.auth.authId);
  const name = useSelector(state => state.auth.displayname);
  const photo = useSelector(state => state.auth.photourl);
  const bgcolor = useSelector(state => state.expense.bgcolor);
  const dispatch = useDispatch();

  useEffect(() => {
    // You can put any code that needs to run when the component mounts here
  }, []); // The empty dependency array means this runs once, like componentDidMount

  const setShowupdateform = () => {
    dispatch(authActions.setshowupdateform());
    console.log('home button clicked', showupdateform);
  };
  const setname = (a) =>{
    dispatch(authActions.setdisplayname(a));
  };
  const setphoto = (b) =>{
    dispatch(authActions.setphotourl(b));
  };

  const updatefunction = () => {
    // event.preventDefault(); // You don't need this line
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g',
        {
          idToken: id,
          displayName: nameref.current.value,
          photoUrl: photoref.current.value,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        setname(response.data.displayName) ;
        setphoto(response.data.photoUrl);

      })
      .catch((err) => {
        console.log(err);
      });
      

    nameref.current.value = '';
    photoref.current.value = '';
  };

  const settheme = () => {
    dispatch(expenseActions.setBgColor());
  };
  const logout=()=>{
    dispatch(authActions.logout());
  }
  

  return (
    <div>
      <Button variant={bgcolor ? 'secondary' : 'info'} onClick={settheme}>
        <Icon icon={brightnessContrast} />
      </Button>
      <Button onClick={logout}>Logout</Button>
      <div>
        <h1>Welcome to expense tracker...</h1>
        <Button
          variant="warning"
          onClick={(event) => {
            event.preventDefault();
            setShowupdateform();
          }}
        >
          {name!=='' && photo!==''?'user details completed':'user details are not completed'}
        </Button>
        
      </div>
      {showupdateform && (
        <div>
          <div>
            <label>Display Name:</label>
            <input type="text" ref={nameref}/>
          </div>
          <div>
            <label>Photo Url:</label>
            <input type="text" ref={photoref}/>
          </div>
          <div>
            <Button variant="success" onClick={updatefunction}>
              Update Profile
            </Button>
          </div>
        </div>
      )}
      <Expenceform />
    </div>
  );
};

export default Home;
