import React, { useEffect, useState } from 'react'
import { Link, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
// import "../HomeBeforeLogin/CSS/Navbar_before_login.css"
import "../HomeBeforeLogin/CSS/Navbar_before_login.css"
import "./Navbar_after_login.css";
import useUser from '../../store/userContext.js';

function Navbar_after_login(props) {
    const { user, setUser } = useUser();
    const [userData,setUserData] = useState('');
    const [base64Img,setBase64Img] = useState(props.imgData);

    // console.log("📢📢📢📢📢  "+props.imgData);

    useEffect(() => {
      if(props.imgData != undefined)
        setBase64Img(props.imgData);
    }, [props.imgData])

    // useEffect( () => {
    //     fetch('/user/profileImg')
    //     .then(response => response.json())
    //     .then(data => {
    //         setUserData(data.data);
    //         setBase64Img(`data:image/png;base64,${data.data.profileImg}`);
    //         // console.log('aaa',data[0].profileImg);
    //     });
    // },[])

    const removeUserAuth = async () => {
          
          setUser(null);
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/remove/auth`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
            // .then(response => response.json())
            // .then(data => {
            //   // window.location.reload();
            // });
          // window.location.reload();
      }

    // const userID= props.userID;
    const [mobileMenu, setMobileMenu] = useState('false');

    
  return (
    <>
        <header className="container_fluid">
            <nav className="navigation_bar">
                <div className='mainULNav'>
                    <div className={mobileMenu ? "NavBt" : "NavBt mobile-close-menubar"}>
                        <Link to={'#'} onClick={() => setMobileMenu(!mobileMenu)}></Link>
                    </div>
                    
                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent" : "mobile-li"} id="home"><NavLink to={`/`} className={({ isActive }) => (isActive ? "activeNavLogo" : "")}>CodeVimarsh</NavLink></li>
                        <NavLink to={`/contest`} className={({ isActive }) => (isActive ? "activeNav" : "liComponent")}>CONTEST</NavLink>
                        <NavLink to={`/resources`} className={({ isActive }) => (isActive ? "activeNav" : "liComponent")}>RESOURCES</NavLink>
                        {/* <li className={mobileMenu ? "liComponent" : "mobile-li"} id="articles/news"><Link to={`/article&news`}>ARTICLES/NEWS</Link></li> */}
                        <NavLink to={`/discussion`} className={({ isActive }) => (isActive ? "activeNav" : "liComponent")}>DISCUSSION</NavLink>
                        <NavLink to={`/projectcollaboration`} className={({ isActive }) => (isActive ? "activeNav" : "liComponent")}>PROJECT COLLABORATION</NavLink>
                        <NavLink to={`/project`} className={({ isActive }) => (isActive ? "activeNav" : "liComponent")}>PROJECTS</NavLink>
                        {/* <li className={mobileMenu ? "liComponent" : "mobile-li"} id="contact"><Link>CONTACT US</Link></li> */}
                    </ul>
                    <ul className={mobileMenu ? "horizontal_bar" : "horizontal_bar mobile-menu-icon"}>
                        <li className={mobileMenu ? "liComponent2" : "mobile-li"} id="profile">
                            <Link to={`/profile`}><div className='loginDP' title='Profile'> <img id='profileImage' src={base64Img} loading="lazy" alt='Profile'></img> </div></Link>
                        </li>
                        <li className={mobileMenu ? "liComponent3" : "mobile-li"} id='profile'>
                            <Link to={`/`}>
                              <div className='signout-container' onClick={removeUserAuth}>
                                <div className='logoutNavbar' title='Signout'> 
                                  <img src="/images/logout.png" style={{width: '2.4rem'}} alt="Signout" loading='lazy'></img>
                                </div>
                                <div className='signout-text'>Signout</div>
                              </div>
                            </Link>
                        </li>
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

export default React.memo(Navbar_after_login);