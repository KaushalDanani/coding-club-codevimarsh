import React, { useEffect } from "react";
import Card from './Res_Card.js'
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";

function Res_data(props) {
   
    const [V,setVar] = useState(props.source);

    function subjectGenerator(props){
    return (

        <Card
            resimg = {props.logo}
            topic = {props.subject}
            n_count = {props.notes[0]}
            vd_count = {props.videos[0]}
            b_count = {props.books[0]}
            // qp_count = {props.qp_count}
            sub_link = {`rescontent?subject=${props.subject}`} />
        )
    }

    // console.log("outside");
    // console.log(V);
    return (
        <>
            {V.map(subjectGenerator)}
        </>
    );
}

export default Res_data;
