import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './AddProjectCollabration.css'
import Navbar_after_login from './Navbar_after_login'
import useUser from '../../store/userContext'

function AddProjectCollabration() {

    const navigate = useNavigate();

    const [pc_title, setPc_title] = useState('')
    const [pc_tags, setPc_tags] = useState('')
    const [pc_description, setPc_description] = useState('')

    const {user,setUser} = useUser();

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



    const submitHandler = (e) => {

        const formData = {
            userID: userID,
            collabrationTitle: pc_title,
            collabrationTags: pc_tags.split(','),
            collabrationDescription: pc_description
        }

        if(pc_title !== '' && pc_tags !== '' && pc_description !== '')
        {
            fetch('/addprojectcollabration', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((data) => {
                alert('Project Collabration added successfully')
            })
            .catch((err) => {
                // alert(`Error Bye 3 : ${err}`)
            })
        }
        else {
            alert("Please, Fill all information...")
        }
    }

  return (
    <>     
        <Link to={'/project_collab'}>
        <div className='projCollabBackBtn'></div>
        </Link>
        <div className='addprojectCollabrationContainer'>
            <div className='addProjectCollabrationHeader'>
                <h1> Add Project Collaboration Details </h1>
            </div>
            <hr style={{height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px'}} />
            <div className='formContainer'>
                <form>
                    <label htmlFor='title'> Title: </label>
                    <div className='formLabels'>
                        <input id='title' name='collabrationTitle' type="text" value={pc_title} onChange={titleChangeHandler} required />
                    </div>

                    <label htmlFor='tags'> Tags: </label>
                    <div className='formLabels'>
                        <input id='tags' name='tags' placeholder='Enter tags i.e. Java,C,DSA... ' type="text" value={pc_tags} onChange={tagsChangeHandler} required />
                    </div>

                    <label htmlFor='pc_desc'> Description: </label>
                    <div className='formLabels'>
                        <input id='pc_desc' name='description' type="text" value={pc_description} onChange={descriptionChangeHandler} required />
                    </div>

                    <div className='buttonSection'>
                        <Link to={'/project_collab'}> <button id='pc_cancelbtn' className='addProjectCollabrationBtn'> Cancel </button> </Link>
                        <Link to={'/project_collab'}> <button id='pc_addbtn' className='addProjectCollabrationBtn' onClick={submitHandler}> Post </button> </Link>
                    </div>
                </form>
            </div>
        </div>

    </>
  )
}

export default AddProjectCollabration