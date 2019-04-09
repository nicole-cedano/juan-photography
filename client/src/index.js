import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider'
import MediaProvider from './context/MediaProvider.js'
import './styles.css'


ReactDOM.render(
    <BrowserRouter>
        <MediaProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </MediaProvider>
    </BrowserRouter>,
    document.getElementById('root'))
