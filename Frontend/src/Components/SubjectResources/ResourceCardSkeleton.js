import React from "react";
import Skeleton from "react-loading-skeleton";

function ResourceCardSkeleton() {
  return Array(4).fill(0).map((resourceCard, index) => (
      <div className="card" style={{ display: "flex" }}>
        <div id="wholeResourceCard" className="card-body">
          <div style={{position: "absolute", top: "26.5%", left: "-16%", border: "1px solid white"}}>
            <Skeleton width={80} height={80} />
          </div>
          <div id="imgcont">
            <span id="topic">
              <Skeleton width={120} />
            </span>
            <div id="details">
              <div className="cardDesc">
                <Skeleton width={90} />
                <Skeleton width={90} />
                <Skeleton width={90} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
}

export default ResourceCardSkeleton;
