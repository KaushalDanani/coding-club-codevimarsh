import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ProjectCollaborationCardSkeleton() {
  return Array(4).fill(0).map((projectCollaborationCard, index) => (
    <div className="project_c_card" key={index}>
        <div className="avtar">
          <Skeleton circle width={65} height={65} />
        </div>
        <div className="innercontent">
          <div className="project_coll_header">
            <div>
              <Skeleton width={180} />
            </div>
            <div>
                <div>
                    <Skeleton width={23} height={28} />
                </div>
            </div>
          </div>

          <div className="project_coll_Title">
            <Skeleton width={150}/>
            <span>
              <Skeleton width={250} />
            </span>
          </div>

          <div style={{display: 'flex', marginLeft: '2vw', marginTop: '2vh'}}>
            <strong> <Skeleton width={120} /> </strong>
            <div style={{ display: 'flex', marginLeft: '1vw'}}>
                <Skeleton width={100} height={23} style={{marginRight: '1rem', borderRadius: '1rem'}}/>
                <Skeleton width={100} height={23} style={{marginRight: '1rem', borderRadius: '1rem'}}/>
                <Skeleton width={100} height={23} style={{borderRadius: '1rem'}} />
            </div>
          </div>
          <div style={{float: 'right', marginRight: '1.3vw'}}>
            <Skeleton width={140} height={23} />   
          </div>
        </div>
    </div>
  ))
}

export default ProjectCollaborationCardSkeleton