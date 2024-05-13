import React, { useEffect } from "react";
import Card from './Res_Card.js'
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";

function Res_data(props) {
   
    const [V,setVar] = useState(props.source);

    function deleteTopic(id){
        const conf = window.confirm("Are you sure you want to remove this topic??");
        if(conf){
            const updatedTopics = V.filter(topic => topic._id !== id);
            setVar(updatedTopics);
            
            fetch(`/resources/delTopic/${id}`,{
                method: 'DELETE',
                headers:{
                    'Content-type' : 'application/json'
                }
            })
            .then(response=>response.json())
            .then((data)=>{
                alert("Topic Deleted....!!");
            })
            .catch(err => {
                console.error("Error deleting the topic..!");
            })
        }
    }

    function subjectGenerator(props){
    return (

        <Card
            resimg = {props.logo}
            topic = {props.subject}
            n_count = {props.notes[0]}
            vd_count = {props.videos[0]}
            b_count = {props.books[0]}
            // qp_count = {props.qp_count}
            id = {props._id}
            deleteOption = {deleteTopic}
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
