import React, { useState, useEffect, useContext, Suspense, lazy } from 'react'
import { GlobalContext } from '../context/GlobalContext'

import DrawerCreateorEditUser from './DrawerCreateorEditUsers'
import SkeletonCardUser from './SkeletonCardUser'
import {
  SimpleGrid,
  Heading,
  HStack,

} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import axios from 'axios'
const CardUser = lazy(()=>import('./CardUser'))



export default function Users() {
  const context = useContext(GlobalContext)
  const [users, setUsers] = useState([{}])
  const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )

  const getUsers = () => {
    axios.get(context.urlUsers + '?' + context.apiKey)
      .then(
        response => {
          //console.log(response.data);
          setUsers(response.data);                      
        }
      )
  }
  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsers();
    }      
    fetchUsers();      
  }, [])
  


  return (
    <>
        <SimpleGrid columns={2} spacing={8} margin={2}>
        <Heading  paddingLeft={5} >
          Registered users
          <HStack>
            <CircleIcon />
            <CircleIcon boxSize={6} />
            <CircleIcon boxSize={8} color='blue.500' />
          </HStack>
        </Heading>

        <DrawerCreateorEditUser  users={users} setUsers={setUsers} 
                                 getUsers={getUsers} />

      </SimpleGrid>

      <SimpleGrid columns={[2, null, 3]} spacing='40px' key={888}>
        {users.map(user => ( 
          <Suspense key={(user.id)+2} fallback={<SkeletonCardUser/>}>    
            <CardUser key={user.id} id={user.id} name={user.name} 
                      email={user.email} gender={user.gender} 
                      status={user.status} />
          </Suspense>  
        ))}

      </SimpleGrid>
    </>
  );
}
