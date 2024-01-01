import Discussion_block from "./Discussion_block.js";
// import pfp from './res/pfp.png';
import { useEffect, useState, React } from "react";
import "./Discussion_Forums.css"
// import {Link} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { question_open } from '../Question_answer/Ask_Question.js';
import useUser from "../../store/userContext.js";

function ForumGenerator() {
  const [ques, setQues] = useState([]);
  const [m, setM] = useState(new Map());
	const [changeImage, setChangeImage] = useState('true');

  
  const { user }= useUser();
  console.log(user, '👍👍👍👍👍🧑🧑🧑🧑🧑 from DiscussionData.js');

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
  


        <hr style={{width: '90%', height: '2.5px', backgroundColor: 'white', marginLeft: '70px',marginRight: '60px', marginBottom: '2.5vh'}}/>
			
      {ques.map((disc, idx) => (
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
        />
      ))}
    </>
  );
}


export default ForumGenerator
{/* 

onClick={question_open}


<div class="container">
  
  <a href="#" class="coolButton">Hover me</a>
  
</div>   */}