import Projects from "./Projects.js"
import Filter_bar from "./Filter_bar.js"
import { Link } from "react-router-dom"
import Navbar_after_login from "../kaushal/Navbar_after_login.js"
import { useLocation } from "react-router-dom"

const Details = [
    {
        id : 1,
        title: "Project 1",
        tags:["Java","Database","DSA"],
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste facilis doloremque similique minima, animi ut vel, eaque earum nemo ipsum sapiente dignissimos quos consectetur voluptatem!"

    },
    {
        id : 2,
        title:"Project 2",
        tags:["Java","Database","DSA"],
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste facilis doloremque similique minima, animi ut vel, eaque earum nemo ipsum sapiente dignissimos quos consectetur voluptatem!"
    },
    {
        id : 3,
        title:"Project 3",
        tags:["Java","Database","DSA"],
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste facilis doloremque similique minima, animi ut vel, eaque earum nemo ipsum sapiente dignissimos quos consectetur voluptatem!"
    },
    
]

function cardGenerator(){
    function getProject(proj){
        return(
            <Projects 
                title = {proj.title}
                tags = {proj.tags}
                details = {proj.details}
            />
        )
    }

    return(
        Details.map(getProject)
    )
}

export default function ProjectMain(){
    const location = useLocation();

const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get('userID');
    return(
        <>  
            <Navbar_after_login userID={userID}/>
            <Filter_bar/>
            {cardGenerator()}
        </>
    );
}
