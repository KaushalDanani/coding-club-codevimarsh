import Discussion_block from "./Discussion_block.js";
// import pfp from './res/pfp.png';
import { useEffect, useState, React } from "react";
import "./Discussion_Forums.css"
// import {Link} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { question_open } from '../Question_answer_jp/Ask_Question.js';
import useUser from "../../store/userContext.js";

function ForumGenerator(props) {
  const [ques, setQues] = useState([]);
  const [m, setM] = useState(new Map());
	const [changeImage, setChangeImage] = useState('true');
  const { user } = useUser();
  // console.log(user, '👍👍👍👍👍🧑🧑🧑🧑🧑 from DiscussionData.js');

  useEffect(() => {
      setQues(props.questions);
      const mArray = props.array;
      const map = new Map(mArray);
      setM(map);

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

        <hr style={{width: '83%', height: '2.5px', backgroundColor: 'white', marginTop: '0px', marginLeft: '130px',marginRight: '130px', marginBottom: '2.5vh'}}/>
			
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