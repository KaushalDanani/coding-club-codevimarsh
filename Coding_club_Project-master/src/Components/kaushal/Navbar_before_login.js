import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar_before_login.css";

function Navbar_before_login() {

    const [mobileMenu, setMobileMenu] = useState('false');

  return (
    <>
        <header className="container_fluid">
            <nav className="navigation_bar">
                <div>
                    <div className={mobileMenu ? "NavBt" : "NavBt mobile-close-menubar"}>
                        <a href='#' onClick={() => setMobileMenu(!mobileMenu)}></a>
                    </div>

                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="home"><a href=""></a></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><a href="https://mail.google.com/mail/?view=cm&to=sohamzadafiya@gmail.com" target="_blank" >CONTACT US</a></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="about"><a href="#AboutUS">ABOUT US</a></li>
                    </ul>
                </div>

                <ul className='sign_in_container'>
                    <li><Link to={"signin"}><input  type="button" value="Sign In" className="signin_btn" /></Link>  </li>
                </ul>
            </nav>
        </header>

    </>
    
  )
}

export default Navbar_before_login