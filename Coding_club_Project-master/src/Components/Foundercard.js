import React from "react";
import './Foundercard.css';

export default function Foundercard(props){
    return(
        <>
            <div className="cardContainer">
            <div className="cardView">
                <div className="foundercard">
                    {/* <img className="quote" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuWCV_RfPDRAZ9pW9KgAbL2sIJ-QGd-F6hb7HBImELQ&s" alt="quotemark"></img> */}
                    
                    <div className="founderData">
                        <img className="userimage" src={props.image}></img>
                        <p className="username">{props.name}</p>
                        <p>MSU CSE</p>
                        <p>{props.post}</p>
                        <p> <strong> Batch : 2021 </strong> </p>
                    </div>
                           
                </div>
                <div className="back">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates ullam cum, assumenda alias explicabo quasi obcaecati minus quo autem sequi perspiciatis recusandae inventore illum. Laudantium, dolor omnis commodi nemo odio culpa debitis! Omnis aut corrupti vitae nesciunt voluptatem.
                    </p>
                </div>
            </div>
            </div>
        </>
    );
}