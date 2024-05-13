import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './AddVideos.css';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import ToastComponent from "./toastComponent.js";

export default function AddBooks() {

    const navigate = useNavigate();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sub_id = searchParams.get('sub_id');

    const [subj, setSubj] = useState({});


    const [logo, setLogo] = useState("");

    function vidName() {
        const name = document.getElementById("vid_title_text").value;
        return name;
    }

    function vidLink() {
        const link = document.getElementById("vid_link_text").value;
        return link;
    }

    function vidChannel() {
        const authorName = document.getElementById("vid_channel_text").value;
        return authorName;
    }

    function vidSource() {
        const edition = document.getElementById("vid_source_text").value;
        return edition;
    }



    // async function logoMaker(e) {
    //     const image = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = function (event) {
    //         let base64String = event.target.result;

    //         base64String = base64String.replace(/^data:image\/\w+;base64,/, '');

    //         setLogo(base64String);
    //     };
    //     reader.readAsDataURL(image);
    // }


    // useEffect(() => {
    //     getVideoName();
    // }, []); // Empty dependency array ensures the effect runs once when the component mounts

    async function getVideoName() {
        try {
            const response = await fetch(`/videoName?sub_id=${sub_id}`, {
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const data = await response.json();
            setSubj(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Video name:', error);
        }
    }

    // function setsub(){
    //     getVideoName();
    //     return subj.Video;
    // }

    function addMyBook(name) {

        const vname = vidName();
        const vlink = vidLink();
        const vchannel = vidChannel();
        const vsource = vidSource();
        const sub_id = searchParams.get('sub_id');

        fetch("/addmyvideo", {
            method: 'POST',
            body: JSON.stringify({
                "video": vname,
                "sub_id": sub_id,
                "link": vlink,
                "channel": vchannel,
                "source": vsource,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setToastVisible(true);
                setToastMessage(data.message);
                setToastType("success");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate('/resources');
                }, 1000);
            });
    }
    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Navbar_after_login />
            <div className="addVideoContainer">
                <div className="addVideoHeader">
                    <h1><p className="Video">Add Video</p></h1>
                </div>
                <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
                <div className="formDiv">
                    <form className="" id="Video_main">

                        <div className="q_tital">
                            <label htmlFor="tital_text">Title :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="vid_title_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Link :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="vid_link_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Channel :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="vid_channel_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Source :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="vid_source_text"></input>
                        </div>

                        {/* <div className="q_code">
                            <label htmlFor="code_text">Thumbnail :</label>
                            <p></p>
                            <input type="file" name="code_text" id="img_text" onChange={(e) => { logoMaker(e) }} cols="" rows="2"></input>
                        </div> */}


                        <div className='buttonSection'>
                            <Link to={'/resources'}> <button className='addFormButton'> Cancel </button> </Link>

                            <Link><button onClick={addMyBook} className="addFormButton">Submit</button></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}








