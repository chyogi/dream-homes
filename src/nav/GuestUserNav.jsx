import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";


export const GuestUserNav = () =>{
    const navigate = useNavigate();
  const appUser = JSON.parse(localStorage.getItem("app_user"));


    return ( 
        <>

       <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/account-home">
          Home
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/floor-plans">
          Floor Plans
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/about-us">
          About Us
        </Link>
      </li>
      
    
    </ul>

        
        </>
    )}
