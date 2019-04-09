import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserProvider.js'
import "./styles.css"

const Admin = () => {
    const { forms, getForms, deletePost} = useContext(UserContext)
    useEffect(() => { getForms() }, [])


    return (
        <div className={"forms-wrapper"}>
            <h2>Contact Requests</h2>
            {forms.map((form, i) => {
                return (
                    <div className="forms" key={form._id}>
                        <h5>Name:</h5>
                        <h4>{form.name}</h4>
                        <h5>Email:</h5>
                        <h5>{form.email}</h5>
                        <h5>Subject:</h5>
                        <h5>{form.subject}</h5>
                        <h5>Message:</h5>
                        <p>{form.message}</p>
                        <button onClick={() => deletePost(form._id)}>x</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Admin