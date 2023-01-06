import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import GroupService from "../../../services/group.service";

const GroupForm = () => {
// Gán Url luôn thì bị lỗi: has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
//  const baseURL = "http://localhost:8080/api/user";
  const navigate = useNavigate();
//  const [enteredGroupID, setGroupID] = useState('');
  const [enteredGroupName, setGroupName] = useState('');
  const [enteredGroupAbout, setGroupAbout] = useState('');
  const [enteredCreatedDate, setCreatedDate] = useState('');

  // const GroupIDChangeHandler = (event) => {
  //   setGroupID(event.target.value);
  // };

  const groupNameChangeHandler = (event) => {
    setGroupName(event.target.value);
  };

  const groupAboutChangeHandler = (event) => {
    setGroupAbout(event.target.value);
  };

  const createdDateChangeHandler = (event) => {
    setCreatedDate(event.target.value);
  };


  const submitActionHandler = async (event) => {
    event.preventDefault();
    await GroupService.createGroup({
        groupName: enteredGroupName,
        groupAbout: enteredGroupAbout,
        createdDate: enteredCreatedDate
      })
      .then((response) => {
        alert("Group  "+ enteredGroupAbout +" added!");

       navigate("/admin/group/read");

      }).catch(error => {
        alert("error==="+error);
      });

  };

  const cancelHandler = () =>{
    // reset the values of input fields
    // setGroupID('');
    setGroupName('');
    setGroupAbout('');
    setCreatedDate('');

    navigate("/admin/group/read");

  }
    return(
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>
        {/* <Form.Group controlId="form.GroupID">
            <Form.Label>Group ID</Form.Label>
            <Form.Control type="number" value={enteredGroupID} onChange={groupIDChangeHandler} placeholder="Enter Group ID" required/>
        </Form.Group> */}
         <Form.Group  controlId="form.GroupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control type="text" value={enteredGroupName} onChange={groupNameChangeHandler} placeholder="Enter Group Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.GroupAbout">
            <Form.Label>About</Form.Label>
            <Form.Control type="text" value={enteredGroupAbout} onChange={groupAboutChangeHandler} placeholder="Enter Group About" required/>
        </Form.Group>
        <Form.Group  controlId="form.CreatedDate">
            <Form.Label>Created Date</Form.Label>
            <Form.Control type="date" value={enteredCreatedDate} onChange={createdDateChangeHandler} placeholder="Enter Created Date" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Add User</Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>

    </Container>
    </Alert>

    );
}
export default GroupForm;