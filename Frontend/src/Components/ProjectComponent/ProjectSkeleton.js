import React from "react";
import Skeleton from "react-loading-skeleton";

function ProjectSkeleton() {
  return Array(4).fill(0).map((projectCard, index) => (
    <div className="projectmain" id="index">
      <div className="projdisplay">
        <div className="projdispheader">
          <div>
            <Skeleton circle width={180} height={180} />
          </div>
          <div>
            <div className="projectname">
              <Skeleton width={250} />
            </div>

            <div className="projectdiscription">
                <Skeleton count={2} width={980} />
            </div>
            <div className="projecttech" style={{display: 'flex'}}>
                <Skeleton width={180} height={23} style={{marginRight: '2rem'}} /> 
                <span style={{display: 'flex'}}>
                    <Skeleton width={100} height={23} style={{marginRight: '1rem', borderRadius: '1rem'}}/>
                    <Skeleton width={100} height={23} style={{marginRight: '1rem', borderRadius: '1rem'}}/>
                    <Skeleton width={100} height={23} style={{borderRadius: '1rem'}} />
                </span>
            </div>
          </div>
        </div>
        <div className="projbtn">
            <div style={{display: 'flex', float: 'right'}}>
                <Skeleton width={100} height={25} style={{marginRight: '1.5rem', borderRadius: '1rem'}} />
                <Skeleton width={140} height={25} style={{borderRadius: '1rem'}} />
            </div>
        </div>
      </div>
    </div>
  ))
}

export default ProjectSkeleton;
