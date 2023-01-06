import React, { useState, useEffect } from "react";

import PostEdited from "./PostEdited";
import PostService from "../../services/post.service";
import "./modal.css";

const postHistorySection={
    overflowY: 'scroll',
    width:'500px',
    height:'500px',
    position:'relative'
};

const PostHistory = ({ postId, handleClose }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostEditHistory(postId)
            .then(res => {
                console.log(res.data);
                setPosts(res.data); 
            })
            .catch(err => {
                console.log(err);
            });
        return () => {
            setPosts([])
        }
    }, []);

    const getPostEditHistory = async (postId) => {
        return await PostService.readEditHistoryByPostId(postId);
    }

    

    return (
        <div>
            <div className="modal-container">
                <section 
                    className="modal-main p-3 col-md-6 col-lg-4"
                    style={ postHistorySection }
                >
                    <div>
                        <h3 className="text-center border-bottom m-0">History Editting</h3>
                        <button type="button" className="btn btn-secondary position-absolute" style={{top: "0px", right: "0px"}} onClick={ handleClose }>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    {
                        posts === undefined || posts.length === 0
                            ? <h3 className="center">Không có lịch sử</h3>
                            : posts.map((post) => <PostEdited 
                                        key={ post.id }
                                        post={ post }
                                    /> )
                    }
                </section>
            </div>
        </div>
    )
}

export default PostHistory;