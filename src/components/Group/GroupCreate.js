import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";

import GroupService from "../../services/group.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { addGroup } from "../../redux/actions/GroupActions";

const GroupCreate = () => {

    const currentUser = AuthService.getCurrentUser();
    
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newGroup = {groupName: name, groupAbout: "none"};
        await GroupService.createGroup(newGroup)
            .then(res => {
                UserService.joinGroup(res.data.id, currentUser.id)
                    .catch((err) => {
                        console.log(err);
                    });
                dispatch(addGroup(res.data));
                navigate("/group/" + res.data.id);
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    const handleChangeName = (event) => {
        let value = event.target.value;
        setName(value);
    }

    return (
        <div>
            <section>
                <div className="gap gray-bg">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row d-flex justify-content-center" id="page-contents">
                                    <div className="col-lg-5">
                                        <div className="central-meta">
                                            <div className="editing-info">
                                                <h5 className="f-title"><i className="ti-lock"></i>Tạo nhóm</h5>
                                                
                                                <Form onSubmit={ handleSubmit }>
                                                    <div className="form-group">	
                                                        <input 
                                                            type="text" id="input" 
                                                            required="required"
                                                            onChange={ handleChangeName }
                                                        />
                                                        <label className="control-label" htmlFor="input">Tên nhóm</label><i className="mtrl-select"></i>
                                                    </div>
                                                    <div className="submit-btns">
                                                        <button type="submit" className="mtr-btn"><span>Tạo</span></button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>	
                                    </div>
                                </div>	
                            </div>
                        </div>
                    </div>
                </div>	
            </section>
        </div>
    )
}

export default GroupCreate;