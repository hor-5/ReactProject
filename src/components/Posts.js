import React, { useContext, useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,   
    Heading,
    Box,  

} from '@chakra-ui/react'
import { AtSignIcon, AddIcon } from '@chakra-ui/icons'
import { GlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import CardPost from './CardPost'
import ModalAddPost from './ModalAddPost'



export default function Posts(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useContext(GlobalContext)
    const [posts, setPosts] = useState([])
    const url =  context.urlUsers + '/' + props.id + '/posts?'
    const getPosts = () => {
        axios.get( url + context.apiKey)
            .then(
                response => {
                    //console.log(response.data);
                    setPosts(response.data);
                }
            )
    }


    useEffect(() => {
        async function fetchPosts() {
            const response = await getPosts();
        }
        fetchPosts();
    }, [])

    return (
        <>

            <Button
                onClick={onOpen}
                m={4}
                color={'blue.500'}
            > POSTS </Button>


            <Modal onClose={onClose} size='full' isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading color="Teal.500">POSTS</Heading>
                        user <AtSignIcon /> {props.name} ID #{props.id}                        
                    </ModalHeader>
                    <ModalCloseButton />                    
                    <ModalBody>
                        <Box margin={2} >
{/* modal for create POSTS */} <ModalAddPost posts={posts} setPosts={setPosts}
                                             getPosts={getPosts} url={url} /> 
                        </Box>
                        {
                            posts.length == 0?
                            <Box margin={5}><h6> THIS USER HAVE NO POSTS YET !</h6></Box>
                            :
                            (
                                posts.map(post => (
                                    <CardPost id_post={post.id} title={post.title} body={post.body}/>            
                                ))  
                            )
                        }                        

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}