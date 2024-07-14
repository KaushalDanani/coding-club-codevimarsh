import React, { useEffect, useState } from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

export default function Res_Card(props) {

    const navigate = useNavigate();
    let onDelete = false;
    const [isLoadingResourceCardData, setIsLoadingResourceCardData] = useState(false)
    let books = [];
    let notes = [];
    let videos = [];
    const [imgData,setImgData] = useState("");
    useEffect(()=>{
        if(props.imgData !== null)
        setImgData(props.imgData);
    },[props.imgData])
    async function ViewContent() {

        
        try {
            const response = await fetch("http://localhost:5000/resources/rescontent/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }    
            })
            const data = await response.json();
            const filtered = data.filter(subElement => subElement.subject === props.topic);
            navigate(props.sub_link, { state: { resources: filtered , imgData : imgData} })
        }
        catch(err)
        {
            console.error(err, err.response);
        }
        
    }

    return (
        <>
        <div>
            <button id='resdelt' className='off' onClick={ () => { props.deleteOption(props.id) } }></button>
            <div id='resCardForEdit' className={onDelete ? "card resCardOnEditOptionBackground" : "card"}>

                <div id='wholeResourceCard' className={onDelete ? "card-body onDeleteResCard" : "card-body"} onClick={ViewContent}>
                    <img src={`data:Image/jpeg;base64,${props.resimg}`} className='lg' />
                    <div id='imgcont'>
                        <span id='topic'>{props.topic}</span>
                        <div id="details">
                            <div className="cardDesc">Notes : {props.n_count} <br /> Videos : {props.vd_count} <br /> Books : {props.b_count} </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

