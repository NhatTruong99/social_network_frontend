import React, { useState, useEffect } from "react";
import ReactEmoji from 'react-emoji';

import FirebaseService from '../../services/firebase.service';
import ProfileService from '../../services/ProfileService';
import { getPassedTime } from "../../utils/spUtils";
const PostEdited = ({ post }) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (post?.image !== "NONE") {
            let imageString = post.image;
            let imagesArr = imageString.split("|");

            let preProcessArr = imagesArr.filter(image => image);
            preProcessArr.forEach(imageFileName => {
                getImageFromFirebase(imageFileName);
            });
        }
        return () => {
            setImages([]);
        };
    }, []);

    const getImageFromFirebase = async (image) => {
        FirebaseService.getImageUrlFromFirebase(image)
            .then((url) => {
                setImages(prev => [...prev, url])
            });
    }

    return (
        <div>
            <h4>{ getPassedTime(new Date(post.editedDate)) }</h4>
            <div style={{ backgroundColor: "#E5E7EB" }}>
                <div className="p-2 d-flex align-items-center">
                    <img 
                        src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LEpdzksOwNEAX-7R4B_&_nc_ht=scontent.fdad3-5.fna&oh=00_AfDwVrjKfMhcgTOMI_neb_AOuXJRYoHq9-9_5EPuYOu0TA&oe=63CFF178"
                        className="rounded-circle"
                        height="50"
                    />
                    <div>Tên ng dùng</div>
                </div>
                <div className="p-2">
                    { ReactEmoji.emojify(post.content) }
                </div>
                <div>
                    { post?.image !== "NONE" ? 
                        (
                            images.length === 1 ?
                                <img 
                                    className="img-fluid" 
                                    src={ images[0] }
                                /> : 
                            images.map((image, index) => <img 
                                src={image}
                                key={index}
                            />)
                        )
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default PostEdited