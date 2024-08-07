import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './AddProjectCollabration.css'
import useUser from '../../store/userContext.js'
import ToastComponent from '../Toast/toastComponent.js'

function AddProjectCollabration() {

    const navigate = useNavigate();

    const [pc_title, setPc_title] = useState('')
    const [pc_tags, setPc_tags] = useState('')
    const [pc_description, setPc_description] = useState('')

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const { user, setUser } = useUser();

    const [userID, setUserID] = useState(user._id)

    const titleChangeHandler = (e) => {
        setPc_title(e.target.value)
    }
    const tagsChangeHandler = (e) => {
        setPc_tags(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        setPc_description(e.target.value)
    }

    function clearProjectCollaboration() {
        setPc_title("");
        setPc_tags("");
        setPc_description("");
    }

    async function submitHandler(){

        const formData = {
            userID: userID,
            collabrationTitle: pc_title,
            collabrationTags: pc_tags.split(',').map(tag => tag.trim()),
            collabrationDescription: pc_description
        }

        if (pc_title !== '' && pc_tags !== '' && pc_description !== '') {
            try {
            const response = await fetch('/addprojectcollabration', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
                   setToastVisible(true);
                    setToastMessage('Project Collaboration added successfully');
                    setToastType("success");
                    setTimeout(() => {
                        setToastVisible(false)
                        navigate('/project_collab');
                    }, 1000);
                // })
            }
            catch(err) {
                // alert(`Error Bye 3 : ${err}`)-
            }
        }
        else {
            // alert("Please, Fill all information...")
            setToastVisible(true);
            setToastMessage("Please, Fill all information...");
            setToastType("warning");
            setTimeout(() => {
                setToastVisible(false)
                //   navigate('/project_collab');
            }, 4000);
        }
    }

    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Link to={'/project_collab'}>
                <div className='projCollabBackBtn'></div>
            </Link>
            <div className='addprojectCollabrationContainer'>
                <div className='addProjectCollabrationHeader'>
                    <h1> Add Project Collaboration </h1>
                </div>
                {/* <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} /> */}
                <div className='formContainer'>
                        {/* <label htmlFor='title'> Title: </label>
                        <div className='formLabels'>
                            <input id='title' name='collabrationTitle' type="text" value={pc_title} onChange={titleChangeHandler} required />
                        </div> */}
                        <div className="addSubjectRow">
                            <div>Title</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="collabrationTitle"
                            value={pc_title} onChange={titleChangeHandler} required></input>
                        </div>

                        {/* <label htmlFor='tags'> Tags: </label>
                        <div className='formLabels'>
                            <input id='tags' name='tags' placeholder='Enter tags i.e. Java,C,DSA... ' type="text" value={pc_tags} onChange={tagsChangeHandler} required />
                        </div> */}
                        <div className="addSubjectRow">
                            <div>Tags</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text"
                            name='tags' placeholder='Enter tags i.e. Java, C, DSA... ' value={pc_tags} onChange={tagsChangeHandler} required></input>
                        </div>

                        {/* <label htmlFor='pc_desc'> Description: </label>
                        <div className='formLabels'>
                            <input id='pc_desc' name='description' type="text" value={pc_description} onChange={descriptionChangeHandler} required />
                        </div> */}
                        <div className="addSubjectRow">
                            <div>Description</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="description" value={pc_description} onChange={descriptionChangeHandler} required></input>
                        </div>

                        <div className='addSubjectBtn'>
                            <button onClick={clearProjectCollaboration}> Clear </button>

                            <button onClick={submitHandler} >Add</button>
                        </div>
                </div>
            </div>

        </>
    )
}

export default AddProjectCollabration