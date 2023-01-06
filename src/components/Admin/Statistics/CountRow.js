import React, { useEffect, useState } from 'react';

import "../../../App.css";
import UserService from "../../../services/user.service";

const CountRow = () => {

    const [users, setUsers] = useState([]);
    // const [groups, setGroups] = useState([]);
    const [locations, setLocations] = useState([]);
    
    const getAllUsers = async ()=>{
      await UserService.getAllUsers().then((response) => {
          setUsers(response.data);   
          console.log(response.data);    
      });
    }


    // Đang bị lỗi chưa Fetch được Group

  //   const countGroup = () => {
  //     axios.get("/api/group/all").then((response) => {
  //       setGroups(response.data);
  //     //   console.log(response.data);
  //     //  console.log(response.data.length);
  //     })
  //     .catch(error => {
  //       alert("Error Ocurred while loading data:" + error);
  //     });
  // }

    // const countLocation = () => {
    //     axios.get("/api/location/all").then((response) => {
    //       setLocations(response.data);
    //     //   console.log(response.data);
    //     //  console.log(response.data.length);
    //     })
    //     .catch(error => {
    //       alert("Error Ocurred while loading data:" + error);
    //     });
    // }

    useEffect(() => {
        getAllUsers();
        // countGroup();
        // countLocation();
    }, []);


  return (
    <div>
        <>
        {/* Hiển thị số lượng User, Group và Location */}
         Total User: {users.length}
         {/* <br></br>
         Total Group: {groups.length} */}
         {/* <br></br>
         Total Location: {locations.length} */}
        </>
    </div>
    
  )
}

export default CountRow