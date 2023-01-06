import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import LikePostService from "../../services/likepost.service";
import Loading from "../Loading/Loading";
import PostModal from "./PostModal";
import Post from "./Post";
import { addPost, setAllPosts } from "../../redux/actions/PostActions";

import "./post.css";

const PostContainer = () => {
    const currentUser = AuthService.getCurrentUser();

    const [posts, setPosts] = useState([]);
    const [isShowed, setIsShowed] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    const [postsLiked, setPostLiked] = useState([]);

    const [isGroupPost, setIsGroupPost] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(state => state.allPosts);

	useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, [reload, state]);

    useEffect(() => {
        getAllPosts();
        getPostsCurrentUserLiked(currentUser.id);

        return () => {
            setPosts([]);
        }
    }, []);


    const getAllPosts = async () => {
        setLoading(true);
        await PostService.readAllPosts()
			.then(res => {
				let allPosts = res.data;

                
				allPosts.forEach(post => {
                    if (postsLiked.some(postLiked => postLiked.post.id === post.id)) {
                        post.isLiked = true;
                    } else {
                        post.isLiked = false;
                    }
                    getUserProfileByUser(post.user)
                        .then(profileRes => {
                            let userProfile = profileRes.data;
                            post.userProfile = userProfile;
                            setPosts(prev => {
                                if (prev.every(curPostValue => curPostValue.id !== post.id)) {
                                    return [...prev, post];
                                } else {
                                    return [...prev];
                                }
                            });
                        });
                    if (state.allPosts.every(curPostValue => curPostValue.id !== post.id)) {
                        dispatch(addPost(post));
                    }
				})
            })
            .catch(e => {
                console.log(e);
            });
        setLoading(false);
    }

    const getPostsCurrentUserLiked = async (userID) => {
        await LikePostService.readPostUserLiked(userID)
            .then(res => {
                setPostLiked(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
     
    const getUserProfileByUser = async (user) => {
        return await UserService.readUserProfile(user);
    }

    const showModal = () => {
        setIsShowed(true);
    }

    const hideModal = () => {
        setIsShowed(false);
    }

    return (
        <section>
            <div className="gap gray-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row" id="page-contents">
                                <div className="col-lg-3">
                                    <aside className="sidebar static">
                                        <div className="widget">
                                            <h4 className="widget-title">Shortcuts</h4>
                                            <ul className="naves">
                                            <li>
                                                <i className="ti-clipboard"></i>
                                                <a href="newsfeed.html" title="">News feed</a>
                                            </li>
                                            <li>
                                                <i className="ti-mouse-alt"></i>
                                                <a href="inbox.html" title="">Inbox</a>
                                            </li>
                                            <li>
                                                <i className="ti-files"></i>
                                                <a href="fav-page.html" title="">My pages</a>
                                            </li>
                                            <li>
                                                <i className="ti-user"></i>
                                                <a href="timeline-friends.html" title="">friends</a>
                                            </li>
                                            <li>
                                                <i className="ti-image"></i>
                                                <a href="timeline-photos.html" title="">images</a>
                                            </li>
                                            <li>
                                                <i className="ti-video-camera"></i>
                                                <a href="timeline-videos.html" title="">videos</a>
                                            </li>
                                            <li>
                                                <i className="ti-comments-smiley"></i>
                                                <a href="messages.html" title="">Messages</a>
                                            </li>
                                            <li>
                                                <i className="ti-bell"></i>
                                                <a href="notifications.html" title="">Notifications</a>
                                            </li>
                                            <li>
                                                <i className="ti-share"></i>
                                                <a href="people-nearby.html" title="">People Nearby</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-bar-chart-o"></i>
                                                <a href="insights.html" title="">insights</a>
                                            </li>
                                            <li>
                                                <i className="ti-power-off"></i>
                                                <a href="landing.html" title="">Logout</a>
                                            </li>
                                            </ul>
                                        </div>
                                
                                    </aside>
                                </div>

                            
                                <div className="col-lg-6">
                                    <div className="central-meta">
                                        <div className="new-postbox">
                                            <div className="">
                                                <div onClick={ showModal } >
                                                    <textarea disabled></textarea>
                                                    <div className="attachments">
                                                        <ul>
                                                            <li>
                                                                <i className="fa fa-music"></i>
                                                                <label className="fileContainer">
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-image"></i>
                                                                <label className="fileContainer">
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-video-camera"></i>
                                                                <label className="fileContainer">
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <i className="fa fa-camera"></i>
                                                                <label className="fileContainer">
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <button className="btn btn-primary" onClick={ showModal } >Post</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { 
                                        isShowed ? 
                                            <PostModal 
                                                handleClose={ hideModal } 
                                                oldData={ selectedPost }
                                                isGroupPost = {isGroupPost}
                                            /> : '' 
                                    }
                                    {
                                        posts === undefined || posts.length === 0  || loading
                                            ?  <Loading />
                                            : posts.map((post, index) => (
                                                <div className="central-meta item" key={index}>
                                                    <Post data={post}  callBack={ setReload }
                                                        selected={ setSelectedPost }
                                                        onShowModal={ showModal }
                                                    />
                                                </div>
                                            ))
                                    }
                                </div>
                                <div className="col-lg-3">
                                    <aside className="sidebar static">
                                        <div className="widget">
                                            <h4 className="widget-title">Your page</h4>	
                                            <div className="your-page">
                                                <figure>
                                                    <a href="#" title=""><img src="images/resources/friend-avatar9.jpg" alt=""/></a>
                                                </figure>
                                                <div className="page-meta">
                                                    <a href="#" title="" className="underline">My page</a>
                                                    <span><i className="ti-comment"></i><a href="insight.html" title="">Messages <em>9</em></a></span>
                                                    <span><i className="ti-bell"></i><a href="insight.html" title="">Notifications <em>2</em></a></span>
                                                </div>
                                                <div className="page-likes">
                                                    <ul className="nav nav-tabs likes-btn">
                                                        <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">likes</a></li>
                                                        <li className="nav-item"><a className="" href="#link2" data-toggle="tab">views</a></li>
                                                    </ul>
                                                    <div className="tab-content">
                                                    <div className="tab-pane active fade show " id="link1" >
                                                        <span><i className="ti-heart"></i>884</span>
                                                        <a href="#" title="weekly-likes">35 new likes this week</a>
                                                        <div className="users-thumb-list">
                                                            <a href="#" title="Anderw" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-1.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="frank" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-2.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Sara" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-3.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Amy" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-4.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Ema" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-5.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Sophie" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-6.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Maria" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-7.jpg" alt=""/>  
                                                            </a>  
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="link2" >
                                                        <span><i className="ti-eye"></i>440</span>
                                                        <a href="#" title="weekly-likes">440 new views this week</a>
                                                        <div className="users-thumb-list">
                                                            <a href="#" title="Anderw" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-1.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="frank" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-2.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Sara" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-3.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Amy" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-4.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Ema" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-5.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Sophie" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-6.jpg" alt=""/>  
                                                            </a>
                                                            <a href="#" title="Maria" data-toggle="tooltip">
                                                                <img src="images/resources/userlist-7.jpg" alt=""/>  
                                                            </a>  
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="widget friend-list stick-widget">
                                            <h4 className="widget-title">Friends</h4>
                                            <div id="searchDir"></div>
                                            <ul id="people-list" className="friendz-list">
                                                <li>
                                                    <figure>
                                                        <img src="images/resources/friend-avatar.jpg" alt=""/>
                                                        <span className="status f-online"></span>
                                                    </figure>
                                                    <div className="friendz-meta">
                                                        <a href="time-line.html">bucky barnes</a>
                                                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a0d7c9ced4c5d2d3cfccc4c5d2e0c7cdc1c9cc8ec3cfcd">[email&#160;protected]</a></i>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                            <div className="chat-box">
                                                <div className="chat-head">
                                                    <span className="status f-online"></span>
                                                    <h6>Bucky Barnes</h6>
                                                    <div className="more">
                                                        <span><i className="ti-more-alt"></i></span>
                                                        <span className="close-mesage"><i className="ti-close"></i></span>
                                                    </div>
                                                </div>
                                                <div className="chat-list">
                                                    <ul>
                                                        <li className="me">
                                                            <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt=""/></div>
                                                            <div className="notification-event">
                                                                <span className="chat-message-item">
                                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                </span>
                                                                <span className="notification-date">Yesterday at 8:10pm</span>
                                                            </div>
                                                        </li>
                                                        <li className="you">
                                                            <div className="chat-thumb"><img src="images/resources/chatlist2.jpg" alt=""/></div>
                                                            <div className="notification-event">
                                                                <span className="chat-message-item">
                                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                </span>
                                                                <span className="notification-date">Yesterday at 8:10pm</span>
                                                            </div>
                                                        </li>
                                                        <li className="me">
                                                            <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt=""/></div>
                                                            <div className="notification-event">
                                                                <span className="chat-message-item">
                                                                    Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                </span>
                                                                <span className="notification-date">Yesterday at 8:10pm</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <form className="text-box">
                                                        <textarea placeholder="Post enter to post..."></textarea>
                                                        <div className="add-smiles">
                                                            <span title="add icon" className="em em-expressionless"></span>
                                                        </div>
                                                        <div className="smiles-bunch">
                                                            <i className="em em---1"></i>
                                                            <i className="em em-smiley"></i>
                                                            <i className="em em-anguished"></i>
                                                            <i className="em em-laughing"></i>
                                                            <i className="em em-angry"></i>
                                                            <i className="em em-astonished"></i>
                                                            <i className="em em-blush"></i>
                                                            <i className="em em-disappointed"></i>
                                                            <i className="em em-worried"></i>
                                                            <i className="em em-kissing_heart"></i>
                                                            <i className="em em-rage"></i>
                                                            <i className="em em-stuck_out_tongue"></i>
                                                        </div>
                                                        <button type="submit"></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostContainer;