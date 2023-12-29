import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./Sign_in_page.css";

function Sign_in_page() {
    const navigate = useNavigate();

    const [enterdUsername, setEnterdUsername] = useState('')
    const [enterdPassword, setEnterdPassword] = useState('')
    const [showhide, setShowhide] = useState('true');

    const usernameChangeHandler = (e) => {
        setEnterdUsername(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setEnterdPassword(e.target.value)
    }

    const passwordVisibilityHandler = (e) => {
        setShowhide(!showhide);

        let x = document.getElementById("pwd");
        if(showhide)
            x.type = 'text';
        else
            x.type = 'password';
    }

    const submitHandler = (e) => {

        if(enterdPassword !== '' && enterdUsername !== '')
        {    
            const loginData = {
                'username' : enterdUsername,
                'password' : enterdPassword
            }

            fetch('/usersignin', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.message !== undefined){
                    alert(data.message)
                }
                else
                {
                    // alert(data.message);
                    sessionStorage.setItem('userID', data.userID)
                    navigate('/home')
                }
            })
            .catch((err) => {
                alert(`Error : ${err}`)
            })
        }
        else{
            alert("Please, fill all information...")
        }
    }

    return (
        <section className='signin_section'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
    
        
            <div className="signin">
                <div className="container">
                    <h2> Sign In </h2>
                    <div className="form">
                        <div className="inputbox">
                            <input type="text" value={enterdUsername} onChange={usernameChangeHandler} required />
                            <label> Username </label>
                        </div>
                        <div className="inputbox"> 
                            <input className={showhide ? "show_pwd" : "hide_pwd"} onClick={passwordVisibilityHandler} type='button' />
                            <input id='pwd' type="password" value={enterdPassword} onChange={passwordChangeHandler} required />
                            <label> Password </label>
                        </div>
                        {/* <div className="links_section">
                            <a className="links" href="#"> Forget Password? </a>
                        </div> */}
                        <div className="loginbox">
                            <button onClick={submitHandler}> Sign In </button>
                        </div>
                    </div>
                    <div className="signup_form">
                        <hr style={{color: '#aaa'}} />
                        <label id="or_span"> OR </label>
                        <div className="loginbox">
                            <input type="button" value="Sign Up" onClick={() => navigate('/signup/step-1')} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Sign_in_page