import React from "react";
import "./Greeting.css";
import { Link } from "react-router-dom";
import useUser from "../../store/userContext.js";

function Greeting(props){
    
    return (

        <div className="greetmain">
            <Link to={`/profile`}><h1 className="greet">Hey <span className="greetName">{props.fname}</span>,</h1></Link>

            <Link 
            style={props.isAdmin ? {"display":"block"} : {"display":"none"}}
            className="AddAdminBtn" to={`/manageAdmins`}>Manage Admins</Link>

        </div>
    )
}

export default React.memo(Greeting);