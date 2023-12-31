import {React,useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Soham Zadafiya
import Contest_main from './Components/Contest components/Contest_main.js';

//Kaushal Danani
import Sign_in_page from './Components/kaushal/Sign_in_page';
import Sign_up_first_page from './Components/kaushal/Sign_up_first_page';
import Sign_up_second_page from './Components/kaushal/Sign_up_second_page';
import Sign_up_third_page from './Components/kaushal/Sign_up_third_page';
import Project_Collabration from './Components/kaushal/Project_Collabration';
import Navbar_after_login from './Components/kaushal/Navbar_after_login';
import AddProjectCollabration from './Components/kaushal/AddProjectCollabration';
import NotFoundPage from './Components/kaushal/NotFoundPage'

// jay fanse
import LoginHomePage from './Components/jay fanse/LoginHomePage';
import ArticlesNewsHomePage from './Components/jay fanse/ArticlesNewsHomePage';
import EditUserProfile from './Components/jay fanse/EditUserProfile';
import ResourcesContent from './Components/jay fanse/ResourcesContent';
import UserProfile from './Components/jay fanse/UserProfile';
import ManageAdmins from './Components/jay fanse/ManageAdmins.js';

// jay prajapati
import ResourcesHome from './Components/Jay prajapati/ResourcesHome';
import Discussion_Forums from './Components/Jay prajapati/Discussion_Forums';
import Question_data from './Components/Jay prajapati/Question_data';
import ProjectMain from './Components/Jay prajapati/ProjectMain';
import Ask_Question from './Components/Question_answer_jp/Ask_Question.js';
import Give_answer from './Components/Question_answer_jp/Give_answer.js';
import AddContest from './Components/Contest components/AddContest.js';
import Home_page_before_login from './Components/HomeBeforeLogin/Javascript/Home_page_before_login.js';
function PageLinks() {

    const [checkAuth, setCheckAuth] = useState(false);

    useEffect(() => {
        fetch('/checkUser', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.error === undefined) {
                    console.log(data.Token);
                    if (data.Token === undefined)
                        setCheckAuth(false);
                    else
                        setCheckAuth(true);
                }
                else {
                    alert(data.error)
                }
            })
    }, []);


    return (
        <div>
            <Router>
                <Routes>
                    {checkAuth ? (
                        <Route path='/' element={<LoginHomePage />} />
                    ) : (
                        <Route path='/' element={<Home_page_before_login />} />
                    )}


                    {/* <Route path='/' element={<HomeBeforeLogin />} /> */}
                    <Route path='/home' element={<LoginHomePage />} />
                    <Route path='/signin' element={<Sign_in_page />} />
                    <Route path='/signup/step-1' element={<Sign_up_first_page />} />
                    <Route path='/signup/step-2' element={<Sign_up_second_page />} />
                    <Route path='/signup/step-3' element={<Sign_up_third_page />} />
                    <Route path='/manageAdmins' element={<ManageAdmins />} />
                    <Route path='/contest' element={<Contest_main />} />
                    <Route path='/addContest' element={<AddContest />} />
                    <Route path='/article&news' element={<ArticlesNewsHomePage />} />
                    <Route path='/resources' element={<ResourcesHome />} />
                    <Route path='/resources/rescontent' element={<ResourcesContent />} />
                    <Route path='/discussion' element={<Discussion_Forums />} />
                    <Route path='/discussion/addQuestion' element={<Ask_Question />} />
                    <Route path='/discussion/question' element={<Question_data />} />
                    <Route path='/discussion/question/addReply' element={<Give_answer />} />
                    <Route path='/project' element={<ProjectMain />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/profile/edit_profile' element={<EditUserProfile />} />
                    <Route path='/project_collab' element={<Project_Collabration />} />
                    <Route path='/project_collab/addpost' element={<AddProjectCollabration />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default PageLinks