import axios from 'axios';
import {BASE_URL} from './config';
// import { Storage } from "aws-amplify";

export const createPost = async ({postMedia,text,title,fileUrl}) => {
    try{
        const url = BASE_URL + '/api/post/create';
        const body = {}
        
        let { fileName, type } = postMedia;
        
        let mediaType = type.includes('video') ? 'video':'image';
        
        body.text  = text
        body.fileUrl  = fileUrl
        body.type  = mediaType
        body.fileName = fileName;
        body.title = title;
        
        const response = await axios.post(url,body);
        if(response.data.errorCode == '00')    return response.data.data;
          return null;

    }catch(e){
        console.log('Create post error')
        console.log(e)
    }

}


export const getPostPublicPost = async ({page_no}) => {
    const response = await axios.get(`${BASE_URL}/api/post`,{params:{page_no}});
    let start = Date.now();
    const processedPost = await processPost(response.data.data);
    let end = Date.now();
    console.log(`Process post video time ${end - start} ms`);
    return processedPost;
}

export const getPostComments = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/comment/${id}`)
    return response.data;
}

export const getUserPost = async () => {
    const response = await axios.get(`${BASE_URL}/api/post/user`);
    return await processPost(response.data.data)
}

export const deletePost = async (id) => {
    const response = await axios.delete(`${BASE_URL}/api/post`,{params:{id}})
    return response.data;
}

export const getUserPostById = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/post/${id}`);
    return await processPost(response.data.data)
}

export const getPostById = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/api/likepost/${id}`)
        const processedData =  await processPost([response.data.data])
        return processedData[0];
    }catch(e){
        console.log(e);
        return {status:false,message:e.message}
    }
}

export const followUser = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/follow`,{params:{id}})
    return await response.data;
}

export const unfollowUser = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/unfollow`,{params:{id}})
    return await response.data;
}

export const like = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/like/${id}`)
    return response;
}

export const comment = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/comment/`,payload)
    
}
export const dislike = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/dislike/${id}`)
    return response;
}

export const getSearchResult = async (text)=>{
    try{
        const response = await axios.get(`${BASE_URL}/api/search`,{params:{text}})
        console.log(response.data)
        return await response.data;
    }catch(e){
        console.log(e)
        return {status:false}
    }
}
  
export const uploadFileAndGetUrl = async (file) => {
    try{
      const response = await axios.get(`${BASE_URL}/api/get-signed-rul`,{params:{type:file.type}});
      const s3BucketAuthInfo = response.data.data;
  
      const data = { bucket: "myproad", ...s3BucketAuthInfo.fields, 'Content-Type': file.type, file};
  
      const formData  = new FormData();
      for (const name in data) {
          formData.append(name, data[name]);
      }
      
      const s3Response = await fetch(s3BucketAuthInfo.url, {
          method: 'POST',
          body: formData,
      });
  
      console.log('s3Response')
      console.log(s3Response)
      
      if (s3Response.ok === true) {
        console.log('File upload success')
          const downloadLink= `${s3BucketAuthInfo.url}/${s3BucketAuthInfo.fields.key}`;
          return downloadLink
      }
      return false
    }catch(e){
        console.log('uploadFileAndGetUrl Error')
        console.log(e)
        return false;
    }
}

export const getNotification = async ()=>{
    const response = await axios.get(`${BASE_URL}/api/notification`)
    return response && response.data;
}

export const readNotification = async (id)=>{
    const response = await axios.get(`${BASE_URL}/api/notification/read/${id}`)
    return response && response.data;
}

export const uploadFileToAmplifyS3Bucket =  async (gallaryPhoto)=>{
    // const photo = await fetch(gallaryPhoto.uri)
    // const photoBlob = await photo.blob();
    // const result1 = await Storage.put(gallaryPhoto.fileName, photoBlob, {
    //     contentType: gallaryPhoto.type,
    //     progressCallback:(progress)=>{
    //         gallaryPhoto.progressCallback && gallaryPhoto.progressCallback(Math.round(
    //             (progress.loaded / progress.total) * 100
    //           ));
    //     }
    // });
    // console.log('aplify file upload response')
    // console.log(result1)
    return 'result1';
}


export const processPost = async (post) => {
    return post
    // const videoPromised = [] ;
    //  post.forEach((item) =>(item.video || item.image) ? videoPromised.push(Storage.get(item.video || item.image)): videoPromised.push(new Promise((s)=>s({}))));
    //  const resolvedPromised = await Promise.all(videoPromised);
    //  post.map((item,index)=> item.video ? (item.video = resolvedPromised[index]) : (item.image = resolvedPromised[index]));
    //  return post;
}