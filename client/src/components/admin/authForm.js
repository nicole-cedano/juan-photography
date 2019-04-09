import React from 'react'
import "./styles.css"


const AuthForm = props => {
    const {handleSubmit, handleChange, inputs} = props
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                onChange={handleChange}
                value={inputs.username}
                placeholder="Username"
                className="input-login"
                required />
            <input
                type="password"
                name="password"
                onChange={handleChange} 
                value={inputs.password}
                placeholder="Password"
                className="input-login"
                required />
                <button>Login</button>
        </form>
    )
}

export default AuthForm