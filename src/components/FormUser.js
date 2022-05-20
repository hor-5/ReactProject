import { useForm } from 'react-hook-form'
import React, { useContext } from 'react'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
    useToast,    
} from '@chakra-ui/react'
import { GlobalContext } from '../context/GlobalContext'


export default function FormUser(props) {
    const context = useContext(GlobalContext);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    
        const toast = useToast()
         const showToast = ()=>{
              toast({
                title: 'Operation completed.',
                description: props.isEdit? 'User updated.' : 'User created.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })}

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {                
                showToast();
                resolve();                
                props.isEdit?context.updateUser(values) : context.createUser(values);          
            }, 3000)
        })
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {props.isEdit && 
            <FormControl isInvalid={errors.pk}>
                <FormLabel htmlFor='pk'>ID</FormLabel>
                <Input id='pk'  
                     name='pk' 
                     value={props.id}
                     readOnly
                     {...register('pk', {
                        required: 'ID is required'                        
                    })}
                     />
            </FormControl>
            }
            <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor='name'>First name</FormLabel>
                <Input
                    id='name'
                    placeholder='Tip your name here'
                    defaultValue={props.name}
                    {...register('name', {
                        required: 'Name is required',
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                    id='email'
                    type='email'
                    placeholder='johndoe@gmail.com'
                    defaultValue={props.email}
                    {...register('email', {
                        required: 'Email is required'                        
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.gender}>
                <FormLabel htmlFor='gender'>Gender</FormLabel>
                <Select id='gender' name='gender' defaultValue={props.gender}
                    {...register('gender', {
                        required: 'Gender is required'
                    })}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>                    
                </Select>
                <FormErrorMessage>
                    {errors.gender && errors.gender.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.status}>
                <FormLabel htmlFor='status'>Status</FormLabel>
                <Select id='status' name='status' defaultValue={props.status}
                    {...register('status', {
                        required: 'Status is required'
                    })}>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                </Select>
                <FormErrorMessage>
                    {errors.status && errors.status.message}
                </FormErrorMessage>
            </FormControl>
            
                <Button mt={4} colorScheme='blue'
                    isLoading={isSubmitting} type='submit'
                    rounded={'full'}
                >
                    Submit
                </Button>
            
        </form>
    )
}