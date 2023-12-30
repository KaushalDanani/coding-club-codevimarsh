import React from "react";
import './Discussion.css';
import { Link } from "react-router-dom";

export default function Discussion(){

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
        <div className={`discussion fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef} id="discussionSource">
            <div className="image">
                <img src="/images/Discussion.jpg" alt="Discussion image"></img>
            </div>
            <div className="Ddiscription">
                <p className="Ddischead">Discussion</p>
                <p className="Ddiscnode">
                    Take a Part In Discussion, Ask Your Question, And Give The Answer Of Othres Question. 
                </p>
                <Link to={"signin"}> <button className="btndiscussion">Discuss</button> </Link>
            </div>
            
        </div>
    );

}