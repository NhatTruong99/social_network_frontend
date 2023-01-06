
import React ,{useState ,useEffect,useRef} from 'react'
import CommentService from '../../services/CommentService'
// import CrossIcon from '@atlaskit/icon/glyph/cross'
// import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
// import FeedbackIcon from '@atlaskit/icon/glyph/feedback'
// import Button from '@atlaskit/button';
import ReplyComponent from '../Reply/ReplyComponent';
import AddReplyComponent from '../Reply/AddReplyComponent';
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import NotificationService from '../../services/NotificationService';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';



function CommentComponent({post}) {

  const { socket } = useSelector(state => state.socket);

  const [listComments,setListComments] = useState([]);

  //Dữ liệu để save
  const [inputComment,setInputComment] = useState("");
  

  const [renderValue,setRenderValue] = useState(0);
  const [isReadonly, setIsReadonly] = useState(true);
  
  const user = AuthService.getCurrentUser();

  const commentDate = new Date().toISOString().slice(0, 10);;


  const inputRef = useRef([]);
  const formRef = useRef([]);

  const increaseRenderValue = ()=>{
    setRenderValue(c=>c+1)
  }
 
  useEffect(() => { 
    getAllComments();
  },[])

  const getAllComments =()=>{
    CommentService.getComments(post.id).then((response) => {
      setListComments(response.data);       
    });
  }

  const saveComment = (e)=>{
   
    e.preventDefault();
    var content = inputComment;
    
    const temp = {content,commentDate,user,post}
    console.log(temp);
    //tạo thông báo
    NotificationService.createNotification(user.id,post.user.id,`profile/${post.user.id}`,3).then(noty => {
      socket.current.emit("sendNotification",noty.data)
    })
    console.log("taoj comment");
    

    CommentService.createComment(temp).then((res)=>{
        getAllComments();
    }).catch((err)=>{
        console.log(err)
    });
    
    setInputComment('');
  }

  
  const UpdateHandler = function(idx) {
    return function(e,postCommentID)
    {
      const currentInput = inputRef.current[idx];
      if (currentInput) {
  
        currentInput.focus()
        setIsReadonly(prevState => !prevState);
  
        if(currentInput.nextSibling.hasChildNodes()){
        
          if (isReadonly){
            e.target.style.backgroundColor = 'lightblue'
          }
          else{
            e.target.style.backgroundColor = 'transparent';
            if(window.confirm('Delete the item?')){
              const inputUpdateComment = currentInput.value ;
              updateComment(inputUpdateComment,postCommentID);
            }
            else{
              getAllComments();
            }
          }
      }
      
       
      }
    };
  
  } 
  const updateComment = (inputUpdateComment,postCommentID)=>{
    var content = inputUpdateComment;
    const temp = {content,commentDate,user,post}

    
    CommentService.updateComments(postCommentID,temp).then((res)=>{
      alert("Update Sucess!")
    
  }).catch((err)=>{
      console.log(err)
  });
  

   
  }

  const deleteComment = ((id) =>{
    CommentService.deleteComments(id).then((res)=>{
      getAllComments();
      alert("Delete Sucess!")

  }).catch((err)=>{
      console.log(err)
  })
  });



  
  const handlerCreateReply = function(idx) {
    return function(e)
    {
      
      const currentForm = formRef.current[idx];
      if (currentForm) {
  
       
        if (currentForm.style.display === "none" || currentForm.style.display === "") {
          currentForm.style.display = "block";
        } else {
          currentForm.style.display = "none";
        }
      }
    };
  
  } 

  return (
    <div >
            <div className="comment-box card">
               <form>
               <div className="form-group mb-2">
                 <TextareaAutosize
                 autoFocus
                 cacheMeasurements
                 id="TextAreaResizeable"
                 name="inputComment" 
                 placeholder="Viết bình luận công khai..."      
                 value = {inputComment}
                 onChange= {(e)=> setInputComment(e.target.value)}
                 >
                </TextareaAutosize>                
               </div>
                 <button disabled={!inputComment} className="float-end" >Bình luận</button>
             </form>
             {
            listComments.map(     
                (comment,index) =>
                <div key={comment.id}>         
               
                <div className="card-body">

                <div className="user-info row col-12">
                  <div className="col-lg-1 col-2 align-self-center">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="rounded-circle avatar shadow-4" alt="Avatar" />
                  </div>

                  <div className="user-info-text col-lg-11 col-10 ">              
                    <h5 className="card-title">UserID: {comment.user.id}</h5>              
                    <TextareaAutosize
                    id="TextAreaResizeable"
                    cacheMeasurements
                    defaultValue = {comment.content}
                    ref={el => inputRef.current[index] = el} 
                    readOnly ={isReadonly}
                    >         
                    </TextareaAutosize> 
                   
                    <div className="d-flex">
                      <div className="feature" >
                      <span className='icon feedback-icon mr-2' onClick={(e) => handlerCreateReply(index)(e)}> 
                      <i className="fa fa-reply"></i>
                     </span>
                      <span className='icon delete-icon mr-2' onClick={()=> {if(window.confirm('Delete the item?')){deleteComment(comment.id)}}}> 
                      <i className="fa fa-trash"></i>
                  </span>
                  <span className='icon edit-icon mr-2' onClick={(e) => UpdateHandler(index)(e,comment.id)}> 
                  <i className="fa fa-edit"></i>
                  </span>     
                        </div>
                  <p className="ms-3 card-text">{comment.commentDate}</p>
                  </div>  
                  </div> 


              </div>

             </div>

            <ReplyComponent  renderValue={renderValue} comment={comment} />

          
            <div id="reply-form" ref={el => formRef.current[index] = el}>
            <AddReplyComponent  increaseRenderValue={increaseRenderValue} comment={comment}/>

            </div>

            
            </div>

            )
              
            }

            </div>
    </div>
  )
}

export default CommentComponent;