import React from 'react'
import { useEffect, useState } from 'react'
import './Comment.css'
import Upvote from './upvote.js'
import ToastComponent from '../Toast/toastComponent.js'

function Comment(props) {
    const [qDate, setQDate] = useState("");
        
    const [userID, setUserID] = useState("");
    const [admin, setAdmin] = useState("");
    const [commenter_id, setCommenterID] = useState("");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    useEffect(() => {
        if (props.userID != null)
            setUserID(props.userID);
    }, [props.userID])

    useEffect(() => {
        if (props.admin != null)
            setAdmin(props.admin);
    }, [props.admin])

    useEffect(() => {
        if (props.commenter_id != null)
            setCommenterID(props.commenter_id);
    }, [props.commenter_id])

    const delCheck = (userID === commenter_id || admin === true);    

    function deleteRep(r_id) {
        const conf = window.confirm('Are you sure you want to delete this reply?');
        if (conf) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/discussion/question/delRep/${r_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((data) => {
                    
                    props.deleteReplyFromList(props._id);
                    
                })
                .catch(error => {
                    console.error('Error deleting reply:', error);
                });
        }
    }

    useEffect(() => {
        if (props.date) {
            var dt = new Date(props.date);
            setQDate(dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear());
        }
    }, [props.date])


    return (

        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <div className='discussion_c_card'>

                <div className="avtarDisc">
                    <a href={`profile?visitID=${props.commenter_id}`}>
                        <img
                        src={`data:Image/jpeg;base64,${props.pfp}`}
                        alt={`Profile of ${props.commenter}`}
                        loading="lazy"
                        />
                    </a>
                </div>
                <div className="innercontentDisc">
                    <div className="asker" id={props._id}>
                        <div id="commenter_id">
                            <a href={`profile?visitID=${props.commenter_id}`}>
                                {props.commenter}
                            </a>
                        </div>
                        <button
                            className='deleteRep'
                            id={props._id}
                            onClick={() => deleteRep(props._id)}
                            style={{ display: (delCheck ? 'block' : 'none') }}>
                        </button>
                    </div>
                
                    <div id="com_div">
                        <pre className='objectDescription'>{props.comment}</pre>
                    </div>
                    <div className={(props.code == "" || props.code == null) ? 'noSnippet' : 'snippet'}>
                        <pre className='objectDescription'>{props.code}</pre>
                    </div>
                    <div id='feed_bar'>
                        <div id='upvote_div'>
                            <Upvote value={props.value} Id={props._id} type='r' count={props.up_count} user={props.userID} />
                        </div>

                        <div id='date_div'>
                            {qDate}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(Comment);