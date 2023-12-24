import React, { useEffect } from "react";
import Card from './Res_Card.js'
import { useState } from "react";

function ResourceGenerator(userID) {
   
    const [V,setVar] = useState([]);
    useEffect(() => {
        fetch('/resources')
            .then(response => response.json())
            .then(response => {
                console.log("This is Jay's Server");
                console.log(response[0]);
                setVar(response);
            });
    }, []);


    function subjectGenerator(props){
        // {const lg = }
    return (

        <Card
        resimg = {props.logo}
        topic = {props.subject}
        n_count = {props.notes[0]}
        vd_count = {props.videos[0]}
        b_count = {props.books[0]}
        // qp_count = {props.qp_count}
        sub_link = {`rescontent?subject=${props.subject}`}
        />
        )
    }


    console.log("outside");
    console.log(V);
    return (
        <>
             {V.map(subjectGenerator)}
        </>
    );
}

export default ResourceGenerator;
























// // // // import { useEffect } from "react";
//     import cardimg from './res/java.png'

// import Card from './Res_Card.js'
// import React from "react";

// const resArr = [
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "Java"
//     },
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "#"
//     },
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "#"
//     },
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "#"
//     },
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "#"
//     },
//     {
//         resimg: cardimg,
//         topic: "Java",
//         n_count: 10,
//         vd_count: 8,
//         b_count: 5,
//         qp_count: 6,
//         sub_link: "#"
//     }
// ]


// function resouorceGenerator(){
    
//         // useEffect(()=>{
//         //     fetch('/resources').then(response=>response.json()).then(response =>{
            
//         //         console.log("This is Jay's Server");
//         //         console.log(response);
//         //     });
        
//         // },[]);

        



    
//         return (
//             // "This"
//             )
//         }
        
//         export default resouorceGenerator
        











// // // // import docs from './json_files/Res_backend.js'





