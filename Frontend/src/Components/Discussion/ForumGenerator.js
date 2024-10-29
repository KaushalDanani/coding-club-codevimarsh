import Discussion_block from "./Discussion_block.js";
import { useEffect, useState, React } from "react";
// import {Link} from 'react-router-dom'
// import "./Discussion_Forums.css"
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";
import ForumGeneratorSkeleton from "./ForumGeneratorSkeleton.js";

function ForumGenerator(props) {
  const { user, setUser } = useUser();

  const [ques, setQues] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [m, setM] = useState(new Map());
  const [qUps, setQUps] = useState([]);

  const [toastVisible,setToastVisible] = useState(false);
  const [toastMessage,setToastMessage] = useState("");
  const [toastType,setToastType] = useState("");
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if(props.search != "") {
        const filterQuestionsRelativeTags = ques.filter((question) =>
          question.tags.toString().toLowerCase().includes(props.search.toLowerCase()));

        setFilteredQuestions(filterQuestionsRelativeTags);
      }
  }, [props.search])

  const fetchDiscussionData = async () => {
    if(userID != null)
    {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/discussion?userID=${userID}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        setQues(data.ques);
        setFilteredQuestions(data.ques);
        const mArray = data.mArray;
        const map = new Map(mArray);
        setM(map);
        setQUps(data.qUpArray);
      }
      catch(err)
      {
        console.error(err, err.response);
      }
    }
  }
    
    useEffect(()=>{
        if(user) {
            setUserID(user._id);
        }
    },[])

  useEffect(() => {
      fetchDiscussionData();
  }, [userID]);


  function deleteQuestionFromList(key)
  {
    const newQues = ques.filter(question => question._id !== key);
    setQues(newQues);
    setToastVisible(true);
          setToastMessage("Question deleted successfully!");
          setToastType("success");
          setTimeout(() => {
            setToastVisible(false)
          }, 4000);
  }

  return (
    <>
  
      {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

      <hr style={{width: '85%', height: '2.5px', backgroundColor: 'white', margin: '0px 0px 2.5vh'}}/>
			
      {ques === null ? <ForumGeneratorSkeleton /> : 
      
      <>
        {filteredQuestions.length!==0 ? 

        filteredQuestions.map((disc, idx) => (
            <Discussion_block
              key={disc._id}
              pfp={m.get(disc._id).profileImg}
              asker_username={m.get(disc._id).username}
              asker_id={m.get(disc._id)._id}
              question={disc.question}
              tags={disc.tags}
              date={disc.askDate}
              _id={disc.asker}
              q_id={disc._id}
              userID={userID}
              up_count={disc.upvotes}
              value={qUps.includes(disc._id)}
              deleteQuestionFromList={deleteQuestionFromList}
            />
        ))

        :
        <div className="discussionNullContent">
          <img src="/images/profileProjects.png" alt="No Data" loading="lazy"></img>
          <div className="nullContentInfo">No Discussions for now :)
          <br></br>Why not start one!?</div>
          
        </div>
        }
      </>
    }
    </>
  );
}

export default ForumGenerator;