import React from "react";
import '../CSS/ProjCollab.css';
import { Link } from "react-router-dom";

export default function ProjCollab(){

  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
  
    if (domRef.current) {
      observer.observe(domRef.current);
    }
  
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

    return(
        <div className={`projcollab fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef} id="projectCollabSources">
            <div className="image">
                <img src="/images/ProjCollab.jpg" alt="Project Collaboration" loading="lazy" ></img>
            </div>
            <div className="PCdiscription">
                <p className="PCdischead">Current Running Projects</p>
                <p className="PCdiscnode">
                    Take a Part And Collaborate in Current Running Projects 
                </p>
                <Link to={"signin"}> <button className="btnprojcollab">Collaborate</button> </Link>
            </div>
            
        </div>
    );

}