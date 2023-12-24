import React from 'react';
import './Resources.css';
import resouorceGenerator from './Res_data.js';
import Navbar_after_login from '../kaushal/Navbar_after_login';
import { useLocation } from 'react-router-dom';
import MyfooterAfterLogin from '../MyfooterAfterLogin.js';


export default function Resources() {

  const location=useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get('userID');

  return (
    <>
      <Navbar_after_login/>
      <div>
        <nav className="navbar" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" id='heading'>Select Topic to prepare</a>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg></button>
            </form> */}
          </div>
        </nav>
      </div>
      
      <div id='cardgrid'>
    
      {resouorceGenerator(userID)}
      
      </div>
      <MyfooterAfterLogin/>
    </>
  )
}
