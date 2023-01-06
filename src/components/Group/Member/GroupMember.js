import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getImageUrlFromFirebase } from '../../../utils/firebasePort';

const GroupMember = ({ key, profile, removeMember }) => {

    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        getImageFromFirebase(profile.avatar)
            .then(url => {
                setAvatar(url);
            })
            .catch(err => {
                console.log(err);
            })

        return () => {
            setAvatar("")
        }
    }, []);

    const getImageFromFirebase = async (image) => {
        return await getImageUrlFromFirebase("avatarImages", image);
    }

    return (
        <li key={key}>
            <div className="nearly-pepls">
                <figure>
                    <Link to={ "/profile/" + profile.user.id } title="">
                        <img src={ avatar } alt="" />
                    </Link>
                </figure>
                <div className="pepl-info">
                    <h4><Link to={ "/profile/" + profile.user.id } title="">
                        { profile.firstName.concat(" "+profile.lastName) }
                    </Link></h4>
                    {/* <span>ftv model</span> */}
                    <a 
                        href="#" 
                        title="" className="add-butn bg-danger" 
                        data-ripple=""
                        onClick={ (event) => {
                            event.preventDefault();
                            return removeMember
                                (profile.firstName.concat(" "+profile.lastName), profile.user.id);
                        } }
                    >Remove from group</a>
                </div>
            </div>
        </li>
    );
}

export default GroupMember;