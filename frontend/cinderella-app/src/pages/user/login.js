import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/userSlice';
import { cookies } from '../../App';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const {loading, error} = useSelector((state)=> state.user);
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });
  
  const validateEmail = email => {
    // Basic email validation logic
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate fields and update errors
      if (name === 'email') {
      setFormErrors({
        ...formErrors,
        email: validateEmail(value) ? '' : 'Invalid email address'
      });
    } else if (name === 'password') {
      setFormErrors({
        ...formErrors,
        password: value.length >= 6 ? '' : 'Password must be at least 6 characters'
      });
    }
  };
  
  function Redirect(){
    navigate("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((response)=>{
      if(response.payload.user){
        Redirect();    
        cookies.set("USER_TOKEN",{token:response.payload.user.token, id:response.payload.user.id})
      }else if(response.payload.toString().indexOf("Unauthorized") > -1 ){        
        console.log("wrong login")
      }else{
        console.log(response)
      }
    })
    // Here you can add your logic to handle the form submission,
    // like sending the username and password to an authentication API.
  };

  return (
    <div className="grid">
      <div className='pet'>       
        <h3>Already Registered?</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:   </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:   </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>
          <button type="submit">{ loading ? 'Loading...' :'Login'}</button>
          { error &&(<div>{error}</div>)}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
