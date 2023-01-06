import React ,{useState ,useEffect,useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import AuthService from '../../services/auth.service'
import CommentService from '../../services/CommentService'
import ProfileService from '../../services/ProfileService';
import FirebaseSerive from '../../services/firebase.service';

function Comment({index,formRef,increaseRenderValue,data}) {


    const [isReadonly, setIsReadonly] = useState(true);
    const currentuser = AuthService.getCurrentUser();
    const inputRef = useRef();

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [avatar,setAvatar] = useState(null);

    const convertTime = (date) =>{
    
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,timeZone:'Asia/Ho_Chi_Minh'};
  
      const dateValue  = new Date(date);
      
      let time = date.match(/\d\d:\d\d/);
  
      return  time + " / " + dateValue.toLocaleDateString("en-US", options);
    }
    useEffect(()=>{

        ProfileService.getProfile(data.user.id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            FirebaseSerive.getAvatarFromFirebase(response.data.avatar).then((response) => {
                setAvatar(response)
            })
            
        })

    },[])

    const UpdateHandler = (e,commentID) =>{
            const currentInput = inputRef.current;

            if (currentInput) {
  
                currentInput.focus()
            setIsReadonly(prevState => !prevState);
      
        
            
              if (isReadonly){
                e.target.style.backgroundColor = 'lightblue'
              }
              else{
                e.target.style.backgroundColor = 'transparent';
                if(window.confirm("Update item ?")){

                  const inputUpdateComment = currentInput.value ;

                  updateComment(inputUpdateComment,commentID);
                }
                else{
                }
              }
          }}
          
           
          
        
      
      
      const updateComment = (inputUpdateComment,commentID)=>{
        var content = inputUpdateComment;
        var post = data.post

        const temp = {content,currentuser,post}
    
        
        CommentService.updateComments(commentID,temp).then((res)=>{
          alert("Update Sucess!")
          increaseRenderValue();
        
      }).catch((err)=>{
          console.log(err)
      });
      
    
       
      }
    
      const deleteComment = ((id) =>{
        CommentService.deleteComments(id).then((res)=>{
          alert("Delete Sucess!")
          increaseRenderValue();
    
      }).catch((err)=>{
          console.log(err)
      })
      });
    
    
    
      
    
      const handlerCreateReply = () => {

          
          const currentForm = formRef.current[index];
          if (currentForm) {
      
           
            if (currentForm.style.display === "none" || currentForm.style.display === "") {
              currentForm.style.display = "block";
            } else {
              currentForm.style.display = "none";
            }
          }
        }
    
      
      
      
      
  return (
    <>

    <div className="comet-avatar">
    <img src={avatar} className="rounded-circle avatar shadow-4" alt="Avatar"/>
  </div>

  <div className="we-comment">
														<div className="coment-head">
															<h5>{firstName} {lastName}</h5>
															<span>{convertTime(data.commentDate)}</span>
                            
                             
														</div>
                            <TextareaAutosize
                              id="TextAreaResizeable"
                              cacheMeasurements
                              defaultValue = {data.content}
                              readOnly ={isReadonly}
                              ref={inputRef} 
                              >         
                            </TextareaAutosize> 
                            <div className="d-flex we-reply">
                              <div className="feature" >
                              <span className='icon feedback-icon mr-2' onClick={(e) => handlerCreateReply()}> 
                              <i className="fa fa-reply"></i>
                            </span>
                          {
                              currentuser.id === data.user.id
                              ? 
                              <>
                              <span className='icon delete-icon mr-2' onClick={()=> {if(window.confirm('Delete the item?')){deleteComment(data.id)}}}> 
                                    <i className="fa fa-trash"></i>
                                </span>
                                <span className='icon edit-icon mr-2' onClick={(e) => UpdateHandler(e,data.id)}> 
                                <i className="fa fa-edit"></i>
                                </span>    
                                </>
                              :<></>
                          }
                          
                                </div>
                            </div>  
		</div>
  </>
  )
}


export default Comment;