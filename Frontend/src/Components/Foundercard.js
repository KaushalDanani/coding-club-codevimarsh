import React from "react";
import './Foundercard.css';

export default function Foundercard(props){
    return(
        <div className="foundercard">
            <img className="quote" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuWCV_RfPDRAZ9pW9KgAbL2sIJ-QGd-F6hb7HBImELQ&s" alt="quotemark"></img>
            <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non in a dolorem eveniet mollitia unde consequuntur, ad vel fuga impedit quidem, et libero pariatur laborum excepturi ratione. Voluptatum, nemo expedita!
            </p>
            <img className="userimage" src={props.image}></img>
            <p className="username">{props.name}</p>
            <p >MSU CSE</p>
            <p >{props.post}</p>           
        </div>
    );
}