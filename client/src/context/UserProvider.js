import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const UserProvider = (props) => {
    const initialState =
    {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.token || "",
        errMsg: "",
        forms: []
    }
    const [userState, setUserState] = useState(initialState)
    const login = credentials => {
        axios.post("adminAuth/login", credentials).then(res => {
            const { user, token } = res.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            setUserState({
                ...userState,
                user,
                token
            })

        })
            .catch(err => handleErr(err.response.data.errMsg))
    }
    //logout 
    const logout = () => {
        const { user, token } = userState
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({ ...userState, user: {}, token: "" })

    }
    // get users contact forms that have been posted
    const { forms } = userState
    const getForms = () => {
        axios.get("/contact").then(res => {
            setUserState({ ...userState, forms: res.data })
        }).catch(err => console.log(err))
    }
    // posting contact info to db
    const contactPost = newContact => {
        axios.post("/contact", newContact).then(res => {
            alert(res.data)
        })
            .catch(err => console.log(err))
    }
    // delete contact info
    const deletePost = _id => {
        axios.delete(`/contact/${_id}`).then(res => {
            setUserState({...userState, forms: userState.forms.map(form => form._id !== _id ? res.data : form)})
            alert(res.data)
        })
        .catch(err => console.log(err))
    }
    //error handler for this provider
    const handleErr = errMsg => setUserState({ ...userState, errMsg })
    return (
        <UserContext.Provider
            value={{ ...userState, login, logout, contactPost, getForms, deletePost }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider


