import React, { useEffect, useRef } from "react";
import VanillaTilt from 'vanilla-tilt';
import '../CSS/Foundercard.css';

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);
  
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
  
    return <div ref={tilt} {...rest} />;
  }

export default function Foundercard(props){

    return(
        <>
            <div className="cardContainer">
            <Tilt options={{speed: 200, "glare": true, "max-glare": 0.2, max: 22}} className="cardView">
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
            </Tilt>
            </div>
            
            <script type="text/javascript" src="vanilla-tilt.js"></script>
        </>
    );
}