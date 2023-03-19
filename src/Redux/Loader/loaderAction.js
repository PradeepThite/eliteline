import { HIDE_LOADER, SHOW_LOADER } from "./loaderTypes";

const show = (payload={}) => {
    return {
        type: SHOW_LOADER,
        payload
    }
}

const hide = (payload={}) => {
    return {
        type: HIDE_LOADER,
        payload:{...payload,title:'Loading'}
    }
}


export const showLoader = show;
export const hideLoader = hide;