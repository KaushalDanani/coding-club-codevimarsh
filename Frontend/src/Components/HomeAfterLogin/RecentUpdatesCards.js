import React from 'react'
import "./RecentTasksCards.css"

function RecentUpdatesCards(props) {

  var color1 = ["rgb(126, 10, 10)","rgb(11, 11, 168)","rgb(1, 93, 1)","rgb(113, 113, 3)","rgb(73, 0, 168)","rgb(201, 80, 0)"];
  var color2 = ["red","rgb(82, 82, 254)","rgb(103, 229, 81)","rgb(169, 169, 2)","rgb(140, 57, 212)","rgb(255, 169, 72)"];
  
  const colorStyles = {
    backgroundImage: ""
  }

  function colorSelect(){
    var n =  Math.floor(Math.random()*6);
    colorStyles.backgroundImage="linear-gradient("+color1[n]+","+color2[n]+")";
  }
  colorSelect();

  return (
    <div className='recentCards' style={colorStyles}>
        <span className='Heading'>{props.heading}</span>
        <span className='subHeading'>{props.subheading}</span>
        <button className='cardButton'>{props.button}</button>
        <img className='cardIcon' src={props.icon} alt="Icon" loading="lazy" />
    </div>
  )
}

export default RecentUpdatesCards