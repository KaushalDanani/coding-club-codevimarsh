import React from 'react'
import Skeleton from 'react-loading-skeleton'

function QuestionSkeleton() {
  return (
    <>
    <div className="discussion_c_card question-card">
        <div className="avtarDisc">
          <Skeleton circle width={65} height={65} />
        </div>
        <div className="innercontentDisc">
          <div className="asker">
            <div id="asker_id">
              <Skeleton width={220} />
            </div>
          </div>
          <h2 id="Que_statement">
            <Skeleton count={2} />
          </h2>
          <div id="des_div">
            <Skeleton count={2} />
          </div>
          <div className="snippet">
            <Skeleton count={4} />
          </div>
          <div id="feed_bar" className="d-flex" style={{marginTop: '1rem'}}>
            <div id="upvote_div">
              <Skeleton width={52} />
            </div>
            <div id="comment_div">
              <Skeleton width={120} />
            </div>
            <div id="date_div">
                <Skeleton width={170} style={{borderRadius: '1rem'}} />
            </div>
          </div>
        </div>
      </div>

      <div id="reply_head">Replies:</div>
    </>
  )
}

export default QuestionSkeleton