import React from 'react'
import Posts from './Posts'
import DrawerCreateorEditUser from './DrawerCreateorEditUsers'
import{
    Avatar,
    Box,
    Center,
    Text,
    Stack,    
    Badge,
    Heading,

} from '@chakra-ui/react'

export default function CardUser(props){
    return(
        
        <Center py={6} key={props.id}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={'white'}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar            
            size={'xl'}
            name={props.name}
            src={
              'https://unsplash.com/es/s/fotos/random'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'} >
            {props.name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {props.email}
          </Text>
          <Text
            textAlign={'center'}
            color='gray.700'
            px={3}>
            Gender: {props.gender}

          </Text>
          <Text
            textAlign={'center'}
            color='gray.700'
            px={3}>
            Status: {props.status}

          </Text>

          <Posts id={props.id} name={props.name} email={props.email}></Posts>


          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg='gray.50'
              fontWeight={'400'}>
              #{props.id}
            </Badge>
          </Stack>

          <Stack mt={8} direction={'row'} spacing={4}>

            <DrawerCreateorEditUser
              id={props.id}
              name={props.name}
              email={props.email}
              gender={props.gender}
              status={props.status}
              />

          </Stack>
        </Box>
      </Center>
    )
}