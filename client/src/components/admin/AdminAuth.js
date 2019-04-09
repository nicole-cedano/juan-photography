import React , {useContext} from 'react'
import { useFormProperties} from "../../shared/hooks"
import { UserContext } from "../../context/UserProvider.js"
import AuthForm from './authForm.js'
import "./styles.css"

const AdminAuth = () => {
    // const {toggle, toggler} = useToggle(true)
    const {login, errMsg} = useContext(UserContext)
    const initInputs = {username: "", password:""}
    
    const handleLogin = (inputs) => {
        console.log(login)
        const credentials = inputs
        login(credentials)
    }
    const {inputs, handleChange, handleSubmit} = useFormProperties(initInputs, handleLogin)
    return(
        <div className="login-container">
            <h4>Login</h4>
            <AuthForm handleChange={handleChange} handleSubmit={handleSubmit} inputs={inputs}/>
            <p style={{color: "firebrick"}}>{errMsg}</p>
        </div>
    )
}

export default AdminAuth