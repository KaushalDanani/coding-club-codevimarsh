import React, { useEffect, useLayoutEffect, useState } from 'react';
import "./ManageAdmins.css";
import { Link, useNavigate } from 'react-router-dom';
import ToastComponent from '../Toast/toastComponent';
import useUser from '../../store/userContext';

function ManageAdmins() {
    const navigate = useNavigate();
    const { user, setUser } = useUser(); 
    const [adminList, setAdminList] = useState([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastType, setToastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAdminList(data.admins);
            })
    }, [])

    function listAdmins(admin) {
        return (             
            <div className='manageAdminsBodyRow'>
                <div>{admin.fname} {admin.lname}</div>
                <div>{admin.username}</div>
                <div>
                    <button
                        className='deleteAdminBtn'
                        onClick={() => {
                            deleteAdmin(admin.username)

                            const newAdminList = adminList.filter((adminElement) => adminElement.username !== admin.username);
                            setAdminList(newAdminList);
                        }}
                    ></button>
                </div>
            </div>
        )
    }

    function deleteAdmin(username) {

        if (adminList.length == 1) {
            setToastVisible(true);
            setToastMessage("Maintaining atleast one admin is mandatory!");
            setToastType("warning");
            setTimeout(() => setToastVisible(false), 4000);
        }
        else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/delete/?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    setToastVisible(true);
                    setToastMessage(data.message);
                    setToastType("success");
                    setTimeout(() => setToastVisible(false), 4000);
                });
        }
    }

    function addAdmin() {
        var newAdminUsername = document.getElementById('newAdmin').value.toString();

        // if user is already admin
        var already = adminList.some(obj => obj.username === newAdminUsername);

        if (already) {
            setToastVisible(true);
            setToastMessage("User is already admin!");
            setToastType("warning");
            setTimeout(() => setToastVisible(false), 4000);
        }
        else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/add/?username=${newAdminUsername}`)
                .then(response => response.json())
                .then(data => {

                    if (data.user!==null) {

                        adminList.push(data.user);
                        
                        setToastVisible(true);
                        setToastType("success");
                        setToastMessage(data.message);
                        setTimeout(() => setToastVisible(false), 4000);
                    }
                    else
                    {
                        setToastVisible(true);
                        setToastMessage("Invalid username!");
                        setToastType("warning");
                        setTimeout(() => setToastVisible(false), 4000);
                    }
                });
        }

        document.getElementById('newAdmin').value = "";
    }

    return (
        <>
        {(!user || !user.isAdmin) ? navigate(`/`) : 
            <>
                {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
                <Link to={'/'}>
                    <div className='adminBackBtn'></div>
                </Link>
                <div className='manageAdminsDiv'>
                    <div className='manageAdminsHeader'><h1>Admin List</h1></div>
                    <div className='manageAdminsBody'>
                        <div className='manageAdminsBodyRow'
                            style={{ 'marginBottom': '1.5vh' }}>
                            <div className='manageAdminsBodyRowHeader'>NAME</div>
                            <div className='manageAdminsBodyRowHeader'>USERNAME</div>
                            <div className='manageAdminsBodyRowHeader'></div>
                        </div>
                        <div className='manageAdminsList'>
                            {adminList.map(listAdmins)}

                        </div>

                        <div className='addAdminTitle'>Register New Admin</div>
                        <div className='addAdminBody'>
                            <input type='text' id='newAdmin' placeholder='Enter username...' />
                            <button onClick={addAdmin}>Register Admin</button>
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}

export default ManageAdmins;