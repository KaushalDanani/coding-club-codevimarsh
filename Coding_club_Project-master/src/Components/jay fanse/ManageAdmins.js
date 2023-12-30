import React, { useEffect, useState } from 'react';
import "./ManageAdmins.css";
import { Link } from 'react-router-dom';

function ManageAdmins() {
    const [adminList,setAdminList] = useState([]);

    useEffect(() => {
        fetch('/adminList',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setAdminList(data.admins);
        })
    },[])

    function listAdmins(admin){
        return (
            <div className='manageAdminsBodyRow'>
            <div>{admin.fname} {admin.lname}</div>
            <div>{admin.username}</div>
            <div>
                <button 
                className='deleteAdminBtn' 
                onClick={ () => {
                    deleteAdmin(admin.username)
                }}
                ></button>
            </div>
            </div>
        )
    }

    function deleteAdmin(username){

        if(adminList.length==1)
        {
            alert("Maintaining atleast one admin is mandatory!");
        }
        else{
        fetch(`deleteAdmin/?username=${username}`)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.reload();
        });
        }
    }

    function addAdmin(){
        var newAdminUsername = document.getElementById('newAdmin').value.toString();

        // if user already admin
        var already = adminList.some(obj => obj.username === newAdminUsername);
        
        if(already)
        {
            alert("User is already admin!");
        }
        else
        {
        fetch(`addAdmin/?username=${newAdminUsername}`)
        .then(response => response.json())
        .then(data => {
            if(data.user!=null)
            {
                alert(data.message);
                window.location.reload();
            }
            else
            alert('Invalid username');
        });
        }

        document.getElementById('newAdmin').value="";
    }

  return (
    <>
    <Link to={'/'}>
        <div className='adminBackBtn'></div>
    </Link>
    <div className='manageAdminsDiv'>
        <div className='manageAdminsHeader'>Admin List</div>
        <div className='manageAdminsBody'>
            <div className='manageAdminsBodyRow'
            style={{'marginBottom':'1.5vh'}}>
            <div>Name</div>
            <div>username</div>
            <div></div>
            </div>
            <div className='manageAdminsList'>
                {adminList.map(listAdmins)}
                                
            </div>

            <div className='addAdminTitle'>Register new Admin :</div>
            <div className='addAdminBody'>
                <input type='text' id='newAdmin' placeholder='Enter username...'/>
                <button onClick={addAdmin}>Register Admin</button>
            </div> 
        </div>
    </div>
    </>
  )
}

export default ManageAdmins;