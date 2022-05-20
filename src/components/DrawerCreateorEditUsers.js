import React,{useContext} from 'react'
import {Button,
        Drawer,
        DrawerBody,
        DrawerFooter,
        DrawerHeader,
        DrawerOverlay,
        DrawerContent,
        DrawerCloseButton,
        useDisclosure,        
        Stack,     
        } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import {GlobalContext} from '../context/GlobalContext'
import FormUser from './FormUser'


export default function DrawerCreateorEditUser(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useContext(GlobalContext)

    function isEdit() {
      if (props.id) {
        return true
      }
      return false
    }
    function RenderButton() {
      if (props.id) {
        return <Button          
          onClick={onOpen}
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          _focus={{
            bg: 'gray.200',
          }}>
          Edit
        </Button>
      }
      return <Button
        leftIcon={<AddIcon />}
        colorScheme='blue'
        rounded={'full'}
        onClick={onOpen}
        >
        Create user
      </Button>
    }

    return (
      <>
      <RenderButton />             
        <Drawer
          isOpen={isOpen}
          placement='right'
          //initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              {isEdit() ? 'Edit User #'+ props.id : 'Create a new user'}
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing='24px'>
                <FormUser id={props.id} name={props.name} 
                          email={props.email} gender={props.gender}
                          status={props.status} isEdit={isEdit()}
                          />
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Close
              </Button>              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>      
      </>
    )
  }