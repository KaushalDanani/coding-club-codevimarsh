import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import "./Sign_up_first_page.css";
import "./Sign_up_second_page.css";

function Sign_up_second_page() {

    const navigate = useNavigate()

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [selectedG_yearOption, setSelectedG_yearOption] = useState('');
    const [selectedDeptOption, setSelectedDeptOption] = useState('');
    const [selectedProgrammeOption, setSelectedProgrammeOption] = useState('');

    useEffect(() => {
        if(sessionStorage.getItem('first_name') != null)
            setFname(sessionStorage.getItem('first_name'))
        if(sessionStorage.getItem('last_name') != null)
            setLname(sessionStorage.getItem('last_name'))
        if(sessionStorage.getItem('graduation_year') != null)  
            setSelectedG_yearOption(sessionStorage.getItem('graduation_year'))
        if(sessionStorage.getItem('programme') != null)
            setSelectedProgrammeOption(sessionStorage.getItem('programme'))
        if(sessionStorage.getItem('department') != null)
            setSelectedDeptOption(sessionStorage.getItem('department'))
    }, []);

    const fnameChangeHandler = (e) => {
        setFname(e.target.value)
    }
    const lnameChangeHandler = (e) => {
        setLname(e.target.value)
    }
    const g_yearChangeHandler = (e) => {
        setSelectedG_yearOption(e.target.value);
    }
    const deptChangeHandler = (e) => {
        setSelectedDeptOption(e.target.value);
    }
    const programmeChangeHandler = (e) => {
        setSelectedProgrammeOption(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(fname !== '' && lname !== '' && selectedG_yearOption !== '' && selectedDeptOption !== '' && selectedProgrammeOption !== '')
            navigate('/signup/step-3')
        else
            alert("Please, fill all required information...")

        sessionStorage.setItem('first_name', fname)
        sessionStorage.setItem('last_name', lname)
        sessionStorage.setItem('graduation_year', selectedG_yearOption)
        sessionStorage.setItem('programme', selectedProgrammeOption)
        sessionStorage.setItem('department', selectedDeptOption)

        // document.cookie = 'first_name=' + fname + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'last_name=' + lname + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'graduation=' + selectedG_yearOption + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'programme=' + selectedProgrammeOption + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // document.cookie = 'department=' + selectedDeptOption + ';' + 'expires=' + new Date(3000, 0, 1).toUTCString();
        // navigate('/signup/step-3')
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
                            <div className='first_lastname_field'>
                                <div className="inputbox">
                                    <input type="text" name='first_name' value={fname} onChange={fnameChangeHandler} required={true} />
                                    <label> First Name </label>
                                    { (fname === '') && (<div className='requireSuggestion'> *First name is required. </div>) }
                                </div>
                                <div id='lastNameContainer' className="inputbox"> 
                                    <input type="text" name='last_name' value={lname} onChange={lnameChangeHandler} required={true} />
                                    <label> Last Name </label>
                                    { (lname === '') && (<div className='requireSuggestion'> *Last name is required. </div>) }
                                </div>
                            </div>
                            <div className="inputbox" >
                                <select name='graduation' id='g_year' value={selectedG_yearOption} onChange={g_yearChangeHandler}>
                                    <option value="" disabled hidden>Select a Graduation Year</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                </select>
                                { (selectedG_yearOption === '') && (<div className='requireSuggestion'> *Graduation year is required. </div>) }
                            </div>
                            <div className="inputbox">
                                <select name='programme' id='programme' value={selectedProgrammeOption} onChange={programmeChangeHandler}>
                                    <option value="" disabled hidden>Select a Programme</option>
                                    <option value="Bachelor's of Engineering">Bachelor's of Engineering</option>
                                    <option value="Bachelor's of Computer Application">Bachelor's of Computer Application</option>
                                    <option value="Masters of Computer Application">Masters of Computer Application</option>
                                </select>
                                { (selectedProgrammeOption === '') && (<div className='requireSuggestion'> *Programme is required. </div>) }
                            </div>
                            <div className="inputbox">
                                <select name='department' id='dept' value={selectedDeptOption} onChange={deptChangeHandler}>
                                    <option value="" disabled hidden>Select a Department</option>
                                    <option value="Computer Science & Engg.">Computer Science & Engg.</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Electronic Engineering">Electronic Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                </select>
                                { (selectedDeptOption === '') && (<div className='requireSuggestion'> *Department is required. </div>) }
                            </div>
                            <div style={{display: 'inline', gap: '15px'}}>
                                <div className="backbox">
                                    <Link to={'/signup/step-1'}> <input type="button" value="Back" /> </Link>
                                </div>
                                <div className="signupbox">
                                    <button className='signupButton' onClick={submitHandler}> Next </button>
                                </div>
                            </div>

                            <div style={{display: 'flex', height: '10px', gap: '5%'}}>
                                <div className="trackbar" id='firstbar'></div>
                                <div className="trackbar" id='secondbar'></div>
                                <div className="trackbar"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Sign_up_second_page