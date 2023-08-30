import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import UserLogo from '../../assets/user.svg';
import CartLogo from '../../assets/cart.svg';
import {cookies} from '../../App';

const User = () => {
    return(  
        <div>
            <NavLink to="/cart">
                <img src={CartLogo} alt="Cart"/>
                {(cookies.get("SESSION").cart.length)}
            </NavLink>
            <NavLink to="/auth">
                <img src={UserLogo} alt="User icon"/>
            </NavLink>
        </div>   
    )
}

export default User;