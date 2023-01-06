import React from 'react';
import Button from '@atlaskit/button';
import styled ,{css} from "styled-components";
import CheckIcon from '@atlaskit/icon/glyph/check'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'

const ButtonStyled = styled(Button)`
    margin-top: 5px;
    text-align: left;
    font-size:20px;
    &,&:hover{
        ${(p) => 
            
                p.isdone===1 && css`
                text-decoration: line-through;       
            `  
        }

        ${(p) => 
            
            p.isdone===0 && css`
            text-decoration: none;       
        `  
    }
    }
  

    &:hover{
        .check-icon , .delete-icon{
            display:inline-block;
        }
    }
    .check-icon ,.delete-icon {
        display:none;
        margin-right:10px;
        &:hover{
            background-color:#e2e2e2;
            border-radius:3px; 
        }
    }
    
`;

export default function Todo({todo,onCheckBtnClick,onDeleteBtnClick}) {
  return( 
    <>
  <ButtonStyled 
  isdone={todo.isdone}
  shouldFitContainer 
  iconAfter={  (
    <>
   <span className='check-icon' onClick={()=>onCheckBtnClick(todo.id)}> 
   <CheckIcon primaryColor='#4fff4f'>
    </CheckIcon>
    </span>

    <span className='delete-icon' onClick={()=>onDeleteBtnClick(todo.id)}> 
    <EditorRemoveIcon primaryColor='#FF0000'>
    </EditorRemoveIcon>
    </span>
    </>
  )
  }>
    {todo.name}
  
    </ButtonStyled>
      
       </>
  );
}
