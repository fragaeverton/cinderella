import React, {useEffect} from "react";
import { NavLink } from 'react-router-dom';
import UserLogo from '../../assets/user.svg';
import CartLogo from '../../assets/cart.svg';
import {cookies} from '../../App';
import { useSelector,useDispatch } from 'react-redux';
import { setValue } from '../../store/cartSlice';

const User = () => {
    const count = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const length = cookies.get("SESSION") !== undefined ? cookies.get("SESSION").cart.length : 0;
    useEffect(() => {
        dispatch(setValue(length))
    }, [0]);    
    
    return(  
        <div>
            <NavLink to="/cart">
                <img src={CartLogo} alt="Cart"/>
                {(count)}
            </NavLink>
            <NavLink to="/auth">
                <img src={UserLogo} alt="User icon"/>
            </NavLink>
        </div>   
    )
}

export default User;