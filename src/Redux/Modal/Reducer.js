//  State of reducer and update state 
// State update accorfing to payload and action
import { CLOSE_COMMENT_MODAL, OPEN_COMMENT_MODAL } from "./ModalTypes";


const initialState = {
    open: false,
    data: null,
    modalType: -1,
};

export const modalReducer = (state=initialState,action)=>{
    switch(action.type){
        case OPEN_COMMENT_MODAL:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType
            }
        case CLOSE_COMMENT_MODAL:
            return initialState;
        default:
            return state
    }
}