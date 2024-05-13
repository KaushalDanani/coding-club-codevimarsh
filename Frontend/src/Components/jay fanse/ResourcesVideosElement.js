import React from "react";
import "./ResourcesVideosElement.css";

function ResourcesVideosElement(props) {
  return (
    <a className="ResourcesVideosAnchor" href={props.thumbnail}>
      <div className="ResourcesVideosElement">
        <div className="ResourcesVideosThumbnail">
          <iframe src={props.link} title="YouTube video player"
            height="200vh" width="360vh"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div className="ResourcesVideosInfo">
        <button id="resElemDelt" className="off" onClick={()=>{ props.deleteVideo(props.id)}} />
          <div className="ResourcesVideoTitle">{props.title}</div>
          <div className="ResourcesVideoChannel">{props.channel}</div>
          <div className="ResourcesVideoSource">source : {props.source}</div>
        </div>
      </div>
    </a>
  );
}

export default ResourcesVideosElement;
