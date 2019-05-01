import React , {useState} from 'react'

//app toggle
export const useToggle = isToggled => {
    const [toggle, setToggle] = useState(isToggled)
    const toggler = () => setToggle(!toggle)
    return {toggle, toggler}
}

//app 

export const useFormProperties = (initInputs, callback) => {
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        callback(inputs)
        setInputs(initInputs)
    }
    return {handleChange, handleSubmit, inputs}
}
