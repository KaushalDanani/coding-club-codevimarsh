import React, { useEffect, useState, useContext } from 'react'
import './Card.css'
import { Link, useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader.js';
import ResourcesContent from '../ResourcesContent/ResourcesContent.js';
import { DataContext } from './DataContext.js';


export default function Res_Card(props) {

    const navigate = useNavigate();
    let onDelete = false;
    const [isLoadingResourceCardData, setIsLoadingResourceCardData] = useState(false)
    let books = [];
    let notes = [];
    let videos = [];

    async function ViewContent() {

        // setIsLoadingResourceCardData(true);
        try {
            const response = await fetch("/resources/rescontent/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }    
            })
            const data = await response.json();
            const filtered = data.filter(subElement => subElement.subject === props.topic);
            // console.log("⚜⚜⚜⚜⚜ "+filtered[0])
            navigate(props.sub_link, { state: { resources: filtered } })
        }
        catch(err)
        {
            console.error(err, err.response);
        }
        // setIsLoadingResourceCardData(false);
    }

    // if (isLoadingResourceCardData)
    // return <>
    //     <div className='loadingPage'>
    //       <HashLoader
    //           color={'#ffffff'}
    //           loading={isLoadingResourceCardData}
    //           // cssOverride={override}
    //           size={70}
    //           aria-label="Loading Spinner"
    //           data-testid="loader"
    //       />
    //       </div>
    //   </>

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

