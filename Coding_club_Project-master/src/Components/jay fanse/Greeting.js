import React, {useState} from "react";
import "./Greeting.css";
// import icon from "/public/images/bell.webp";
// import icon2 from "/public/images/AI.png";
import { Link } from "react-router-dom";
import ManageAdmins from "./ManageAdmins";
import useUser from "../../store/userContext";

function Greeting(props){
    
    const [isNotiClick,setNotiClick] = useState(false);
    const {user} = useUser();


    const fname = props.userData && props.userData.fname ? props.userData.fname : "";
    const NotiStyle = {
        width : "90vh",
        height : "45vh"
    }

    const notiIcon = {
        img : "images/AI.png"
    }
    
    function expand(){
        setNotiClick(!isNotiClick);
    }

    
    return (

        <div className="greetmain">
            {/* <pre>
            {JSON.stringify(user, null, 2)}
            </pre> */}
            <h1 className="greet">Hey <Link to={`/profile`}><span className="greetName">{props.fname}</span></Link>,</h1>

            <Link 
            style={props.isAdmin ? {"display":"block"} : {"display":"none"}}
            className="AddAdminBtn" to={`/manageAdmins`}>Manage Admins</Link>

            
            {/* <div className="Notify" id="noti" 
            style= {isNotiClick ?  NotiStyle : null} >
            
                <img className="NotifyImg" src="images/bell.webp" alt=""  onClick={expand}/>
            </div> */}
        </div>
    )
}

export default Greeting;