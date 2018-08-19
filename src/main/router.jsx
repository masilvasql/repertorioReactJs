import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import MenuPrincipal from '../menuPrincipal/MenuPrincipal'
import Login from '../login/login'
import NovaMusica from '../novaMusica/NovaMusica'

export default props =>(
    <Router history={hashHistory}>
        <Route path='/Login' component={Login}/>
        <Route path='/MenuPrincipal' component={MenuPrincipal}/>
        <Route path ='/NovaMusica' component={NovaMusica}/>
        <Redirect from="*" to="/Login"/>
    </Router>
)