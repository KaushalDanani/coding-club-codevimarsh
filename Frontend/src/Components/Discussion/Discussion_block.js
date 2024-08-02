import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./DiscussionCard.css";
import "./Discussion_Forums.css";
import useUser from '../../store/userContext.js';
import ToastComponent from '../Toast/toastComponent.js';

export default function Discussion_block(props) {
  function getTag(tag) {
    return (
      <div className="q_tag" key={tag}>
        {tag}
      </div>
    );
  }

  const [tag, setTags] = useState([]);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (props.tags) {
      setTags(props.tags);
    }
  }, [props.tags]);

  const [qDate, setQDate] = useState("");

  useEffect(() => {
    if (props.date) {
      var dt = new Date(props.date);
      setQDate(dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear());
    }
  }, [props.date]);

  const {user} = useUser();

  
  const isAdmin = user.isAdmin;
  const userID = user._id;
  const delCheck = (userID === props.asker_id || isAdmin===true);

  function deleteQue(q_id) {
    const conf = window.confirm('Are you sure you want to delete this reply?');
    if(conf){
      fetch(`http://localhost:5000/discussion/delQue/${q_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(() => {
          props.deleteQuestionFromList(props.q_id);
        })
        .catch(error => {
          console.error('Error deleting question:', error);
        });
    }
  }

  return (
    <>
      {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

      <div className='discussion_c_card'>
        <div className='avtarDisc'>
          <a href={`profile?visitID=${props.asker_id}`}>
            <img src={`data:Image/jpeg;base64,${props.pfp}`} alt={`Profile of ${props.asker_username}`} loading="lazy" />
          </a>
        </div>
        <div className='innercontentDisc'>
          <div className='asker' id={props._id}>
            <div id='asker_id'>
              <a href={`profile?visitID=${props.asker_id}`}>{props.asker_username}</a>
            </div>
            <button
              className='del_discussion'
              id={props.q_id}
              onClick={() => deleteQue(props.q_id)}
              style={{ display: (delCheck ? 'block' : 'none') }}
            ></button>
          </div>
          <a href={`discussion/question?q_id=${props.q_id}`}>
            <div id='ques'>
              {props.question}
            </div>
            <div id="ques_tags">
              <div className="all_que_tag">{tag.map(getTag)}</div>
              <div id='q_date'>{qDate}</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}