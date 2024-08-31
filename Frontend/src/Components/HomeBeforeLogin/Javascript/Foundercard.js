import CreateFounderCard from "./CreateFounderCard";
import '../CSS/Foundercard.css';

export default function Foundercard(){

    const founderinfo = [
        {
            id : 1,
            name : "Soham Zadafiya",
            post : "Founder",
            image : "https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-vector-style_131965-961.jpg?size=626&ext=jpg&ga=GA1.1.1360090374.1689347540&semt=ais"
        },
        {
            id : 2,
            name : "Jay Fanse",
            post : "Founder",
            image : "https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-vector-style_131965-961.jpg?size=626&ext=jpg&ga=GA1.1.1360090374.1689347540&semt=ais"
        },
        {
            id : 3,
            name : "Kaushal Danani",
            post : "Founder",
            image : "https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-vector-style_131965-961.jpg?size=626&ext=jpg&ga=GA1.1.1360090374.1689347540&semt=ais"
        },
        {
            id : 4,
            name : "Jay Prajapati",
            post : "Founder",
            // image : "https://img.freepik.com/premium-photo/blue-software-code-3d-icon-isolated-white-background-with-website-coding-technology-sign-programming-developer-ui-writing-application-symbol-design-java-program-script-html-data-development_79161-2438.jpg?size=626&ext=jpg&ga=GA1.1.1360090374.1689347540&semt=ais"
            image : "https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-vector-style_131965-961.jpg?size=626&ext=jpg&ga=GA1.1.1360090374.1689347540&semt=ais"
        }
    ];

    return(
        <>
            <div className="founderinfo" id="AboutUS">
            <h1 className="foundercardline">The Initiators Of Code-Vimarsh</h1>
            <div className="founderGrid">
                {founderinfo.map(function Founderinfocard(element) {
                    return (
                        <CreateFounderCard
                            key={element.id}
                            name={element.name}
                            post={element.post}
                            image={element.image}
                        ></CreateFounderCard>
                    );
                })}
            </div>
        </div>
      </>
    );
}