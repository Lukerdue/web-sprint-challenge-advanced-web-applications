import React from 'react'
import { useHistory } from 'react-router-dom'

function PrivateRoute ({ component: Component}){
    const history =  useHistory()

    if(window.localStorage.getItem('token')){
        return(<Component/>)
    }
    else{
        history.push('/')
    }
}
export default PrivateRoute







//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in