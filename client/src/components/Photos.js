import React, { useEffect, useContext } from 'react'
import { MediaContext } from '../context/MediaProvider.js'
import "./styles.css"

const Photos = () => {
    const { images, getImages } = useContext(MediaContext)
    useEffect(() => { getImages() }, [])


    return (
        <div className={"photos-wrapper"}>
            {images.map((img, i )=> {
                return <img key={i} className="photos" src={img.url} />
            })
            }
        </div>
    )
}

export default Photos
