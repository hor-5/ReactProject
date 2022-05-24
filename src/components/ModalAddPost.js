
import React,{useRef} from 'react'
import { 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,    
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import FormPost from './FormPost'



export default function ModalAddPost(props) {   

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
    const finalRef = useRef()
   


    return (
      <>
      <Button leftIcon={<AddIcon/>} onClick={onOpen}>Create Post</Button>
      
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new POST</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormPost url={props.url} posts={props.posts} 
              setPosts={props.setPosts} getPosts={props.getPosts} onClose={onClose}
              />

            </ModalBody>

            
          </ModalContent>
        </Modal>
      
      </>
    );
  }