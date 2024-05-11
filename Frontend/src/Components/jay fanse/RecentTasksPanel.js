import React, { useEffect, useState } from 'react'
import RecentTasksCards from './RecentTasksCards.js'
import RecentTasksCardsInfo from './RecentTasksInfo.js'
import "./RecentTasksPanel.css"

function RecentTasksPanel(props) {

  const [contests,setContests] = useState([]);
  
  useEffect( () => {
    fetch(`/contest/upcoming`)
    .then(response => response.json())
    .then(data => {
      setContests(data);
    })
  },[])

  function addCards(cardItem){

    var dt = new Date(cardItem.startDate);
    const hr = dt.getDate();
    const min = dt.getMonth()+1;
    const sec = dt.getFullYear();
    return (
      <RecentTasksCards 
      heading = {cardItem.name}
      subheading = {`${hr}-${min}-${sec}`}
      button = "checkout"
      link = {cardItem.contestLink}
      // icon = {cardItem.icon}
      />
    )
  }

  return (
    <div className='recentPanel'>
          {contests.map(addCards)}
    </div>
  )
}

export default RecentTasksPanel