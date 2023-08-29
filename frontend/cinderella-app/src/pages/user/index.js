import React,  {useState} from 'react';
import LoginForm from './login';
import RegisterForm from './register';
import UserDetails from './user';
import {cookies} from '../../App';

function getUser(){
    return cookies.get("USER_TOKEN");
}


const Login = () => {
  const [user, setUser] = useState(getUser());

  return (
    <div>
      {user 
          ? (<UserDetails/>)
          :(<>    
            <br/>
            <LoginForm/>
            <br/>
            <br/>
            <RegisterForm/></> 
          )
      }
    </div>
  );
};

export default Login;
