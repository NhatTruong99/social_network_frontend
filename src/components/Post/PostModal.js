import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Textarea from "react-validation/build/textarea";
import ImageUploading from 'react-images-uploading';
import { ref, uploadBytesResumable } from "firebase/storage";

import PostService from "../../services/post.service";
import { storage } from "../../utils/firebaseConfig";
import { addPost, updatePost } from "../../redux/actions/PostActions";
import "./modal.css";

const PostModal = ({ handleClose, oldData, isGroupPost,groupID }) => {

    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    
    /* const [showEmojis, setShowEmojis] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null); */
    //const [message, setMessage] = useState("");
  
    const form = useRef();

    const dispatch = useDispatch();

    useEffect(() => { 
        return () => {
            setContent("");
            setImages([]);
        };
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        /* setMessage("");

        form.current.validateAll(); */
        let imagesUrl = handleUploadImages(images);
        imagesUrl.then(res => {
            let imagesString = res.reduce((accum, current) => {
                return accum.concat("|" + current);
            }, "")
            if(isGroupPost) {
                if (oldData !== null) {
                    PostService.updatePost({content: content, image: images.length !== 0 ? imagesString : "NONE"}, oldData.id)
                        .then(res => {
                            console.log(res.data);
                            dispatch(updatePost(res.data));
                        });
                } else {
                    PostService.createPostGroup({content: content, image: images.length !== 0 ? imagesString : "NONE"},groupID)
                        .then(res => {
                            console.log(res.data);
                            dispatch(addPost(res.data));
                        });
                }
            } else {
                if (oldData !== null) {
                    PostService.updatePost({content: content, image: images.length !== 0 ? imagesString : "NONE"}, oldData.id)
                        .then(res => {
                            console.log(res.data);
                            dispatch(updatePost(res.data));
                        });
                } else {
                    PostService.createPost({content: content, image: images.length !== 0 ? imagesString : "NONE"})
                        .then(res => {
                            console.log(res.data);
                            dispatch(addPost(res.data));
                        });
                }
            }
        })
        
        //Bắt lỗi và hiển thị...

        handleClose();
    }

    const handlePreventSubmit = (event) => {
        event.preventDefault();
    }

    const onChangeContent = (event) => {
        let value = event.target.value;
        setContent(value);
    }
    const onChangeImage = (listImages, index) => {
        setImages(listImages);
    }

    const handleUploadImages = async (images) => {
        const imagesArray = [];
        for (let i = 0; i < images.length; i++) {
            const storageRef = ref(storage, `post_images/${images[i].file.name}`);
            const upload = await uploadBytesResumable(storageRef, images[i].file);
            imagesArray.push(images[i].file.name);
        }
        return imagesArray;
    };

    return (
        <div className="modal-container">
           
            <section className="modal-main p-3 col-md-6 col-lg-4">
                <div>
                    <h3 className="text-center">{ oldData === null ? "Create Post" : "Update Post" }</h3>
                    <button type="button" className="btn btn-secondary position-absolute" style={{top: "0px", right: "0px"}} onClick={handleClose}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <Form onSubmit={ handlePreventSubmit } ref={form}>
                    <div className="form-group">
                        <Textarea
                            rows="5"
                            className="form-control"
                            placeholder="Bạn đang nghĩ gì..."
                            name="content"
                            value={ content }
                            onChange={onChangeContent}
                            //validations={[required]}
                        />

                        {/* <button onClick={ () => setShowEmojis(!showEmojis) }>
                            open
                        </button>
                        <div className={ showEmojis ? "d-block" : "d-none"}>
                            <Picker 
                                data={ data }
                                previewPosition="none"
                                onEmojiSelected={ (e) => {
                                    setCurrentEmoji(e.native);
                                    setShowEmojis(!showEmojis);
                                } }
                            />
                        </div> */}
                    </div>
                    <div className="form-group">
                        <ImageUploading 
                            multiple
                            className="form-control"
                            value={ images }
                            onChange={ onChangeImage }
                            maxNumber={100}
                            //validations={[required]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <div className="upload__image-wrapper">
                                    {/* Kéo thẻ ảnh (làm sau) */}
                                    <div {...dragProps} 
                                        style={isDragging ? { backgroundColor: '#E5E5E5' } : undefined} 
                                        className="dragprop-area"
                                    >Kéo thả ảnh</div>
                                    <button
                                        className="btn btn-info rounded"
                                        onClick={ onImageUpload }
                                    >
                                        <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                    </button>
                                    {/* <button 
                                        onClick={onImageRemoveAll}
                                        className="btn btn-danger rounded"
                                    >
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button> */}
                                    <div className="image-raw-list">
                                        {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <div>
                                                        <img src={image['dataURL']} alt="" onClick={() => onImageUpdate(index)} />
                                                        <div className="image-item__btn-wrapper">
                                                            <button className="btn btn-danger" onClick={() => onImageRemove(index)}>
                                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary w-100" 
                        onClick={ handleSubmit }
                    > Post </button>
                    
                    {/* <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </Form>
                
            </section>
        </div>
    )
}

export default PostModal;