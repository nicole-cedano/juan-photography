import React, {useContext}from 'react'
import { useFormProperties} from "../shared/hooks"
import ContactForm from './contact/ContactForm.js'
import {UserContext} from '../context/UserProvider.js'

const Contact = () => {
    // const {toggle, toggler} = useToggle(true)
    const {contactPost} = useContext(UserContext)
    const initInputs = {name: "", email:"", subject:"", message: ""}
    
    const handleContactSubmit = (inputs) => {
        const {name, email, subject, message} = inputs
        const newContact = {name, email, subject, message}
        contactPost(newContact)
    }
    const {inputs, handleChange, handleSubmit} = useFormProperties(initInputs, handleContactSubmit)
    return(
        <div className="contact-form-container">
            {/* <img className="contact-image" src={require('./images/IMG_2801.jpg')}/> */}
            <ContactForm handleChange={handleChange} handleSubmit={handleSubmit} inputs={inputs}/>
        </div>
    )
}

export default Contact
