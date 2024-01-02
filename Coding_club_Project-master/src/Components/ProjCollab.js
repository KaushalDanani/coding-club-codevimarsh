import React from "react";
import './ProjCollab.css';


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
        ref={domRef}>
            <div className="image">
                <img src="/images/ProjCollab.jpg" alt="Project Collabration image"></img>
            </div>
            <div className="PCdiscription">
                <p className="PCdischead">Current Running Projects</p>
                <p className="PCdiscnode">
                    Take a Part And Collaborate in Current Running Projects 
                </p>
                <button className="btnprojcollab">Collaborate</button>
            </div>
            
        </div>
    );

}