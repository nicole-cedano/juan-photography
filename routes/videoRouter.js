const express = require('express')
const videoRouter = express.Router()
const Video = require('../models/video.js')


videoRouter.get("/", (req,res, next)=>{
    Video.find((err, videos)=> {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(videos)
    })
})

videoRouter.post("/", (req, res, next) => {
    const newVideo = new Video(req.body)
    newVideo.save((err, savedVideo) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Video saved to internal DB")
    })
})

videoRouter.delete("/:url",(req, res, next)=> {
    Video.findOneAndRemove({url: req.params.url}, (err, deletedVideo)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send(`Video Removed`)
    })
})



module.exports = videoRouter