import React, { useEffect, useState } from 'react';
import './Question.css'
import Upvote from './upvote.js';
import { Link } from 'react-router-dom'

export default function Question(props) {
        
    const [x, setX] = useState("");
    const [t, setT] = useState("");
    
    useEffect(()=>{
        if(props.code){
            const str = props.code.replace(/\\n/g,'\n');
            setX(str);
        }
    },[props.code])

    let bool = props.value;

    return (
        <>
            <div className='q_class'>
                <div id='asker'>
                    <a href={`../profile?visitID=${props.asker_id}`}><div id='pfp_div'><img src={`data:Image/jpeg;base64,${props.pfp}`} alt="Profile" id='pfpic' loading="lazy" /></div></a>
                    <div id='asker_id'><a href={`../profile?visitID=${props.asker_id}`}>{props.asker_username}</a></div>
                </div>
                <h2 id='Que_statement'>
                    <b>{props.question}</b>
                </h2>
                <div id="des_div">
                    {props.description}
                </div>

                <div className={(props.code == "" || props.code == null) ? 'noSnippet':'snippet'}>

                    <pre>
                        {x}
                    </pre>
                </div>
                <div id='feed_bar' className='d-flex'>
                    <div id='upvote_div'>
                        <Upvote value={bool} Id={props._id} type='q' count={props.up_count} user={props.userID}/>
                    </div>
                    <div id='comment_div'>
                        <Link to={`/discussion/question/addReply?q_id=${props._id}`}><button id='com_button'> Comment</button></Link>
                    </div>
                    <div id='date_div'>
                        {props.date}
                    </div>
                </div>
            </div>
            <div id='reply_head'>
                Replies:
            </div>
        </>
    )
}
