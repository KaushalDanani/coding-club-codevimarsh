import React from "react";
import'./Projects.css';



export default function Projects(){

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
        <div className={`projects fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}>
            <div className="image">
                <img src="/images/Project.jpg" alt="Project image"></img>
            </div>
            <div className="discription">
                <p className="dischead">All Previous Projects</p>
                <p className="discnode">
                    Get Knowledge Of All Previous Projects Which Are Made By Senior
                </p>
                <button className="btnproject">See All</button>
            </div>
            
        </div>
    );
}