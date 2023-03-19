import {CLOSE_COMMENT_MODAL,OPEN_COMMENT_MODAL} from './ModalTypes';


//  Types of actions 


export const openCommnetModal = (action={})=>({type:OPEN_COMMENT_MODAL, ...action});

export const closeCommnetModal = (action={})=>({type:CLOSE_COMMENT_MODAL, ...action ,...{}});
