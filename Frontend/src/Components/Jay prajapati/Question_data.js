import Question from './Question.js'
// import pfp from './res/pfp.png'
import Comment from './Comment.js'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar_after_login from '../kaushal/Navbar_after_login.js';
import useUser from '../../store/userContext.js';
// import { ObjectId } from 'mongoose'
import ToastComponent from '../jay fanse/toastComponent.js';

export default function Question_data(props) {

    const location = useLocation();
    // const [user, setUser] = useState();
    // const [userID, setUserID] = useState();

    const {user,setUser} = useUser();
    const userID = user ? user._id : null;

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    // useEffect(() => {
    //     if (props.user != null) {
    //         setUser(props.user);
    //         setUserID(props.user._id);
    //     }
    // }, [props.user])


    const searchParams = new URLSearchParams(location.search);
    const q_id = searchParams.get('q_id');

    const [Q_data, setQData] = useState([]);
    const [Asker, setAsker] = useState([]);
    const [Q_upvote, setQUp] = useState(false);
    const [R_data, setRData] = useState([]);
    const [rMap, setrMap] = useState(new Map());
    const [upMap, setupMap] = useState(new Map());

    const [userData, setUserData] = useState();

    useEffect(() => {
        if(userID!=null)
        {

        fetch(`/discussion/question?userID=${userID}&q_id=${q_id}`)
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

                const rArr = data[4];
                const m1 = new Map(data[4]);
                const uArr = data[5];
                const m2 = new Map(uArr);

                setrMap(m1);
                setupMap(m2);

                // console.log(Asker);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [userID, q_id]);



    function questionHead() {

        // console.log(user); //This prints true..
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
                date={Q_data.AskDate}
                value={Q_upvote} //this does not effect the component as true.
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
            // window.location.reload();
        }, 4000);
    }

    function commentsGenerator() {
        function commentGenerator(comment) {
            // if (R_data.length > 0 && R_data[0].replier) {
            // console.log(R_data[0]); // This prints and field replier is also there.
            // console.log(R_data[0].replier); // This should work without errors now

            return (
                <Comment
                    _id={comment._id}
                    userID={userID}
                    pfp={rMap.get(comment._id).profileImg}
                    commenter={rMap.get(comment._id).username}
                    commenter_id={rMap.get(comment._id)._id}
                    comment={comment.description}
                    code={comment.code}
                    up_count={comment.upvotes}
                    date={comment.replyDate}
                    value={upMap.get(comment._id)}
                    admin={user.isAdmin}
                    deleteReplyFromList={deleteReplyFromList}
                />
            )

        }

        return (
            R_data.map(commentGenerator)
        )
    }

    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Navbar_after_login />
            {console.log(R_data)}
            {questionHead()}
            {commentsGenerator()}

        </>
    )

}









