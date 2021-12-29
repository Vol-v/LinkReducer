import React, { useContext } from "react";
import {NavLink,useNavigate} from 'react-router-dom'; // раньше был  useHistory
import { AuthContext } from '../context/AuthContext';

export const Navbar = () =>{
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    
    const logoutHandler = (event) => {
        //event.preventDefault() // чтобы ссылка не обрабатывалась
        auth.logout()
        navigate('/')

    }

    return (
        <nav>
        <div className="nav-wrapper  teal lighten-1" >
          <a className="brand-logo">Vol-v</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to = "/create" className = 'navbar-link'>Create</NavLink></li>
            <li><NavLink to = "/links" className = 'navbar-link'>Links</NavLink></li>
            <li><a href = "/" onClick = {logoutHandler} className = 'navbar-link'>Exit</a></li>
            


          </ul>
        </div>
      </nav>

    )
}