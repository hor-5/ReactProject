import React,{createContext, useState, useEffect} from 'react'
import axios from 'axios';

export const GlobalContext = createContext({})

export default function GlobalContextProvider({children}){
    const apiKey = 'access-token=72a5e88a16b479a5e5df3efbd989e85684fe9efd9787ee29768193c8c877ab93'
    const urlUsers = "https://gorest.co.in/public/v2/users"
    const urlComments = "https://gorest.co.in/public/v2/posts/"
    const [users, setUsers] = useState([{}])
    
    

    const getUsers = () => {
      axios.get(urlUsers + '?' + apiKey)
        .then(
          response => {
            //console.log(response.data);
            setUsers(response.data);                      
          }
        )
    }

    const createUser = (user) => {
        axios.post(urlUsers + '?'
                   +'name=' + user.name
                   +'&email=' + user.email
                   +'&gender=' + user.gender
                   +'&status=' + user.status
                   +'&' + apiKey)
            .then(
             
            response => {                
                //console.log(response.data);                                                          
                setUsers(oldUsers=>[...oldUsers, response.data]);                         
                              
            }
            )
        }

    const updateUser =(user)=>{
        axios.patch(urlUsers + '/' + user.pk+ '?'
                +'name=' + user.name
                +'&email=' + user.email
                +'&gender=' + user.gender
                +'&status=' + user.status        
                +'&' + apiKey)

        .then(
            response => {
                //console.log(response.data);
                setUsers(oldUsers=>[...oldUsers, response.data]);                
            }
        )
    }  
        
    useEffect(() => {
      async function fetchUsers() {
        const response = await getUsers();
      }      
      fetchUsers();      
    }, [])
    
    return(
        <GlobalContext.Provider value={{users,setUsers,urlUsers,apiKey, createUser, updateUser,urlComments}}>
            {children}
        </GlobalContext.Provider>
    )
}
