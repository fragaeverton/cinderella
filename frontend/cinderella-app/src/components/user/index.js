import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import UserLogo from '../../assets/user.svg';

const User = () => {
    return(  
        <div>
           <NavLink to="/auth">
                <img src={UserLogo} alt="User icon"/>
            </NavLink>
        </div>   
    )
}

export default User;