import React,{useState} from 'react'
import {
        Tag,
        Avatar,
        TagLabel,
        TagLeftIcon,
        Stack,
        Button,
        } from '@chakra-ui/react'
import { ChatIcon, CheckIcon } from "@chakra-ui/icons"


export default function Comment(props) {
    const[color,setColor] = useState('gray.200')
    const[fontColor,setFontColor] = useState('blue.500')
    const [variant,setVariant] = useState('ghost')
    function changeColor(){
        setColor('green')
        setFontColor('white')
        setVariant('solid')
    }
    return (
        <>
            <Tag ml={1} size='md' colorScheme='cyan' borderRadius='full'>
                <Avatar                    
                    size='xs'
                    name={props.name}
                    ml={-1}
                    mr={2}
                />
                <TagLabel>{props.name}</TagLabel>
            </Tag>
            <Tag size='md' ml={2} colorScheme='orange'>{props.email} </Tag>
            <Stack m={2}>
                <Tag size='lg' variant='subtle' colorScheme='gray'>
                    <TagLeftIcon boxSize='12px' as={ChatIcon} />
                    <TagLabel>{props.body}</TagLabel>
                    <Button rounded='full' variant={variant} color={fontColor} ml={'5'} colorScheme={color} onClick={()=>{changeColor()}}><CheckIcon /></Button>
                </Tag>
            </Stack>
        </>
    )
}