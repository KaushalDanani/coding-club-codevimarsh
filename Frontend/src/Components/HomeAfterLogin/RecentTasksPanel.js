import React, { useEffect, useState } from 'react'
import RecentTasksCards from './RecentTasksCards.js'
import "./RecentTasksPanel.css"

function RecentTasksPanel(props) {

  const [contests,setContests] = useState([]);
  
  useEffect( () => {
    if(props.contests != null)
      setContests(props.contests)
  },[props.contests])

  function addCards(cardItem){

    var dt = new Date(cardItem.startDate);
    const hr = dt.getDate();
    const min = dt.getMonth()+1;
    const sec = dt.getFullYear();
    return (
      <RecentTasksCards 
        contests={{
          type:cardItem.type,
          name:cardItem.name,
          startdate:`${new Date(cardItem.startDate).getDate().toString().padStart(2,'0')}-${(new Date(cardItem.startDate).getMonth() + 1).toString().padStart(2,'0')}-${new Date(cardItem.startDate).getFullYear().toString().padStart(2,'0')}`,
          enddate:`${new Date(cardItem.endDate).getDate().toString().padStart(2,'0')}-${(new Date(cardItem.endDate).getMonth() + 1).toString().padStart(2,'0')}-${new Date(cardItem.endDate).getFullYear().toString().padStart(2,'0')}`,
          time:`${new Date(cardItem.startDate).getHours().toString().padStart(2,'0')}:${new Date(cardItem.startDate).getMinutes().toString().padStart(2,'0')} 
          to
          ${new Date(cardItem.endDate).getHours().toString().padStart(2,'0')}:${new Date(cardItem.endDate).getMinutes().toString().padStart(2,'0')}`,
          link:cardItem.contestLink
        }}
        // icon = {cardItem.icon}
      />
    )
  }

  return (
    <div className='recentPanel'>
      {
        contests.length!=0 ? contests.map(addCards) : null
      }
          
    </div>
  )
}

export default RecentTasksPanel