import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import UserRoleService from "../../../services/userRole.service";

const UserForm = () => {
// Gán Url luôn thì bị lỗi: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
//  const editURL = "http://localhost:8080/api/user/";
  const navigate = useNavigate();
  // Lấy UserID với RoleID khi nhấn vào Button Edit ở trang User Role Table
  const {userID} = useParams();
  const {roleID} = useParams();

  const [user_name, setUserName] = useState([]);
  const [user_ID, setUserID] = useState(0);
  const [role_ID, setRoleID] = useState(0);

  const [roleList, setRoleList] = useState([]);



 
  useEffect(() => {

      UserRoleService.getAllRole().then((res)=>{
        setRoleList(res.data)

      }).catch(error => {
        alert("Error Ocurred getting user detail:"+ error);
       }); 

      UserRoleService.getUserRoleByID(userID, roleID).then((response) => {
      // Truyền List nên phải userRole[0]
      setUserName(response.data.user.username);
      setUserID(response.data.user.id)
      setRoleID(response.data.role.id);  
    }).catch(error => {
     alert("Error Ocurred getting user detail:"+ error);
    }); 

  },[]);
    
  

    const roleIDChangeHandler = (event) => {
      setRoleID(event.target.value);
    };

    const submitActionHandler = async (event) => {
      event.preventDefault();
      console.log(userID,roleID,role_ID)
      await UserRoleService.updateUserRole(userID, roleID,role_ID)
        .then((response) => {  
          navigate('/user-role/read')
        })
        .catch(error => {
          alert("Error Ocurred Updating User Role:"+ error);
        });
  
    };
  
    //form m nhin la vl, copy tren mangbiet
      return(
        <Alert variant='primary'>
        <Container>
        <Form id="data" style={{'text-align':'center'}}>
        <Form.Group>
            <Form.Label className='mr-1'>Username</Form.Label>
            <input type="text" name="user_ID" value={user_name} placeholder="Enter UserID" disabled/>
        </Form.Group>
        <br></br>
        <Form.Group >
        <Form.Label className='mr-3'>Role</Form.Label>
        <select value={role_ID} onChange={(e) => setRoleID(e.target.value)}>
                {roleList && roleList.map( 
                  (item) =>
                  
                  <option value={item.id}> {item.name}</option>
                 )
                }
               
        </select>
        </Form.Group>
        <br></br>
        &nbsp;&nbsp;&nbsp;
        <Button className="mr-2"type='submit' onClick={(e)=>submitActionHandler(e)}>Submit</Button>
        <Button onClick={()=> navigate('/user-role/read')}>Cancel</Button>

      </Form>

      </Container>
      </Alert>

      );
  }
  export default UserForm;