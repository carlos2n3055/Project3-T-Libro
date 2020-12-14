import React from 'react'

import './BackgroundVideo.css'



const BackgroundVideo = () => {

    const videoSource = "/video/Library.mp4"

    return (

        <div>
            
            <video autoPlay="autoplay" loop="loop" muted className="video">
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    )
}



export default BackgroundVideo
