import React from 'react'
import { useEffect, useState } from 'react'
import './Comment.css'
import Upvote from './upvote.js'


export default function Comment(props) {
    const [qDate, setQDate] = useState("");

    const userID = sessionStorage.getItem('userID');
    const admin = sessionStorage.getItem('isAdmin');
    const delCheck = (userID === props.commenter_id || admin ==='true');
    //console.log(delCheck + "frr?");

    function deleteRep(r_id) {
        const conf = window.confirm('Are you sure you want to delete this reply?');
        if (conf) {
            fetch(`/discussion/question/delRep/${r_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((data) => {
                    // Handle success or show a message if needed
                    alert("Reply Deleted!!");
                    window.location.reload();
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
        <div className='c_class'>
            {/* <button type='button'
                className='del'
                id={props.q_id}
                onClick={() => deleteRep(props._id)}
                style={{ display: (delCheck ? 'block' : 'none') }}
            >

            </button> */}

            <div id='commenter'>
                <a href={`../profile?visitID=${props.commenter_id}`}><div id='pfp_div'><img src={`data:Image/jpeg;base64,${props.pfp}`} alt="" id='pfpic' /></div></a>
                <div id='commenter_id'><a href={`../profile?visitID=${props.commenter_id}`}>{props.commenter}</a>
                    <button
                        className='deleteRep'
                        id={props._id}
                        onClick={() => deleteRep(props._id)}
                        style={{ display: (delCheck ? 'block' : 'none') }}
                    ></button>
                </div>
            </div>
            <div id="com_div">
                {props.comment}
            </div>
            <div className={(props.code == "" || props.code == null) ? 'noSnippet' : 'snippet'}>
                <pre>
                    {props.code}
                </pre>
            </div>
            <div id='feed_bar'>
                <div id='upvote_div'>
                    <Upvote value={props.value} Id={props._id} type='r' count={props.up_count} user={props.userID} />
                    {/* {props.up_count} */}
                </div>

                <div id='date_div'>
                    {qDate}
                </div>
            </div>
        </div>
    )
}
