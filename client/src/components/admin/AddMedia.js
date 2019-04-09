import React from 'react'
import ImageUpload from './media/ImageUpload.js'
import VideoUpload from './media/VideoUpload.js'

const AddMedia = () => {
    return (
        <div className="media-admin">
            <ImageUpload />
            <VideoUpload />
            <p className={"file-upload"}>Add multiple files @ once, choose a file and upload, then repeat the cycle before the first download is over.</p>


        </div>
    )
}
export default AddMedia