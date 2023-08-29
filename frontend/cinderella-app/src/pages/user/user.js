import React from "react";
import {cookies} from '../../App';
import { useNavigate } from 'react-router-dom';


const user = () => {
    return cookies.get("USER_TOKEN");
}

const UserDetails = () =>{
    const navigate = useNavigate();
    const {id} =user();
    const handleLogout = () => {
        cookies.remove('USER_TOKEN', { path: '/' });
        navigate("/");
    }
    return (
        <div className="page">
            
            <div className="grid">
                <div>Welcome {id}</div>
                <br/>
                <br/>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default UserDetails;