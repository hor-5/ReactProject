import React,{createContext, useState, useEffect} from 'react'
import axios from 'axios';

export const GlobalContext = createContext({})

export default function GlobalContextProvider({children}){
    const apiKey = 'access-token=72a5e88a16b479a5e5df3efbd989e85684fe9efd9787ee29768193c8c877ab93'
    const urlUsers = "https://gorest.co.in/public/v2/users"
    const urlComments = "https://gorest.co.in/public/v2/posts/"
    


    return(
        <GlobalContext.Provider value={{urlUsers,apiKey,urlComments}}>
            {children}
        </GlobalContext.Provider>
    )
    
}
