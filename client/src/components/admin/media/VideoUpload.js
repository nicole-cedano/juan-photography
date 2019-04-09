import React , {useState} from 'react'
import {storage} from '../../../firebase'
import axios from 'axios'


const VideoUpload = props => {
    const initialState = {
        file: null,
        video: [],
        url: "",
        progress: 0
    }
    const [uploadState, setUploadState] = useState(initialState)
    const handleChange = e => {
        for (let i = 0; i < e.target.files.length; i++){
            console.log(e.target.files)
            const video = e.target.files[i]
            setUploadState({ ...initialState , video})
            
            handleUploadAsPromise(video)
        }
    }
    const handleUploadAsPromise = (video) => {
        new Promise(function(resolve, reject){
        const uploadTask = storage.ref(`videos/${video.name}`).put(video)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUploadState({...uploadState, progress})
            },
            (err) => {
                console.log(err)
            },
            () => {
                storage.ref('videos').child(video.name).getDownloadURL().then(url => {
                    console.log(url)
                    setUploadState({...uploadState, url})
                    
                    const addVideo = url => {
                        const newVideo = {
                            url: url
                        }
                        axios.post('/video', newVideo).then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err))
                    }
                    addVideo(url)
                })
            })
        })
    }
    const {progress} = uploadState
    return (
        
        <div className="video-upload">
            <h1>+Video</h1>
            <progress value={progress} max="100" />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUploadAsPromise}>Upload</button>
        </div>
    )
}


export default VideoUpload
