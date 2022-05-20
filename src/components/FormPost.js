import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    HStack,
    useToast,
        } from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'


export default function FormPost(props) {
    const context = useContext(GlobalContext)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const toast = useToast()
    const showToast = ()=>{
         toast({
           title: 'Post Created.',
           description: 'Posting Successfull !!',
           status: 'success',
           duration: 2000,
           isClosable: true,
         })}

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                showToast()
                createPosts(values)
                resolve()
            }, 3000)
        })
    } 
    const createPosts = (data) => {
      axios.post(props.url                 
                 +'title=' + data.title                 
                 +'&body=' + data.body                   
                 +'&' + context.apiKey)                
          .then(             
          response => {                
              console.log(response.data);                                                          
              props.setPosts(oldPosts=>[...oldPosts, response.data]);                        
                            
          }
          )
      }

    return (
        <HStack spacing='50px' w={'full'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.title}>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input
                        size='md'
                        id='title'
                        placeholder='Insert the title here'                        
                        {...register('title', {
                            required: 'Title is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.body} >
                    <FormLabel htmlFor='body'>Comment</FormLabel>
                    <Input
                        size='md'
                        id='body'
                        placeholder='Free your creativity... :D'
                        {...register('body', {
                            required: 'Cant create an empty post',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.body && errors.body.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='green'
                    isLoading={isSubmitting} type='submit'
                    >
                    Confirm
                </Button>
                <Button mt={4} ml={2}
                    onClick={props.onClose}
                    >
                    Cancel
                </Button>
            </form>
        </HStack>
    )
}
