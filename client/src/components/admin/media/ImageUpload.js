import React, { useState } from 'react'
import { storage } from '../../../firebase/'
import axios from 'axios'



const ImageUpload = props => {
    const initialState = {
        file: null,
        image: [],
        url: "",
        progress: 0
    }
    const [uploadState, setUploadState] = useState(initialState)
    const handleChange = e => {
        for (let i = 0; i < e.target.files.length; i++){
            console.log(e.target.files)
            const image = e.target.files[i]
            setUploadState({ ...initialState , image})
            
            handleUploadAsPromise(image)
        }
    }
    let {url} = uploadState
    const handleUploadAsPromise = (image) => {
        new Promise(function(resolve, reject){
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUploadState({...uploadState, progress})
            },
            (err) => {
                console.log(err)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    setUploadState({...uploadState, url})
                    const addImage = url => {
                        let newImage = {url: url}
                        axios.post('/images', newImage).then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err))
                    }
                    addImage(url)
                })
            })
        })
    }
    const {progress} = uploadState

    return (
        
        <div className="image-upload">
            <h1>+Image</h1>
            <progress value={progress} max="100" />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUploadAsPromise}>Upload</button>
        </div>
    )
}

export default ImageUpload