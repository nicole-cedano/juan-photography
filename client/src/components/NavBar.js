import React from 'react'
import "./styles.css"
import { useToggle } from "../shared/hooks/"
import {useContext} from 'react'
import {UserContext} from '../context/UserProvider.js'
import { Link } from 'react-router-dom'



const NavBar = (props) => {
    const { toggle, toggler } = useToggle(true)
    const { token } = props
    const {logout} = useContext(UserContext)

    return (
        <div>
            <div onClick={toggler} className={`overlay overlay-${!toggle ? "open" : "closed"}`}></div>
            <button onClick={toggler} className={`rotate rotate-${!toggle ? "open" : "closed"}`}>|||</button>
            <div onClick={toggler} className={`nav nav-${!toggle ? "open" : "closed"}`}>
                <Link to="/photos">Photos</Link>
                <Link to="/videos">Videos</Link>
                <Link to="/contact">Contact</Link>
                {token &&
                    (<Link to="/admin"> Admin</Link>)
                }
                {
                    token &&
                    (<Link to="/media">+Add Content</Link>)
                }
                {token && <button onClick={logout}>Logout</button>}
            </div>
        </div>
    )
}

export default NavBar
