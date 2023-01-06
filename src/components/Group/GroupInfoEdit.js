import React, { useEffect, useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";

import GroupService from '../../services/group.service';

const GroupInfoEdit = ({ data }) => {
    const [name, setName] = useState(data.groupName);
    const [about, setAbout] = useState(data.groupAbout);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        updateGroup({groupName: name, groupAbout: about}, data.id)
            .then(res => {
                console.log(res.data);
                alert("Update Successfully");
            })
            .catch(err => {
                console.log(err);
                const resMessage =
                    (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message ||
                    err.toString();
                setMessage(resMessage);
                setSuccessful(false);
            });
    }

    const onChangeName = (event) => {
        let value = event.target.value;
        setName(value);
    }

    const onChangeAbout = (event) => {
        let value = event.target.value;
        setAbout(value);
    }

    const updateGroup = async (group, groupId) => {
        return await GroupService.updateGroup(group, groupId);
    }

    return (
        <div className="col-lg-6">
            <div className="central-meta">
                <div className="editing-info">
                    <h5 className="f-title"><i className="ti-info-alt"></i> Edit Basic Information</h5>

                    <Form 
                        onSubmit={ handleSubmit }
                        method="post" 
                        ref={ form }
                    >
                        <div className="form-group">	
                            <input 
                                type="text" 
                                id="input" 
                                required="required"
                                name="groupName"
                                value={ name }
                                onChange={ onChangeName }
                                
                            />
                            <label className="control-label" htmlFor="input">Name</label><i className="mtrl-select"></i>
                        </div>
                        <div className="form-group">	
                            <textarea 
                                rows="4" 
                                id="textarea" 
                                required="required"
                                name="groupAbout"
                                value={ about }
                                onChange={ onChangeAbout }
                            ></textarea>
                            <label className="control-label" htmlFor="textarea">About</label><i className="mtrl-select"></i>
                        </div>
                        <div className="submit-btns">
                            <button type="submit" className="mtr-btn"><span>Update</span></button>
                        </div>
                    </Form>
                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </div>	
        </div>
    );
}

export default GroupInfoEdit;