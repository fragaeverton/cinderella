import React, { useState } from 'react';
import { createUser} from '../../api/login'

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
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
    if (name === 'name') {
      setFormErrors({
        ...formErrors,
        name: value ? '' : 'Name is required'
      });
    } else if (name === 'email') {
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

  const handleSubmit = event => {
    event.preventDefault();
    
    // Perform form submission logic here
    // You can send the formData to an API, etc.
    async function register() {
      let newUser = await createUser(formData);
      if(newUser === "ok"){
        console.log("success!");
        
        // Reset the form
        setFormData({
          name: '',
          email: '',
          password: ''
        });
      }else{
        console.log(newUser)
      }
    }
    register();    
  };

  return (
    <div className="grid">
      <div className='pet'>        
        <h3>New User</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:   </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;