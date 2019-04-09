const express = require('express')
const contactRouter = express.Router()
const Contact = require('../models/contact.js')


contactRouter.get("/", (req,res, next)=>{
    Contact.find((err, forms)=> {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(forms)
    })
})

contactRouter.post("/", (req, res, next) => {
    const newContact = new Contact(req.body)
    newContact.save((err, savedContact) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send("Contact Form Sent!")
    })
})

contactRouter.delete("/:_id",(req, res, next)=> {
    Contact.findOneAndRemove({_id: req.params._id}, (err, deletedContact) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send("Contact Removed")
    })
})


module.exports = contactRouter