import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import "./Navbar_before_login.css";
import "./Navbar_after_login.css";

function Navbar_after_login(props) {
    const navigate=useNavigate();
    const [userData,setUserData] = useState('');
    const userID = sessionStorage.getItem('userID');
    const [base64Img,setBase64Img] = useState('');

    useEffect( () => {
        fetch('/navbar/profileImg/dataset')
        .then(response => response.json())
        .then(data => {
            setUserData(data);
            setBase64Img(`data:image/png;base64,${data.profileImg}`);
            // console.log('aaa',data[0].profileImg);
        });
    },[])


    // const userID= props.userID;
    const [mobileMenu, setMobileMenu] = useState('false');

    
  return (
    <>
        <header className="container_fluid">
            <nav className="navigation_bar">
                <div className='mainULNav'>
                    <div className={mobileMenu ? "NavBt" : "NavBt mobile-close-menubar"}>
                        <a href='#' onClick={() => setMobileMenu(!mobileMenu)}></a>
                    </div>
                    
                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="home"><Link to={`/home`}></Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/contest`}>CONTEST</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/resources`}>RESOURCES</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/article&news`}>ARTICLES/NEWS</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/discussion`}>DISCUSSION</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/project_collab`}>PROJECT COLLAB</Link></li>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link to={`/project`}>PROJECTS</Link></li>
                        {/* <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link>CONTACT US</Link></li> */}
                    </ul>
                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent2" : "mobile-li"} id="profile"><Link to={`/profile`}>
                            {/* <img src=''     */}
                            <div className='loginDP'> <img src={base64Img}></img> </div>
                        </Link></li>  
                    </ul>
                </div>

                {/* <ul className='sign_in_container'>
                    <li><Link to={"signin"}><input  type="button" value="Sign In" className="signin_btn" /></Link>  </li>
                </ul> */}
            </nav>
        </header>

    </>
    
  )
}

export default Navbar_after_login