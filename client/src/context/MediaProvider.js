import React, { useState } from 'react'
import axios from 'axios'
export const MediaContext = React.createContext()

const MediaProvider = (props) => {
    const initMediaState = {
        images: [],
        videos: []
    }
    const [mediaState, setMediaState] = useState(initMediaState)
    const { images } = mediaState
    const getImages = () => {
        axios.get('/images').then(res => {
            setMediaState({ ...mediaState, images: res.data })
        }).catch(err => console.log(err))
    }
    const { videos } = mediaState
    const getVideos = () => {
        axios.get('/videos').then(res => {
            setMediaState({ ...mediaState, videos: res.data })
        }).catch(err => console.log(err))
    }
    const handleImageDelete = url => {
        axios.delete(`/images/${url}`).then(res => {
            alert(res.data)
        })
            .catch(err => console.log(err))
    }
    const handleVideoDelete = url => {
        axios.delete(`/videos/${url}`).then(res => {
            alert(res.data)
        })
            .catch(err => console.log(err))
    }

    return (
        <MediaContext.Provider
            value={{
                ...mediaState,
                getImages,
                getVideos,
                handleImageDelete,
                handleVideoDelete
            }}>
            {props.children}
        </MediaContext.Provider>
    )
}

export default MediaProvider
