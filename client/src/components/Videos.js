import React, { useEffect, useContext } from 'react'
import { MediaContext } from '../context/MediaProvider.js'
import { Player, LoadingSpinner , BigPlayButton, ControlBar} from 'video-react' 
import "../../node_modules/video-react/dist/video-react.css"
import "./styles.css"

const Videos = () => {
    const { videos, getVideos } = useContext(MediaContext)
    useEffect(() => { getVideos() }, [])


    return (
        <div className="video-wrapper">
            {videos.map((vid, i) => {
                console.log(videos)
                return (
                    <div style={{padding: "20px"}}>
                    <Player fluid={false} height={300} width={200} key={i}>
                        <source src={vid.url}/>
                        <LoadingSpinner/>
                        <BigPlayButton style={{position: "center"}}/>
                        <ControlBar />
                    </Player>
                    </div>
              
            )})
            }
        </div>
    )
}

export default Videos