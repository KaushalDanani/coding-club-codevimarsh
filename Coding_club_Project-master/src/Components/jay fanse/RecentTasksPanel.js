import React, { useEffect, useState } from 'react'
import RecentTasksCards from './RecentTasksCards'
import "./RecentTasksPanel.css"
import RecentTasksCardsInfo from './RecentTasksInfo'

function RecentTasksPanel(props) {

  const [contests,setContests] = useState([]);
  
  useEffect( () => {
    fetch(`/loginHome/contests/`)
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