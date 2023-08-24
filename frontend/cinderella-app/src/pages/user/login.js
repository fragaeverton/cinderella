import React, { useState } from 'react';
import { userLogin} from '../../api/login';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
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
    // Here you can add your logic to handle the form submission,
    // like sending the username and password to an authentication API.
    async function login() {
      let response = await userLogin(formData);
      if(response.user){
        Redirect();     

        //setCookie(STORAGE_KEY, response.user.token);
        
        // Reset the form
        setFormData({
          name: '',
          email: '',
          password: ''
        });
      }else if(response.toString().indexOf("Unauthorized") > -1 ){        
        console.log("wrong login")
      }else{
        console.log(response)
      }
    }
    login();    
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
