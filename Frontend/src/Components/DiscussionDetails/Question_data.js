import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Question from './Question.js';
import Comment from './Comment.js'
import Navbar_after_login from '../NavbarAfterLogin/Navbar_after_login.js';
import useUser from '../../store/userContext.js';
import ToastComponent from '../Toast/toastComponent.js';
import QuestionSkeleton from './QuestionSkeleton.js';
import CommentSkeleton from './CommentSkeleton.js';
import Myfooter from '../Footer/Myfooter.js';

export default function Question_data() {
    const { user, setUser } = useUser();
    
    const location = useLocation();
    const [isQuestionDataFetch, setIsQuestionDataFetch] = useState(true);
    const [userID, setUserID] = useState();
    const [imgData,setImgData] = useState("");

    useEffect(()=>{
        if(user) {
            setImgData(user.profileImg);
            setUserID(user._id);
        }
    },[user])

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState();
    const searchParams = new URLSearchParams(location.search);
    const q_id = searchParams.get('q_id');

    const [Q_data, setQData] = useState([]);
    const [Asker, setAsker] = useState([]);
    const [Q_upvote, setQUp] = useState(false);
    const [R_data, setRData] = useState([]);
    const [rMap, setrMap] = useState(new Map());
    const [userUps, setuserUps] = useState([]);

    useEffect(() => {
        setIsQuestionDataFetch(true);
        if(userID!=undefined)
        {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/discussion/question?userID=${userID}&q_id=${q_id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setQData(data[0]);
                    setAsker(data[1]);
                    setQUp(data[2]);
                    setRData(data[3]);
                    const m1 = new Map(data[4]);
                    setrMap(m1);
                    setuserUps(data[5]);

                    setIsQuestionDataFetch(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
        }
    }, [userID, q_id]);



    function questionHead() {
        
        return (
            <Question
                _id={Q_data._id}
                userID={userID}
                pfp={Asker.profileImg}
                asker_username={Asker.username}
                asker_id={Asker._id}
                question={Q_data.question}
                description={Q_data.description}
                code={Q_data.code}
                up_count={Q_data.upvotes}
                date={Q_data.askDate}
                value={Q_upvote} 
            />
        )
    }

    function deleteReplyFromList(rid) {
        const newRData = R_data.filter(reply => reply._id !== rid);
        setRData(newRData);

        setToastVisible(true);
        setToastMessage("Reply deleted successfully!");
        setToastType("success");
        setTimeout(() => {
            setToastVisible(false)
            
        }, 4000);
    }

    function commentGenerator(comment) {
        
        return (
            <Comment
                key={comment._id}
                _id={comment._id}
                userID={userID}
                pfp={rMap.get(comment._id).profileImg}
                commenter={rMap.get(comment._id).username}
                commenter_id={rMap.get(comment._id)._id}
                comment={comment.description}
                code={comment.code}
                up_count={comment.upvotes}
                date={comment.replyDate}
                value={userUps.includes(comment._id)}
                admin={user.isAdmin}
                deleteReplyFromList={deleteReplyFromList}
            />
        )
    }

    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Navbar_after_login imgData={`data:image/png;base64,${imgData}`}/>
            {isQuestionDataFetch ? <QuestionSkeleton /> : questionHead()}
            {isQuestionDataFetch ? <CommentSkeleton /> : <>{R_data.map(commentGenerator)}</> }

            <Myfooter />
        </>
    )

}










