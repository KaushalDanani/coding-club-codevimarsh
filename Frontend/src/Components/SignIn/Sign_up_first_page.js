import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import "./Sign_up_first_page.css";

function Sign_up_first_page() {

    const navigate = useNavigate();
    
    const [prn, setPrn] = useState('')
    const [uname, setUname] = useState('')
    const [pwd, setPwd] = useState('')
    const [showhide, setShowhide] = useState('true');
    const [showhideforconfirm, setShowhideforconfirm] = useState('true')

    useEffect(() => {
        
            if(sessionStorage.getItem('prn') != null)
                setPrn(sessionStorage.getItem('prn'))
            if(sessionStorage.getItem('username') != null)
                setUname(sessionStorage.getItem('username'))
            if(sessionStorage.getItem('password') != null)
                setPwd(sessionStorage.getItem('password'))
    }, []);


    const prnChangeHandler = (event) => {
        setPrn(event.target.value)
    }
    const usernameChangeHandler = (event) => {
        setUname(event.target.value)
    }
    const pwdChangeHandler = (event) => {
        setPwd(event.target.value)
    }
    
    const passwordVisibilityHandler = (e) => {
        setShowhide(!showhide);

        let x = document.getElementById("pwd");
        if(showhide)
            x.type = 'text';
        else
            x.type = 'password';
    }

    const confirmPasswordVisibilityHandler = (e) => {
        setShowhideforconfirm(!showhideforconfirm);

        let x = document.getElementById("confirmPwd");
        if(showhideforconfirm)
            x.type = 'text';
        else
            x.type = 'password';
    }

    function data() {
        sessionStorage.setItem('prn', prn);
        sessionStorage.setItem('username', uname);
        sessionStorage.setItem('password', pwd);
    }

    function validationData () {
        if ((prn !== '') && (uname  !== '') && (pwd.length > 7))
            navigate('/signup/step-2')
        else
            alert("Please, fill all required information...")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        data();
        validationData();
    }

  return (
        <section className='sign-up_section'>
            <>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </>

        
            <div className="signup">
                <div className="container">
                    <h2> Sign Up </h2>
                    <form>
                        <div className="form">
                            <div className="inputbox">
                                <input type="text" name='prn' value={prn} onChange={prnChangeHandler} required />
                                <label> PRN </label>
                                { (prn === '') && (<div className='requireSuggestion'> *PRN ID is required. </div>) }
                            </div>
                            
                            <div className="inputbox"> 
                                <input type="text" name='username' value={uname} onChange={usernameChangeHandler} required />
                                <label> Username </label>
                                { (uname === '') && (<div className='requireSuggestion'> *Username is required. </div>) }
                            </div>
                            <div className="inputbox">
                                <div className={showhide ? "show_pwd_signup" : "hide_pwd_signup"} onClick={passwordVisibilityHandler}/>
                                <input id='pwd' type="password" name='password' value={pwd} onChange={pwdChangeHandler} required />
                                <label> Password </label>
                                { (pwd === '') && (<div className='requireSuggestion'> *Password is required. </div>) }
                                { (pwd.length < 8 && pwd !== '') && (<div className='requireSuggestion'> *Length must be &gt;= 8 Characters. </div>) }
                            </div>
                            
                            <div className="signupbox">
                                <button className='signupButton' onClick={submitHandler}> Next </button>
                            </div>

                            <div style={{display: 'flex', height: '10px', gap: '5%',justifyContent: 'center'}}>
                                <div className="trackbar" id='firstbar'></div>
                                <div className="trackbar"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Sign_up_first_page