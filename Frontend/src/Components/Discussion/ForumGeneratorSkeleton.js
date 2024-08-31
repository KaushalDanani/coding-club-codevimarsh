import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ForumGeneratorSkeleton() {
  return Array(4).fill(0).map((skeleton, idx) => (
    <div className='discussion_c_card' key={idx}>
        <div className='avtarDisc'>
            <Skeleton circle width={60} height={60} />
        </div>
        <div className='innercontentDisc'>
          <div className='asker'>
            <div id='asker_id'>
                <Skeleton width={200} />
            </div>
          </div>
            <div id='ques'>
              <Skeleton />
              <Skeleton />
            </div>
            <div id="ques_tags">
              <div className="all_que_tag">
                <Skeleton width={70} style={{marginRight: "1rem"}} />
                <Skeleton width={70} />
              </div>
              <div id='q_date'>
                <Skeleton width={150} />
              </div>
            </div>
        </div>
      </div>
  ))
}

export default ForumGeneratorSkeleton