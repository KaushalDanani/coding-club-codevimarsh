import React from "react";
import './Myfooter.css';
import { Link } from "react-router-dom";

export default function MyfooterAfterLogin() {

    const date = new Date();

    return (
        <>
        <footer>
            <div className="box PT">
                <h2>Our Content</h2>

                <ul>
                    <li><Link to={`/contest`}>Upcoming Coding Contests</Link></li>
                    <li><Link to={`/resources`}>Resources</Link></li>
                    <li><Link to={`/article&news`}>Articles/News</Link></li>
                    <li><Link to={`/discussion`}>Discussion</Link></li>
                    <li><Link to={`/project_collab`}>Project Collab</Link></li>
                    <li><Link to={`/project`}>Projects</Link></li>
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
                    <li><a href="#AboutUS">About Us</a></li>
                    <li><a href="https://mail.google.com/mail/?view=cm&to=sohamzadafiya@gmail.com" target="_blank" >Contact Us</a></li>
                </ul>
            </div>
            <div className="box UL">
                <h2>Usage Policy</h2>

                <ul>
                    <li><a href="#">Privacy policy</a></li>
                    <li><a href="#">Terms</a></li>
                </ul>
            </div>
        </footer>
        <div className="copyright">
            <p>Copyright © {date.getFullYear()} CodeMinions-Coding Club Website. All Rights Reserved</p>
        </div>
        </>
    );

}