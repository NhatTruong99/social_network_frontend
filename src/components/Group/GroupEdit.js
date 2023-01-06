import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GroupInfoEdit from './GroupInfoEdit';
import GroupMembersList from './Member/GroupMembersList';
import GroupService from '../../services/group.service';

const GroupEdit = () => {
    const [group, setGroup] = useState();
    const [isShowedInfo, setIsShowedInfo] = useState(true);
    const [isShowedMembers, setIsShowedMembers] = useState(false);


    let { id } = useParams();

    useEffect(() => {
        getGroupById(id)
            .then(res => {
                setGroup(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        return () => {
            setGroup(null);
        }
    }, []);

    const getGroupById = async (groupId) => {
        return await GroupService.readGroupById(groupId);
    }

    const handleShowEdit = (event) => {
        event.preventDefault();
        setIsShowedMembers(false);
        setIsShowedInfo(true);
    }

    const handleShowMembers = (event) => {
        event.preventDefault();
        setIsShowedInfo(false);
        setIsShowedMembers(true);
    }

    return (
        <div>
            <section>
                <div className="gap gray-bg">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row justify-content-evenly" id="page-contents">
                                    <div className="col-lg-3">
                                        <aside className="sidebar static">
                                            <div className="widget stick-widget">
                                                <h4 className="widget-title">Management</h4>
                                                <ul className="naves">
                                                    <li>
                                                        <i className="ti-info-alt"></i>
                                                        <a 
                                                            href="#" 
                                                            title=""
                                                            onClick={ handleShowEdit }
                                                        >Basic info</a>
                                                    </li>
                                                    <li>
                                                        <i className="ti-mouse-alt"></i>
                                                        <a 
                                                            href="#" 
                                                            title=""
                                                            onClick={ handleShowMembers }
                                                        >Members</a>
                                                    </li>
                                                </ul>
                                            </div>									
                                        </aside>
                                    </div>
                                    { 
                                        group && isShowedInfo && !isShowedMembers &&
                                        <GroupInfoEdit data={ group }/>
                                    }
                                    {
                                        group && !isShowedInfo && isShowedMembers &&
                                        <GroupMembersList data={ group }/>
                                    }
                                </div>	
                            </div>
                        </div>
                    </div>
                </div>	
            </section>
        </div>
    );
}

export default GroupEdit;