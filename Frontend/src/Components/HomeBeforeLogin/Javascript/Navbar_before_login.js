import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as LinkScroll} from 'react-scroll'
import "../CSS/Navbar_before_login.css";

function Navbar_before_login() {

    const [mobileMenu, setMobileMenu] = useState('false');

  return (
    <>
        <header className="container_fluid">
            <nav className="navigation_bar">
                <div>
                    <div className={mobileMenu ? "NavBt" : "NavBt mobile-close-menubar"}>
                        <Link to='/' onClick={() => setMobileMenu(!mobileMenu)}></Link>
                    </div>

                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="home"><Link to="/">CodeVimarsh</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to="https://mail.google.com/mail/?view=cm&to=codingclub-cse@msubaroda.ac.in" target="_blank" >CONTACT US</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="about"> <LinkScroll to="AboutUS" href='#' style={{color: 'white'}} spy={true} smooth={true} offset={-85}> ABOUT US </LinkScroll> </li>
                    </ul>
                </div>

                <ul className='sign_in_container'>
                    <li><Link to={"signin"}><input  type="button" value="Sign In" className="signin_btn" /></Link> </li>
                </ul>
            </nav>
        </header>

    </>
    
  )
}

export default Navbar_before_login