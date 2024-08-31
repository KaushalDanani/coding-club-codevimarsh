import React from 'react'
import "./ResourcesVideosDisplay.css"
import ResourcesVideosElement from './ResourcesVideosElement.js'

function ResourcesVideosDisplay(props) {

  const videoLen = props.videos.length;
  const bgStyle = {
      backgroundImage : "none",
      height : "fit-content"
  }

    function addVideo(videoElement){
        return <ResourcesVideosElement 
        link = {videoElement.link}
        title = {videoElement.title}
        channel = {videoElement.channel}
        source = {videoElement.source}
        id = {videoElement.title+videoElement.channel}
        deleteVideo = {props.deleteVideo}
        />
    }

  return (
      <div className='ResourcesVideosDisplay' style={videoLen!=0 ? bgStyle : null}>
        {props.videos ? props.videos.map(addVideo) : null}
        
    </div>
  )
}

export default React.memo(ResourcesVideosDisplay);