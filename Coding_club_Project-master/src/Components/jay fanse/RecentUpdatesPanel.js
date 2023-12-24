import React from 'react'
import RecentUpdatesCards from './RecentUpdatesCards'
import "./RecentTasksPanel.css"
import RecentUpdatesCardsInfo from './RecentUpdatesInfo'

function RecentUpdatesPanel(props) {

  function addCards(cardItem){
    return (
      <RecentUpdatesCards 
        heading={cardItem.heading}
        subheading={cardItem.subheading}
        button={cardItem.button}
        icon={cardItem.icon}
      />
    )
  }

  return (
    <div className='recentPanel'>
        
      {RecentUpdatesCardsInfo.map(addCards)}
    </div>
  )
}

export default RecentUpdatesPanel