import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"
import '../css/navbar.css'
import {useAuthContext} from '../hooks/useAuthContext'



const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const logoutUser = () =>{
        logout()
      }

    return ( 
        <nav>
            <h1>WORDPAL.</h1>
            <span>{user && user.email}</span>
            <div className="navLinks">
                <NavLink className='link' to='/user'>SEARCH</NavLink>
                <NavLink className='link' to='/user/words'>YOUR WORDS</NavLink>
                <button onClick={logoutUser}>LOGOUT</button>
            </div>
        </nav>
     );
}
 
export default Navbar;