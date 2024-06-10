import React from 'react'
import "./toastComponent.css"

function toastComponent(props) {
  return (
    <>
    <div className='toastComponent'
    style={
      props.type === "success" ? {"backgroundColor" : "green"} : 
      props.type === "warning" ? {"backgroundColor" : "yellow", "color" : "black"} : null

    }
    >{props.message}</div>
    </>
  )
}

export default toastComponent