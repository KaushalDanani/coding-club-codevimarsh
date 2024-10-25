import { React, useState, useEffect, lazy, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import './PageLinks.css'

//Soham Zadafiya
// const Contest_main = lazy(() => import("./Components/Contest/Contest_main.js"))
import Contest_main from './Components/Contest/Contest_main.js';

//Kaushal Danani
// const Sign_in_page = lazy(() => import("./Components/SignIn/Sign_in_page.js"))
import Sign_in_page from './Components/SignIn/Sign_in_page.js';
// const Sign_up_first_page = lazy(() => import("./Components/SignIn/Sign_up_first_page.js"))
import Sign_up_first_page from './Components/SignIn/Sign_up_first_page.js';
import Sign_up_second_page from './Components/SignIn/Sign_up_second_page.js';
import Project_Collaboration from './Components/ProjectCollaboration/Project_Collaboration.js';
import AddProjectCollaboration from './Components/ProjectCollaboration/AddProjectCollaboration.js';
import NotFoundPage from './Components/PageNotFound/NotFoundPage.js';

// jay fanse
import LoginHomePage from './Components/HomeAfterLogin/LoginHomePage.js';
import ArticlesNewsHomePage from './Components/ArticleAndNews/ArticlesNewsHomePage.js';
import EditUserProfile from './Components/EditUserProfile/EditUserProfile.js';
import ResourcesContent from './Components/ResourcesContent/ResourcesContent.js';
import UserProfile from './Components/UserProfile/UserProfile.js';


// jay prajapati
import ResourcesHome from './Components/SubjectResources/ResourcesHome.js';
import Discussion_Forums from './Components/Discussion/Discussion_Forums.js';
import Question_data from './Components/DiscussionDetails/Question_data.js';
import ProjectMain from './Components/ProjectComponent/ProjectMain.js';



import ManageAdmins from './Components/HomeAfterLogin/ManageAdmins.js';
import Ask_Question from './Components/QuestionAnswer/Ask_Question.js';
import Give_answer from './Components/QuestionAnswer/Give_answer.js';
import AddContest from './Components/Contest/AddContest.js';
import Home_page_before_login from './Components/HomeBeforeLogin/Javascript/Home_page_before_login.js';
import AddSubject from './Components/SubjectResources/AddSubject.js';
import AddBooks from './Components/ResourcesContent/AddBooks.js';
import AddVideos from './Components/ResourcesContent/AddVideos.js';
import AddNotes from './Components/ResourcesContent/AddNotes.js';


import useUser from './store/userContext.js';
import AddProject from './Components/ProjectComponent/AddProject.js';
import { SkeletonTheme } from 'react-loading-skeleton';

const PrivateRoute = ({ children }) => {
    const { user, setUser } = useUser();
    return user ? children : <Navigate to="/" replace />
};

const AdminAccessRoute =({ children }) => {
    const { user, setUser } = useUser();
    return (user && user.isAdmin) ? children : <Navigate to="/" replace />
}

const PageLinks = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useUser();
    const userCradential = async () => {
        try {
            
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/home/dataset`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();
            if(data.message == undefined)
                setUser(data.userData);
                // console.log('-----------------------------USER-------------------------', data);
            else 
                setUser(null);
            
            setIsLoading(false);
            
        }
        catch (err) {
            console.error(err, err.response);
        }
    
    }

    useEffect(() => {
        if(!user)
            setIsLoading(true);
            userCradential()
            
    }, [])


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
            <SkeletonTheme baseColor='#313131' highlightColor='#696969'>
                <Router>
                    <Routes>
                        { user ? 
                            <Route path='/' element={<PrivateRoute> <LoginHomePage /> </PrivateRoute>} />
                        :
                            <Route path='/' element={<Home_page_before_login />} />
                        }
                        <Route path='/signin' element={<Sign_in_page />} />
                        <Route path='/signup/step-1' element={<Sign_up_first_page />} />
                        <Route path='/signup/step-2' element={<Sign_up_second_page />} />
                        <Route path='/manageAdmins' element={<AdminAccessRoute> <ManageAdmins /> </AdminAccessRoute>} />
                        <Route path='/contest' element={<PrivateRoute> <Contest_main /> </PrivateRoute>} />
                        <Route path='/addContest' element={<AdminAccessRoute> <AddContest /> </AdminAccessRoute>} />
                        {/* <Route path='/article&news' element={<ArticlesNewsHomePage />} /> */}
                        <Route path='/resources' element={<PrivateRoute> <ResourcesHome /> </PrivateRoute>} />
                        <Route path='/resources/rescontent' element={<PrivateRoute> <ResourcesContent /> </PrivateRoute>} />
                        <Route path='/resources/rescontent/addBook' element={<AdminAccessRoute> <AddBooks/> </AdminAccessRoute>}  />
                        <Route path='/resources/rescontent/addVideo' element={<AdminAccessRoute> <AddVideos/> </AdminAccessRoute>} />
                        <Route path='/resources/rescontent/addNote' element={<AdminAccessRoute> <AddNotes/> </AdminAccessRoute>} />
                        <Route path='/addSubject' element={<AdminAccessRoute> <AddSubject /> </AdminAccessRoute>} />

                        <Route path='/discussion' element={<PrivateRoute> <Discussion_Forums /> </PrivateRoute>} />
                        <Route path='/discussion/addQuestion' element={<PrivateRoute> <Ask_Question /> </PrivateRoute>} />
                        <Route path='/discussion/question' element={<PrivateRoute> <Question_data /> </PrivateRoute>} />
                        <Route path='/discussion/question/addReply' element={<PrivateRoute> <Give_answer /> </PrivateRoute>} />
                        <Route path='/projectcollaboration' element={<PrivateRoute> <Project_Collaboration /> </PrivateRoute>} />
                        <Route path='/projectcollaboration/addpost' element={<PrivateRoute> <AddProjectCollaboration /> </PrivateRoute>} />
                        <Route path='/project' element={<PrivateRoute> <ProjectMain /> </PrivateRoute>} />
                        <Route path='/project/add_project' element={<PrivateRoute> <AddProject /> </PrivateRoute>} />
                        <Route path='/profile' element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
                        <Route path='/profile/edit' element={<PrivateRoute> <EditUserProfile /> </PrivateRoute>} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </SkeletonTheme>
        </>
    )
}

export default PageLinks