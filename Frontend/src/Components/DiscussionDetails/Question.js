import React, { useEffect, useState } from "react";
import "./Question.css";
import Upvote from "./upvote.js";
import { Link } from "react-router-dom";

function Question(props) {
  const [qDate, setQDate] = useState("");
  let bool = props.value;

  useEffect(() => {
    if (props.date) {
      var dt = new Date(props.date);
      setQDate(dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear());
    }
  }, [props.date]);


  return (
    <>
      <div className="discussion_c_card questionCard">
        <div className="avtarDisc">
          <a href={`profile?visitID=${props.asker_id}`}>
            <img
              src={`data:Image/jpeg;base64,${props.pfp}`}
              alt={`Profile of ${props.asker_username}`}
              loading="lazy"
            />
          </a>
        </div>
        <div className="innercontentDisc">
          <div className="asker" id={props._id}>
            <div id="asker_id">
              <a href={`profile?visitID=${props.asker_id}`}>
                {props.asker_username}
              </a>
            </div>
          </div>
          <h2 id="Que_statement">
            <b>{props.question}</b>
          </h2>
          <div id="des_div">
            <pre className='objectDescription'>{props.description}</pre>
          </div>
          <div
            className={
              props.code == "" || props.code == null ? "noSnippet" : "snippet"
            }
          >
            <pre className='objectDescription'>{props.code}</pre>
          </div>
          <div id="feed_bar" className="d-flex">
            <div id="upvote_div">
              <Upvote
                value={bool}
                Id={props._id}
                type="q"
                count={props.up_count}
                user={props.userID}
              />
            </div>
            <div id="comment_div">
              <Link to={`/discussion/question/addReply?q_id=${props._id}`}>
                <button id="com_button">Comment</button>
              </Link>
            </div>
            <div id="date_div">{qDate}</div>
          </div>
        </div>
      </div>

      <div id="reply_head">Replies:</div>
    </>
  );
}

export default React.memo(Question);
