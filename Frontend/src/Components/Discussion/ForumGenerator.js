import Discussion_block from "./Discussion_block.js";
import { useEffect, useState, React } from "react";
// import {Link} from 'react-router-dom'
// import "./Discussion_Forums.css"
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";
import ForumGeneratorSkeleton from "./ForumGeneratorSkeleton.js";

function ForumGenerator() {
  const { user, setUser } = useUser();

  const [ques, setQues] = useState(null);
  const [m, setM] = useState(new Map());
  const [qUps, setQUps] = useState(new Map());

  const [toastVisible,setToastVisible] = useState(false);
  const [toastMessage,setToastMessage] = useState("");
  const [toastType,setToastType] = useState("");
  const [userID, setUserID] = useState(null);

    useEffect(()=>{
        if(user) {
            setUserID(user._id);
        }
    },[])

  const fetchDiscussionData = async () => {
    if(userID != null)
    {  
      try {
        // console.log("Calling......"+ userID)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/discussion?userID=${userID}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        })
          
        // console.log("got it..."+ response)
        const data = await response.json();
        setQues(data.ques);
        const mArray = data.mArray;
        const map = new Map(mArray);
        setM(map);
        const qUpArray = data.qUpArray;
        const qUpMap = new Map(qUpArray);
        setQUps(qUpMap);
        // console.log("😭😭😭😭😭 "+ data);
      }
      catch(err)
      {
        console.error(err, err.response);
      }
    }
  }

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
        {ques.length!==0 ? 

        ques.map((disc, idx) => (            
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
              value={qUps.get(disc._id)}
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