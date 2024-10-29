import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./Sign_up_first_page.css"
import "./Sign_up_second_page.css"
import useUser from '../../store/userContext.js'


function Sign_up_second_page() {

    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const [linkedIn, setLinkedIn] = useState('')
    const [codeChef, setCodeChef] = useState('')
    const [leetCode, setLeetCode] = useState('')

    useEffect(() => {
        if(sessionStorage.getItem('linkedin_id') != null)
            setLinkedIn(sessionStorage.getItem('linkedin_id'))
        if(sessionStorage.getItem('codechef_id') != null)
            setCodeChef(sessionStorage.getItem('codechef_id'))
        if(sessionStorage.getItem('leetcode_id') != null)
            setLeetCode(sessionStorage.getItem('leetcode_id'))   
    }, []);

    const linkedInChangeHandler = (e) => {
        setLinkedIn(e.target.value)
    }
    const codeChefChangeHandler = (e) => {
        setCodeChef(e.target.value)
    }
    const leetCodeChangeHandler = (e) => {
        setLeetCode(e.target.value)
    }

    const submitHandle = async (e) => {
        e.preventDefault();

        sessionStorage.setItem('linkedin_id', linkedIn)
        sessionStorage.setItem('codechef_id', codeChef)
        sessionStorage.setItem('leetcode_id', leetCode)

        const formData = {
            prn: sessionStorage.getItem('prn'),
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
            linkedin: sessionStorage.getItem('linkedin_id'),
            codechef: sessionStorage.getItem('codechef_id'),
            leetcode: sessionStorage.getItem('leetcode_id')
        }

        // document.cookie = 'linkedin_id=' + linkedIn + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'codechef_id=' + codeChef + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'leetcode_id=' + leetCode + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
    
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 
                'Content-Type': 'application/json' 
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.error);
            // alert(data.userID);
            if(data.error === undefined){

                sessionStorage.removeItem('prn');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('password');
                sessionStorage.removeItem('linkedin_id');
                sessionStorage.removeItem('codechef_id');
                sessionStorage.removeItem('leetcode_id');

                // sessionStorage.setItem('userID', data.userID)
                setUser(data.user);
                navigate("/")
            }
            else{
                alert(data.error)
            }
            
            // console.log(data);
        })
          .catch((error) => {
            // Handle network errors
            console.log(error)
          });
    }

  return (
        <>
        <div className='signup_body'>
            <div className="signup">
                <div className="container">
                    <h2> Sign Up </h2>
                        <div className="form">
                            <div className="inputbox">
                                <input name='linkedin_id' value={linkedIn} onChange={linkedInChangeHandler} type="text" required />
                                <label> Linkedin ID </label>
                            </div>
                            <div className="inputbox"> 
                                <input name='codechef_id'  value={codeChef} onChange={codeChefChangeHandler} type="text" required />
                                <label> Codechef ID </label>
                            </div>
                            <div className="inputbox"> 
                                <input name='leetcode_id'  value={leetCode} onChange={leetCodeChangeHandler} type="text" required />
                                <label> Leetcode ID </label>
                            </div>
                            
                            <div style={{display: 'inline', gap: '15px'}}>
                                <div className="backbox">
                                    <button className='backButtonDiv' onClick={() => navigate('/signup/step-1')}>Back</button>
                                </div>
                                <div className="final_signup">
                                    <button className='final_signupButton' onClick={submitHandle}> Sign Up </button>
                                </div>
                            </div>

                            <div style={{display: 'flex', height: '10px', gap: '5%', justifyContent: 'center'}}>
                                <div className="trackbar" id='firstbar'></div>
                                <div className="trackbar" id='secondbar'></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Sign_up_second_page