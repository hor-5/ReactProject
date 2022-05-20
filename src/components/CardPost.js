import {
    Stack,
    Text,
} from '@chakra-ui/react'
import DrawerComment from './DrawerComment';


export default function CardPost(props) {
    return (
      <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{props.title}     #{props.id_post}</Text>
        </Stack>
  
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between">
          <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
            {props.body}
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <DrawerComment id_post={props.id_post}/>
          </Stack>
        </Stack>
      </Stack>
    );
  }