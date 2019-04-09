import React from 'react'


const ContactForm = props => {
    const {handleSubmit, handleChange, inputs} = props
    return (
        <form className="contact-form "onSubmit={handleSubmit}>
            <h5>Name *</h5>
            <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                placeholder="Name"
                required />
            <h5>Email *</h5>
            <input
                type="email"
                name="email"
                onChange={handleChange} 
                value={inputs.email}
                placeholder="Email"
                required />
            <h5>Subject *</h5>
            <input 
                type="text"
                name="subject"
                onChange={handleChange}
                value={inputs.subject}
                placeholder="Subject"/>
            <h5>Message </h5>
            <textarea 
                value={inputs.message}
                onChange={handleChange}
                name="message"/>
                <button>SEND</button>
        </form>
    )
}

export default ContactForm