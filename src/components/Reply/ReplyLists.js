import React ,{useState,useEffect,useRef} from 'react';
import ReplyService from '../../services/ReplyService'


import Reply from './Reply';


function ReplyLists({renderValue,increaseRenderValue,comment}){

    const [listReplies,setListReplies] = useState([]);



   
    useEffect(() => {
      getAllReplies();
    },[renderValue] );

    const getAllReplies =()=>{
      ReplyService.getReplies(comment.id).then((response) => {
          setListReplies(response.data);       
      });
    }

    
  
    

    
  return (
    <div>
        {
            listReplies.map(
                (reply,index) =>
                <li key={reply.id}>    

                <Reply increaseRenderValue={increaseRenderValue} data={reply}/>
            
                </li>
            )
        }
    </div>
  )
}

export default ReplyLists;