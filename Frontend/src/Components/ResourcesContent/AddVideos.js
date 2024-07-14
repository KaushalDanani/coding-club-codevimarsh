import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../SubjectResources/AddObjectForm.css';
import ToastComponent from "../Toast/toastComponent.js";

export default function AddVideos() {

    const navigate = useNavigate();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sub_id = searchParams.get('sub_id');

    const [subj, setSubj] = useState({});

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

    // async function getVideoName() {
    //     try {
    //         const response = await fetch(`/videoName?sub_id=${sub_id}`, {
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //         });
    //         const data = await response.json();
    //         setSubj(data);
    //         // console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching Video name:', error);
    //     }
    // }

    // function setsub(){
    //     getVideoName();
    //     return subj.Video;
    // }

    function clearVideoData() {
        document.getElementById("vid_title_text").value = "";
        document.getElementById("vid_link_text").value = "";
        document.getElementById("vid_channel_text").value = "";
        document.getElementById("vid_source_text").value = "";
    }

    function addMyVideo(e) {

        e.preventDefault();
        const vname = vidName();
        const vlink = vidLink();
        const vchannel = vidChannel();
        const vsource = vidSource();
        const sub_id = searchParams.get('sub_id');

        fetch("http://localhost:5000/resources/video/add", {
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
            <Link to={'/resources'}>
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className="addObjectContainer">
                <div className="addObjectHeader">
                    <h1>Add Video</h1>
                </div>
                <form className="addObjectBody" onSubmit={addMyVideo}>

                        <div className="addObjectRow">
                            <div>Title</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="vid_title_text" required></input>
                        </div>

                        <div className="addObjectRow">
                            <div>Link</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="vid_link_text" required></input>
                        </div>

                        <div className="addObjectRow">
                            <div>Channel</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="vid_channel_text" required></input>
                        </div>

                        <div className="addObjectRow">
                            <div>Source</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="vid_source_text" required></input>
                        </div>

                        <div className='addObjectBtn'>
                            <button onClick={clearVideoData}> Clear </button>
                            <button type="submit">Add Video</button>
                        </div>

                </form>
            </div>
        </>
    );
}








