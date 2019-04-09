const express = require('express')
const imageRouter = express.Router()
const Image = require('../models/image.js')


imageRouter.get("/", (req,res, next)=>{
    Image.find((err, images)=> {
        if(err){
            res.status(500)
            return next(err)
        }
        console.log(images)
        return res.status(200).send(images)
    })
})

imageRouter.post("/", (req, res, next) => {
    const newImage = new Image(req.body)
    newImage.save((err, savedImage) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Image saved to internal DB")
    })
})

imageRouter.delete("/:url",(req, res, next)=> {
    Image.findOneAndRemove({url: req.params.url}, (err, deletedImage)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send(`Image Removed`)
    })
})


module.exports = imageRouter