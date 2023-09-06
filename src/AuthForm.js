import { useState, useRef, useContext} from 'react';
//import AuthContext from '../../store/Auth-context';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { store } from './App';
const AuthForm = () => {
  const history=useNavigate();
  const emailInputRef=useRef();

  const passwordInputRef= useRef();
  const[logindata,setlogindata]=useContext(store);
  //const usernameInputRef=useRef();

  //const authCtx=useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    //const  enteredUsername=isLogin? '' :usernameInputRef.current.value;

    if(isLogin){
      var url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g';

    }else{
      var url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g';

    };
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
          requestType:"PASSWORD_RESET",
          email:enteredEmail,
      password:enteredPassword,
      returnSecuretocken:true,
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

  }).then(data=>{console.log(data);setlogindata(data.idToken);localStorage.setItem('token',data.idToken);history('/emailverify')})
  .catch(err=>{
    alert(err.message);
  });
};
const forgotpasswordhandler = () =>{
  const enteredEmail=emailInputRef.current.value;

  var url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAKqFeOETMUmLT1WIt6gLvnW1aXBuI3J0g';
  fetch(url,{
      method:'POST',
      body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:enteredEmail,
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
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create an account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={(event)=>{console.log(emailInputRef.current.value,'working');forgotpasswordhandler();}}
          >
            forgot password
          </button>
        </div>
      </form>
    </section>
  );
};
 export default AuthForm;