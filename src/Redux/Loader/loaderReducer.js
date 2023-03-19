import { HIDE_LOADER, SHOW_LOADER } from "./loaderTypes";

const initialState = {
    isLoading:false,
    title:'Loading'
}

const loaderReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                ...action.payload,
                isLoading:true
            };
        case HIDE_LOADER:
            return {
                ...state,
                ...action.payload,
                isLoading:false
            };
        default:
            return state;
    }
}


export default loaderReducer;