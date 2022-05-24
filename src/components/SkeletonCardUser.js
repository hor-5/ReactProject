import React from 'react'
import { Box, SkeletonCircle, SkeletonText, Center } from '@chakra-ui/react'

export default function SkeletonCardUser() {
    return (
        <Box padding='6' boxShadow='lg' bg='white'>
            <Center>
                <SkeletonCircle size='10' />
            </Center>
            <SkeletonText mt='4' noOfLines={4} spacing='4' />

        </Box>
    )
}