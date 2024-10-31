import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import './Myfooter.css';
import useUser from "../../store/userContext";

export default function Myfooter() {
    const { user, setUser } = useUser();
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        if(user)
            setUserID(user._id);
    }, [])
    
    const date = new Date();

    return (
        <>
        <footer>
            <div className="box PT">
                <h2>Our Content</h2>

                {userID !== null ? (
                    <ul>
                        <li><RouterLink to={`/contest`}>Upcoming Coding Contests</RouterLink></li>
                        <li><RouterLink to={`/resources`}>Resources</RouterLink></li>
                        <li><RouterLink to={`/discussion`}>Discussion</RouterLink></li>
                        <li><RouterLink to={`/projectcollaboration`}>Project Collaboration</RouterLink></li>
                        <li><RouterLink to={`/project`}>Projects</RouterLink></li>
                    </ul>
                ) : (
                    <ul>
                        <li> <ScrollLink to="resourcesSource" spy={true} smooth={true} offset={-170} href="#"> Upcoming Coding Contests </ScrollLink> </li>
                        <li> <ScrollLink to="resourcesSource" spy={true} smooth={true} offset={-170} href="#"> Resources </ScrollLink> </li>
                        <li> <ScrollLink to="discussionSource" spy={true} smooth={true} offset={-170} href="#"> Discussion </ScrollLink> </li>
                        <li> <ScrollLink to="projectCollabSources" spy={true} smooth={true} offset={-170} href="#"> Project Collaboration </ScrollLink> </li>
                        <li> <ScrollLink to="projectSources" spy={true} smooth={true} offset={-170} href="#"> Projects </ScrollLink> </li>
                    </ul>
                )}
            </div>
            <div className="box LR">
                <h2>Learning Resources</h2>

                <ul>
                    <li><a target="_blank" href="https://www.geeksforgeeks.org/">Geeks for Geeks</a></li>
                    <li><a target="_blank" href="https://ide.geeksforgeeks.org/">Online IDE</a></li>
                    <li><a target="_blank" href="https://www.w3schools.com/ ">W3C School</a></li>
                    <li><a target="_blank" href="https://leetcode.com/">LeetCode</a></li>
                    <li><a target="_blank" href="https://codeforces.com/">CodeForces</a></li>
                </ul>
            </div>
            <div className="box More">
                <h2>More</h2>

                <ul>
                    <li> <ScrollLink to="AboutUS" smooth={true} offset={-90} href="#"> About Us </ScrollLink> </li>
                    <li><a href="https://mail.google.com/mail/?view=cm&to=codingclub-cse@msubaroda.ac.in" target="_blank" >Contact Us</a></li>
                </ul>
            </div>
            <div className="box UL">
                <h2>Usage Policy</h2>

                <ul>
                    <li><a href="#terms_&_policy">Terms & Privacy policy</a></li>
                </ul>
            </div>
        </footer>
        <div className="copyright" id="terms_&_policy">
            <p>Copyright © {date.getFullYear()} CodeMinions-Coding Club Website. All Rights Reserved</p>
        </div>
        </>
    );

}