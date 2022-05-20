import React, { useState, useEffect, useContext } from "react"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerContent,
    Button,
    useDisclosure,
    Box,
    DrawerOverlay,
    DrawerFooter,
    Divider,
    Text,
    Center,
} from '@chakra-ui/react'
import FormComment from './FormComment'
import { GlobalContext } from "../context/GlobalContext"
import axios from 'axios'
import Comment from './Comment'
import { CloseIcon } from '@chakra-ui/icons'


export default function DrawerComment(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useContext(GlobalContext)
    const [comments, setComments] = useState([])

    const getComments = () => {
        axios.get(context.urlComments + props.id_post + '/comments?' + context.apiKey)
            .then(
                response => {
                    //console.log(response.data);
                    setComments(response.data);
                }
            )
    }


    useEffect(() => {
        async function fetchComments() {
            const response = await getComments();
        }
        fetchComments();
    }, [])


    return (
        <>

            <Button colorScheme='green' onClick={onOpen}>
                View comments
            </Button>
            <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Comments</DrawerHeader>
                    <DrawerBody>
                        {
                            comments.length == 0 ?
                                <Box margin={5}><h6> No comments yet!</h6></Box>
                                :
                                (
                                    comments.map(comment => (
                                        <Comment name={comment.name} email={comment.email} body={comment.body} />
                                    ))
                                )
                        }
                        <Divider mt={5} />
                        <Center mt={5} >     
                        <Text>Add your Comment</Text>                       
                            <Divider orientation='vertical' />
                            <FormComment  w='300px' id_post={props.id_post} comments={comments}
                            setComments={setComments} getComments={getComments} />
                        </Center>

                        
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' rounded='full' mr={3} onClick={onClose}>
                            <CloseIcon />
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}