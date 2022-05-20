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
import { ChatIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext'

export default function FormComment(props) {
    const context = useContext(GlobalContext)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const toast = useToast()
    const showToast = ()=>{
         toast({
           title: 'Comment completed.',
           description: 'Thanks for your participation!!',
           status: 'success',
           duration: 2000,
           isClosable: true,
         })}

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                showToast()
                createComment(values)
                resolve()
            }, 3000)
        })
    }    

    const createComment = (data) => {
        axios.post(context.urlComments + props.id_post 
                   +'/comments'+ '?'
                   +'name=' + data.name
                   +'&email=' + data.email
                   +'&body=' + data.body                   
                   +'&' + context.apiKey)
            .then(             
            response => {                
                console.log(response.data);                                                          
                props.setComments(oldComments=>[...oldComments, response.data]);                        
                              
            }
            )
        }

    return (
        <HStack spacing='50px' w={'full'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>First name</FormLabel>
                    <Input
                        id='name'
                        placeholder='Tip your name here'                        
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        type='email'
                        placeholder='johndoe@gmail.com'                        
                        {...register('email', {
                            required: 'Email is required'
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.body} >
                    <FormLabel htmlFor='body'>Comment</FormLabel>
                    <Input
                        id='body'
                        placeholder='Great post! ...'
                        {...register('body', {
                            required: 'Cant send an empty comment',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.body && errors.body.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='green'
                    isLoading={isSubmitting} type='submit'
                    variant='outline' leftIcon={<ChatIcon />}>
                    Send
                </Button>
            </form>
        </HStack>
    )
}


