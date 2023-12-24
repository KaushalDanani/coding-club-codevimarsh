import React, { useEffect, useState } from 'react';
import "./ManageAdmins.css";

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
                ></button>
            </div>
            </div>
        )
    }

  return (
    <div className='manageAdminsDiv'>
        <div className='manageAdminsHeader'>Manage Admins</div>
        <div className='manageAdminsBody'>
            <div className='manageAdminsBodyRow'
            style={{'marginBottom':'1.5vh','width':'97.5%'}}>
            <div>Name</div>
            <div>username</div>
            <div></div>
            </div>
            <div className='manageAdminsList'>
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                {adminList.map(listAdmins)}
                
            </div>
        </div>
    </div>
  )
}

export default ManageAdmins;