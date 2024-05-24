import Discussion_block from "./Discussion_block.js";
// import pfp from './res/pfp.png';
import { useEffect, useState, React } from "react";
import "./Discussion_Forums.css"
// import {Link} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { question_open } from '../Question_answer_jp/Ask_Question.js';
import useUser from "../../store/userContext.js";
import ToastComponent from "../jay fanse/toastComponent.js";

function ForumGenerator() {
  const [ques, setQues] = useState([]);
  const [m, setM] = useState(new Map());
	const [changeImage, setChangeImage] = useState('true');

  const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");
  
  const { user }= useUser();
  // console.log(user, '👍👍👍👍👍🧑🧑🧑🧑🧑 from DiscussionData.js');

  useEffect(() => {
    fetch('/discussion', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
          // return response.json();
        }
        return response.json();
      })
      .then(data => {
        setQues(data.ques);

        const mArray = data.mArray;
        const map = new Map(mArray);
        setM(map);
         
        // console.log(ques);
        // console.log(map);
        // window.location.reload();

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array to fetch data once on component mount

  function deleteQuestionFromList(key)
  {
    const newQues = ques.filter(question => question._id !== key);
    setQues(newQues);
    setToastVisible(true);
          setToastMessage("Question deleted successfully!");
          setToastType("success");
          setTimeout(() => {
            setToastVisible(false)
            // window.location.reload();
          }, 4000);
  }



  // function MakeDiscussion(disc) {
  //   // console.log(disc);
  //   return (
  //     <Discussion_block
  //       pfp={m.get(disc._id).profileImg}
  //       asker_username={m.get(disc._id).username}
  //       asker_id={m.get(disc._id)._id}
  //       question={disc.question}
  //       tags={disc.tags}
  //       date={disc.askDate}
  //       _id={disc.asker}
  //       q_id={disc._id}
  //     />
  //   );
  // }

  return (
    <>
  

  {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

        <hr style={{width: '83%', height: '2.5px', backgroundColor: 'white', marginLeft: '130px',marginRight: '130px', marginBottom: '2.5vh'}}/>
			
      {ques.length!==0 ? 

      ques.map((disc, idx) => (
          <Discussion_block
          key={idx}
          pfp={m.get(disc._id).profileImg}
          asker_username={m.get(disc._id).username}
          asker_id={m.get(disc._id)._id}
          question={disc.question}
          tags={disc.tags}
          date={disc.askDate}
          _id={disc.asker}
          q_id={disc._id}
          deleteQuestionFromList={deleteQuestionFromList}
        />
      ))
    
      :
      <div className="discussionNullContent">

        <div className="nullContentInfo">No Discussions for now :)
        <br></br>Why not start one!?</div>
        
      </div>
      }
    </>
  );
}


export default ForumGenerator
{/* 

onClick={question_open}


<div class="container">
  
  <a href="#" class="coolButton">Hover me</a>
  
</div>   */}