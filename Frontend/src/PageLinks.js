import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import './PageLinks.css'

//Soham Zadafiya
import Contest_main from './Components/Contest components/Contest_main.js';

//Kaushal Danani
import Sign_in_page from './Components/kaushal/Sign_in_page.js';
import Sign_up_first_page from './Components/kaushal/Sign_up_first_page.js';
import Sign_up_second_page from './Components/kaushal/Sign_up_second_page.js';
import Sign_up_third_page from './Components/kaushal/Sign_up_third_page.js';
import Project_Collabration from './Components/kaushal/Project_Collabration.js';
import Navbar_after_login from './Components/kaushal/Navbar_after_login.js';
import AddProjectCollabration from './Components/kaushal/AddProjectCollabration.js';
import NotFoundPage from './Components/kaushal/NotFoundPage.js';

// jay fanse
import LoginHomePage from './Components/jay fanse/LoginHomePage.js';
import ArticlesNewsHomePage from './Components/jay fanse/ArticlesNewsHomePage.js';
import EditUserProfile from './Components/jay fanse/EditUserProfile.js';
import ResourcesContent from './Components/jay fanse/ResourcesContent.js';
import UserProfile from './Components/jay fanse/UserProfile.js';


// jay prajapati
import ResourcesHome from './Components/Jay prajapati/ResourcesHome.js';
import Discussion_Forums from './Components/Jay prajapati/Discussion_Forums.js';
import Question_data from './Components/Jay prajapati/Question_data.js';
import ProjectMain from './Components/Innercomp/ProjectMain.js';



import ManageAdmins from './Components/jay fanse/ManageAdmins.js';
import Ask_Question from './Components/Question_answer_jp/Ask_Question.js';
import Give_answer from './Components/Question_answer_jp/Give_answer.js';
import AddContest from './Components/Contest components/AddContest.js';
import Home_page_before_login from './Components/HomeBeforeLogin/Javascript/Home_page_before_login.js';
import AddSubject from './Components/Jay prajapati/AddSubject.js';
import AddBooks from './Components/jay fanse/AddBooks.js';
import AddVideos from './Components/jay fanse/AddVideos.js';
import AddNotes from './Components/jay fanse/AddNotes.js';


import useUser from './store/userContext.js';
import AddProject from './Components/Innercomp/AddProject.js';
function PageLinks() {

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useUser();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/home/user/dataset", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const [data] = await response.json();
                setUser(data);
                console.log('-----------------------------USER-------------------------', data);
                setIsLoading(false);
                
            }
            catch (err) {
                console.error(err, err.response);
            }
        })();
    }, [])

    // useEffect(() => {
    //     fetch('/checkUser', {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {

    //             if (data.error === undefined) {
    //                 console.log(data.Token);
    //                 if (data.Token === undefined)
    //                     setCheckAuth(false);
    //                 else
    //                     setCheckAuth(true);
    //             }
    //             else {
    //                 alert(data.error)
    //             }
    //         })
    // }, []);

    if (isLoading)
        return <>
            <div className='loadingPage'>
            <HashLoader
                color={'#ffffff'}
                loading={isLoading}
                // cssOverride={override}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
        </>

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home_page_before_login user={user} />} />
                    <Route path='/signin' element={<Sign_in_page />} />
                    <Route path='/signup/step-1' element={<Sign_up_first_page />} />
                    <Route path='/signup/step-2' element={<Sign_up_second_page />} />
                    <Route path='/signup/step-3' element={<Sign_up_third_page />} />
                    <Route path='/home' element={<LoginHomePage />} />
                    <Route path='/manageAdmins' element={<ManageAdmins />} />
                    <Route path='/contest' element={<Contest_main user={user} />} />
                    <Route path='/addContest' element={<AddContest />} />
                    <Route path='/article&news' element={<ArticlesNewsHomePage />} />
                    <Route path='/resources' element={<ResourcesHome user={user}/>} />
                    <Route path='/resources/rescontent' element={<ResourcesContent user={user} />} />
                    <Route path='/resources/rescontent/addBook' element={<AddBooks/>} />
                    <Route path='/resources/rescontent/addVideo' element={<AddVideos/>} />
                    <Route path='/resources/rescontent/addNote' element={<AddNotes/>} />
                    <Route path='/addSubject' element={<AddSubject/>} />

                    <Route path='/discussion' element={<Discussion_Forums />} />
                    <Route path='/discussion/addQuestion' element={<Ask_Question />} />
                    <Route path='/discussion/question' element={<Question_data />} />
                    <Route path='/discussion/question/addReply' element={<Give_answer />} />
                    <Route path='/project' element={<ProjectMain user={user}/>} />
                    <Route path='/project/add_project' element={<AddProject />} />
                    <Route path='/profile' element={<UserProfile user={user}/>} />
                    <Route path='/profile/edit_profile' element={<EditUserProfile user={user}/>} />
                    <Route path='/project_collab' element={<Project_Collabration />} />
                    <Route path='/project_collab/addpost' element={<AddProjectCollabration />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default PageLinks