import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import "./Sign_up_first_page.css";

function Sign_up_first_page() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState('')
    const [uname, setUname] = useState('')
    const [pwd, setPwd] = useState('')
    const [cpwd, setCpwd] = useState('')
    const [showhide, setShowhide] = useState('true');
    const [showhideforconfirm, setShowhideforconfirm] = useState('true')

    useEffect(() => {
        
            if(sessionStorage.getItem('email_id') != null)
                setEmail(sessionStorage.getItem('email_id'))
            if(sessionStorage.getItem('username') != null)
                setUname(sessionStorage.getItem('username'))
            if(sessionStorage.getItem('password') != null)
                setPwd(sessionStorage.getItem('password'))
            if(sessionStorage.getItem('confirm_password') != null)
                setCpwd(sessionStorage.getItem('confirm_password'))
    }, []);


    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const usernameChangeHandler = (event) => {
        setUname(event.target.value)
    }
    const pwdChangeHandler = (event) => {
        setPwd(event.target.value)
    }
    const cpwdChangeHandler = (event) => {
        setCpwd(event.target.value)
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
        sessionStorage.setItem('email_id', email);
        sessionStorage.setItem('username', uname);
        sessionStorage.setItem('password', pwd);
        sessionStorage.setItem('confirm_password', cpwd);
    }

    function validationData () {
        if ((email !== '') && (uname !== '') && (cpwd === pwd) && (pwd.length > 7))
            navigate('/signup/step-2')
        else
            alert("Please, fill all required information...")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        data();
        validationData();
        
        // document.cookie = 'email_id=' + email + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'username=' + uname + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'password=' + pwd + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'confirm_password=' + cpwd + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
    }

  return (
        <section className='sign-up_section'>
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


        
            <div className="signup">
                <div className="container">
                    <h2> Sign Up </h2>
                    <form>
                        <div className="form">
                            <div className="inputbox">
                                <input type="text" name='email_id' value={email} onChange={emailChangeHandler} required />
                                <label> E-mail ID </label>
                                { (email === '') && (<div className='requireSuggestion'> *Email ID is required. </div>) }
                            </div>
                            
                            <div className="inputbox"> 
                                <input type="text" name='username' value={uname} onChange={usernameChangeHandler} required />
                                <label> Username </label>
                                { (uname === '') && (<div className='requireSuggestion'> *Username is required. </div>) }
                            </div>
                            <div className="inputbox">
                                <input className={showhide ? "show_pwd_signup" : "hide_pwd_signup"} onClick={passwordVisibilityHandler} type='button' />
                                <input id='pwd' type="password" name='password' value={pwd} onChange={pwdChangeHandler} required />
                                <label> Password </label>
                                { (pwd === '') && (<div className='requireSuggestion'> *Password is required. </div>) }
                                { (pwd.length < 8 && pwd !== '') && (<div className='requireSuggestion'> *Length must be &gt;= 8 Characters. </div>) }
                            </div>
                            <div className="inputbox">
                                <input className={showhideforconfirm ? "show_pwd_signup" : "hide_pwd_signup"} onClick={confirmPasswordVisibilityHandler} type='button' />
                                <input id='confirmPwd' type="password" name='confirm_password' value={cpwd} onChange={cpwdChangeHandler} required />
                                <label> Confirm Password </label>
                                { (pwd !== cpwd || cpwd === '') && (<div className='requireSuggestion'> *Confirm Password isn't match. </div>) }
                            </div>
                            <div className="signupbox">
                                <button className='signupButton' onClick={submitHandler}> Next </button>
                            </div>

                            <div style={{display: 'flex', height: '10px', gap: '5%'}}>
                                <div className="trackbar" id='firstbar'></div>
                                <div className="trackbar"></div>
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