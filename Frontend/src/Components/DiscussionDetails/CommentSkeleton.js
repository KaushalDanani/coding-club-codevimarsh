import React from "react";
import Skeleton from "react-loading-skeleton";

function CommentSkeleton() {
  return (
    <div className="discussion_c_card">
      <div className="avtarDisc">
        <Skeleton circle width={60} height={60} />
      </div>
      <div className="innercontentDisc">
        <div className="asker">
          <div id="commenter_id">
            <Skeleton width={220} />
          </div>
          <div style={{position: 'absolute', right: '20px', top: '15px'}}>
            <Skeleton width={30} height={30} />
          </div>
        </div>

        <div id="com_div">
          <Skeleton count={2} />
        </div>

        <div className="snippet">
          <Skeleton count={2} />
        </div>

        <div id="feed_bar">
          <div id="upvote_div">
            <Skeleton width={50} />
          </div>
          <div id="date_div">
            <Skeleton width={170} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSkeleton;
