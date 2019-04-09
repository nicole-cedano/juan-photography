import React, {useContext} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminAuth from './components/admin/AdminAuth'
import Admin from './components/admin/Admin.js'
import ProtectedRoute from './shared/ProtectedRoute.js'
import {UserContext} from './context/UserProvider.js'
import {useToggle} from './shared/hooks'
import AddMedia from './components/admin/AddMedia.js'
import NavBar from './components/NavBar.js'
import Photos from './components/Photos.js'
import Videos from './components/Videos.js'
import Contact from './components/Contact.js'
import Logo from './shared/Logo.js'


const App = () => {
    const {token} = useContext(UserContext)
    const {toggle, toggler} = useToggle(true)
    return (
        <div className="wrapper">
            <NavBar token={token}/>
            <Logo />
            <Switch>
                <Route exact path="/" render={rProps => <Photos {...rProps} />} />
                <Route path="/contact" render={rProps => <Contact {...rProps}/>}/>
                <Route path="/adminAuth" render={rProps => token ? <Redirect to="/admin"/> :<AdminAuth {...rProps}/>}/>
                <Route path="/photos" render={rProps => <Photos {...rProps}/>}/>
                <Route path="/videos" render={rProps => <Videos {...rProps}/>}/>
                <ProtectedRoute
                token = {token}
                path="/admin"
                redirectTo="/adminAuth"
                component={Admin} />
                <ProtectedRoute
                token = {token}
                path="/media"
                redirectTo="/adminAuth"
                component={AddMedia} />
            </Switch>
        </div>
    )
}



export default App