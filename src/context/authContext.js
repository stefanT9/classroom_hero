import React from 'react'

const authContext = React.createContext({
    userDetails:{
        isAuth:undefined,
        email:undefined,
        username:undefined,
        token:undefined,
        userId:undefined,
    }
}) 


export default authContext