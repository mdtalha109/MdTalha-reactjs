import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
    return(
        <div className='header-container'>
        <div>
            <strong className="header-text"><Link to ='/'>UPayments Store</Link> </strong>
        </div>

        <div>
            <strong className="header-text">Register</strong>
        </div>
    </div>
    )
}

export default Header