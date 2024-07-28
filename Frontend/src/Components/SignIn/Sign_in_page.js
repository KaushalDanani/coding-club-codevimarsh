import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./Sign_in_page.css";
import useUser from '../../store/userContext.js';

function Sign_in_page() {
    const navigate = useNavigate();

    const {user, setUser} = useUser();


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

            fetch('http://localhost:5000/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(loginData),
            })
            .then(response => response.json())
            .then(data => {
                if(data.message !== undefined){
                    alert(data.message)
                }
                else
                {
                    setUser(data.user);
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
        <>
        <div className='signin_body'>
            <div className="signin">
                <div className="container">
                    <h2> Sign In </h2>
                    <div className="form">
                        <div className="inputbox">
                            <input type="text" value={enterdUsername} onChange={usernameChangeHandler} required />
                            <label> Username </label>
                        </div>
                        <div className="inputbox"> 
                            <div className={showhide ? "show_pwd" : "hide_pwd"} onClick={passwordVisibilityHandler} onMouseDown={(event) => event.preventDefault()} />
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
                        <div className='or-section'>
                            <hr style={{width: '40%', backgroundColor: '#fff', height: '2px'}} />
                            <label id="or_span"> OR </label>
                            <hr style={{width: '43%', backgroundColor: '#fff', height: '2px'}} />
                        </div>
                        <div className="loginbox">
                            <button onClick={() => navigate('/signup/step-1')}> Sign Up </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
        // </section>
  )
}

export default Sign_in_page