import React from "react";
import './Myfooter.css';
import {Link} from "react-scroll";

export default function Myfooter() {

    const date = new Date();

    return (
        <>
        <footer>
            <div className="box PT">
                <h2>Our Content</h2>

                <ul>
                    <li> <Link to="resourcesSource" spy={true} smooth={true} offset={-185}> Upcoming Coding Contests </Link> </li>
                    <li> <Link to="resourcesSource" spy={true} smooth={true} offset={-185}> Resources </Link> </li>
                    <li> <Link to="newsSource" spy={true} smooth={true} offset={-185}> Articles/News </Link> </li>
                    <li> <Link to="discussionSource" spy={true} smooth={true} offset={-185}> Discussion </Link> </li>
                    <li> <Link to="projectCollabSources" spy={true} smooth={true} offset={-105}> Project Collaboration </Link> </li>
                    <li> <Link to="projectSources" spy={true} smooth={true} offset={-185}> Projects </Link> </li>
                </ul>
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
                    <li> <Link to="AboutUS" smooth={true} offset={-250}> About Us </Link> </li>
                    <li><a href="https://mail.google.com/mail/?view=cm&to=sohamzadafiya@gmail.com" target="_blank" >Contact Us</a></li>
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