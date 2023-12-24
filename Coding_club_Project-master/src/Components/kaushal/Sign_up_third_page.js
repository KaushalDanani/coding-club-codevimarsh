import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./Sign_up_first_page.css"
import "./Sign_up_third_page.css"


function Sign_up_third_page() {

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
            email: sessionStorage.getItem('email_id'),
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
            // confirm_password: sessionStorage.getItem('confirm_password'),
            fname: sessionStorage.getItem('first_name'),
            lname: sessionStorage.getItem('last_name'),
            year: sessionStorage.getItem('graduation_year'),
            programme: sessionStorage.getItem('programme'),
            department: sessionStorage.getItem('department'),
            linkedIn: sessionStorage.getItem('linkedin_id'),
            codechef: sessionStorage.getItem('codechef_id'),
            leetcode: sessionStorage.getItem('leetcode_id')
        }

        // document.cookie = 'linkedin_id=' + linkedIn + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'codechef_id=' + codeChef + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'leetcode_id=' + leetCode + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
    
        fetch("/usersignup", {
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
                sessionStorage.setItem('userID', data.userID)
                navigate("/home")
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
                    <form action="/userSignup" method='POST'>
                        <div className="form">
                            <div className="inputbox">
                                <input name='linkedin_id' value={linkedIn} onChange={linkedInChangeHandler} type="text" required />
                                <label> Linked-in ID </label>
                            </div>
                            <div className="inputbox"> 
                                <input name='codechef_id'  value={codeChef} onChange={codeChefChangeHandler} type="text" required />
                                <label> Code-Chef ID </label>
                            </div>
                            <div className="inputbox"> 
                                <input name='leetcode_id'  value={leetCode} onChange={leetCodeChangeHandler} type="text" required />
                                <label> LeetCode ID </label>
                            </div>
                            
                            <div style={{display: 'inline', gap: '15px'}}>
                                <div className="backbox">
                                    <input type="button" value="Back" onClick={() => navigate('/signup/step-2')}/>
                                </div>
                                <div className="final_signup">
                                    <button className='final_signupButton' onClick={submitHandle}> Sign Up </button>
                                </div>
                            </div>

                            <div style={{display: 'flex', height: '10px', gap: '5%'}}>
                                <div className="trackbar" id='firstbar'></div>
                                <div className="trackbar" id='secondbar'></div>
                                <div className="trackbar" id='thirdbar'></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Sign_up_third_page