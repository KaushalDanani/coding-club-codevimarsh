import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./DiscussionCard.css";
import "./Discussion_Forums.css";
import Upvote from '../DiscussionDetails/upvote.js';
import useUser from '../../store/userContext.js';
import ToastComponent from '../Toast/toastComponent.js';
import TechTag from '../Tags/TechTag.js';

function Discussion_block(props) {
  const { user, setUser } = useUser();
  const [tag, setTags] = useState([]);
  const [qDate, setQDate] = useState("");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  // const [isAdmin, setAdminVal] = useState(false)
  const [userID,setUserID] = useState()
  const [delCheck, setDelCheck] = useState(false)

  useEffect(() => {
    if (props.tags) {
      setTags(props.tags);
    }
  }, [props.tags]);

  // console.log(props);

  function getTag() {
    if(tag.length!=1 || tag[0]!="")
    {
      return(
          tag.map((tag, idx) => <TechTag key={idx} tagname = {tag} />)
      )
    }
  }


  useEffect(() => {
    if (props.date) {
      var dt = new Date(props.date);
      setQDate(dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear());
    }
  }, [props.date]);


  useEffect(()=>{
    // setAdminVal(user.isAdmin);
    setUserID(user._id);
    setDelCheck(user._id === props.asker_id || user.isAdmin===true);
  },[user])

  function deleteQue(q_id) {
    const conf = window.confirm('Are you sure you want to delete this reply?');
    if(conf){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/discussion/delQue/${q_id}`, {
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
          <Link to={`/profile?visitID=${props.asker_id}`} href={`profile?visitID=${props.asker_id}`}>
            <img src={`data:Image/jpeg;base64,${props.pfp}`} alt={`Profile of ${props.asker_username}`} loading="lazy" />
          </Link>
        </div>
        <div className='innercontentDisc'>
          <div className='asker' id={props._id}>
            <div id='asker_id'>
              <Link to={`/profile?visitID=${props.asker_id}`} href={`profile?visitID=${props.asker_id}`}>{props.asker_username}</Link>
            </div>
            <button
              className='del_discussion'
              id={props.q_id}
              onClick={() => deleteQue(props.q_id)}
              style={{ display: (delCheck ? 'block' : 'none') }}
            ></button>
          </div>
          <Link to={`question?q_id=${props.q_id}`} href={`discussion/question?q_id=${props.q_id}`}>
            <div id='ques'>
              {props.question}
            </div>
          </Link>
            <div id="ques_tags">
              <div className='upvote-tags-container'>
                <Upvote value={props.value} Id={props.q_id} type='q' count={props.up_count} user={userID}/>
                <div className="all_que_tag">{getTag()}</div>
              </div>
              <div id='q_date'>{qDate}</div>
            </div>
        </div>
      </div>
    </>
  );
}


export default React.memo(Discussion_block);