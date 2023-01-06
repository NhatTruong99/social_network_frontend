import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../../../App.css";

// import detailLogo from '../../../images/details.png';


import UserRoleService from "../../../services/userRole.service";

const UserRoleDataTable = () => {

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState([]);

  

  const setUserRoleData = async () => {
    await UserRoleService.readAllUserRole()
    .then(res => {
        setUserRole(res.data);
    })
    .catch(err => {
        console.log(err);
    })
  }

  const removeUserRole = async (userID, roleID) => {
    await UserRoleService.deleteUserRole(userID, roleID)
    .then(res => {
        setUserRoleData();
        alert("Delete Success");
        // navigate("/user-role/read");
    })
    .catch(err => {
      
      alert("Error Ocurred in removeUserRole:" + err);
    });
  }
  
  useEffect(() => {
    setUserRoleData();
  }, []);
  

 

  return (
    <div class="card-body" style={{textAlign:'center'}}>
      <br>
      </br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/user-role/create")}>
          Create New User Role
        </button>
      </nav>


      <br></br>
      <div className="col-12">
        <h4 style={{textAlign:'center'}}>User Role List</h4>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>User</th>
                    <th>Role</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    userRole &&
                    userRole.map((userRoles, index) => (

                      <tr>
                        {/* <th scope="row">{index}</th> */}
                        <td>{userRoles.user.username}</td>
                        <td>{userRoles.role.name}</td>
                        <td style={{display:'inline-block'}}>
                          <button>
                              {/* useParam ở trang Edit sễ lấy 2 cái id  */}
                              <Link to={"/user-role/edit/" + userRoles.user.id + "/" + userRoles.role.id}>
                                Edit
                              </Link>
                          </button>
                          
                          <button
                            onClick={() => removeUserRole(userRoles.user.id, userRoles.role.id)} className="button"
                          > Delete
                          </button>

                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}
export default UserRoleDataTable;