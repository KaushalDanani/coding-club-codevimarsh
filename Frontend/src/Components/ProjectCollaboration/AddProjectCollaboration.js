import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState , useEffect} from 'react'
import useUser from '../../store/userContext.js'
import ToastComponent from '../Toast/toastComponent.js'

function AddProjectCollaboration() {

    const { user, setuser } = useUser();
    const navigate = useNavigate();

    const [pc_title, setPc_title] = useState('')
    const [pc_tags, setPc_tags] = useState('')
    const [pc_description, setPc_description] = useState('')

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [userID, setUserID] = useState();

    useEffect(() => {
        if(user)
            setUserID(user._id);
    },[user])

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

    async function submitHandler(e){

        e.preventDefault();
        const formData = {
            userID: userID,
            collaborationTitle: pc_title,
            collaborationTags: pc_tags.split(',').map(tag => tag.trim()),
            collaborationDescription: pc_description
        }

        if (pc_title !== '' && pc_tags !== '' && pc_description !== '') {
            try {
            const response = await fetch('http://localhost:5000/projectCollaboration/add', {
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
                        navigate('/projectcollaboration');
                    }, 1000);
                // })
            }
            catch(err) {
                // alert(`Error Bye 3 : ${err}`)
            }
        }
        else {
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

            <Link to={'/projectcollaboration'}>
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className='addObjectContainer'>
                <div className='addObjectHeader'>
                    <h1> Add Project Collaboration </h1>
                </div>
                {/* <form> */}
                <form className='addObjectBody' onSubmit={submitHandler}>
                        {/* <label htmlFor='title'> Title: </label>
                        <div className='formLabels'>
                            <input id='title' name='collaborationTitle' type="text" value={pc_title} onChange={titleChangeHandler} required />
                        </div> */}
                        <div className="addObjectRow">
                            <div>Title</div>
                            <div>:</div>
                            <input type="text" name="collaborationTitle"
                            value={pc_title} onChange={titleChangeHandler} required></input>
                        </div>

                        {/* <label htmlFor='tags'> Tags: </label>
                        <div className='formLabels'>
                            <input id='tags' name='tags' placeholder='Enter tags i.e. Java,C,DSA... ' type="text" value={pc_tags} onChange={tagsChangeHandler} required />
                        </div> */}
                        <div className="addObjectRow">
                            <div>Tags</div>
                            <div>:</div>
                            <input type="text"
                            name='tags' placeholder='Enter tags i.e. Java, C, DSA... ' value={pc_tags} onChange={tagsChangeHandler} required></input>
                        </div>

                        {/* <label htmlFor='pc_desc'> Description: </label>
                        <div className='formLabels'>
                            <input id='pc_desc' name='description' type="text" value={pc_description} onChange={descriptionChangeHandler} required />
                        </div> */}
                        <div className="addObjectRow">
                            <div>Description</div>
                            <div>:</div>
                            <input type="text" name="description" value={pc_description} onChange={descriptionChangeHandler} required></input>
                        </div>

                        <div className='addObjectBtn'>
                            <button onClick={clearProjectCollaboration}> Clear </button>

                            <button type='submit'> Add Project Collaboration </button>
                        </div>
                {/* </div> */}
                </form>
            </div>

        </>
    )
}

export default AddProjectCollaboration