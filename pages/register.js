
import { FormControl, Input, Button, Container, Box,
    useToast,
    HStack, VStack, Heading, Text, Image, Flex, SimpleGrid, GridItem, FormLabel, Grid, Center, Checkbox, Link, Img, FormErrorMessage } from "@chakra-ui/react";
import Layout from "../Layout/layout";
import axios from 'axios'
import {useRouter} from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";

import cookie from 'js-cookie'

const RegisterPage = () => {

    const toast = useToast()
    const router = useRouter()

    
    
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm(
        { mode: 'onChange' }
    )

    const [success,SetSuccess] = useState(false)
    
    useEffect(()=>{
        if(cookie.get('token')){
            router.push('/private')
        }
    })

    const SendToCall = async (data) => {
        const req = await axios.post('https://ecomm123-backend.herokuapp.com/api/auth/register',data)
        .then(response => response.data)
        SetSuccess(req.success)
    }
    useEffect(()=>{
        if(success){
            toast({
                title: "Registration successfull",
                status: 'success',
                isClosable: true,
              })     
             router.push('/private')
        }
    },[success,toast,router])
    


    

    function SubmitTheForm(data) {
        if(data){
            let obj = {
                name:data.fullname.split(' ')[0],
                lastname:data.fullname.split(' ')[1],
                email:data.email,
                username:data.username,
                password:data.password
            }
            SendToCall(obj)

        }
        

    }
    

    
    return (
        <Layout>
            <Box minW={'100vw'}>
                <Flex w="100%" flexDir={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        w="55%" minH={'100vh'}
                        bg="blackAlpha.900">

                        <Box
                            w="100%" maxH={'100vh'} overflow="hidden">
                            <Image

                                h="50%"
                                src="./reg.jpg" alt="ch" />
                        </Box>

                    </Box>
                    <Box
                        borderLeft={'2px'}
                        py={[0, 3, 5]}
                        w={['100%', '100%', '45%']} minH={'100vh'} bg="blackAlpha.900">
                        <VStack minHeight={'30vh'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                            <Text color={'white'} fontSize={['2xl', '3xl', '4xl']}>
                                Get Started Now
                            </Text>
                            <Text color={'white'}
                                fontSize={['sm', 'sm', 'sm']}
                                w={['70%', '50%', '60%']}>
                                It&apos;s time to join and gain access to the best of deals,
                                From the thousands of brands and products.
                            </Text>
                        </VStack>

                        <Box w="100%" h="100%">
                            <Flex w="100%" alignItems={'flex-start'} justifyContent={'center'}>
                                <form
                                    className="theForm"
                                    onSubmit={handleSubmit(SubmitTheForm)}>
                                    <FormControl
                                        w={['70%', '60%', '50%']}
                                    >
                                        <SimpleGrid
                                            columns={1}
                                            spacing={8}
                                            w="100%"
                                        >
                                            <GridItem colSpan={1}>

                                                <Input
                                                    id="fullname"
                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'} type="text"
                                                    placeholder="Full Name"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    {...register('fullname', {
                                                        required: 'This is required',
                                                        minLength: { value: 4, message: "Length should be greater than 4" },
                                                        maxLength: { value: 20, message: 'Length should be less than 20' },
                                                    })}
                                                />
                                                {
                                                    errors.fullname && errors.fullname.type === "required" ? (
                                                        <Box
                                                        position={'fixed'}
                                                            fontSize={'10px'}
                                                            py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.fullname.message}
                                                        </Box>
                                                    ) : (null)

                                                }
                                                {
                                                    errors.fullname && errors.fullname.type === "minLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.fullname.message}
                                                        </Box>
                                                    ) : (null)
                                                }
                                                {
                                                    errors.fullname && errors.fullname.type === "maxLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.fullname.message}
                                                        </Box>
                                                    ) : (null)
                                                }



                                            </GridItem>

                                            <GridItem colSpan={1}>

                                                <Input
                                                    id="username"

                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'} type="text"
                                                    placeholder="Username"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    {...register('username', {
                                                        required: 'This is required',
                                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                                        maxLength: { value: 20, message: 'Length should be less than 20' }
                                                    })}
                                                />
                                                {
                                                    errors.username && errors.username.type === "required" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.username.message}
                                                        </Box>
                                                    ) : (null)

                                                }
                                                {
                                                    errors.username && errors.username.type === "minLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.username.message}
                                                        </Box>
                                                    ) : (null)
                                                }
                                                {
                                                    errors.username && errors.username.type === "maxLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.username.message}
                                                        </Box>
                                                    ) : (null)
                                                }

                                            </GridItem>

                                            <GridItem colSpan={1}>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'}
                                                    placeholder="Email"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    {...register('email', {
                                                        required: 'This is required',
                                                        pattern: {
                                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                            message: 'Please provide a valid email'
                                                        }
                                                    })}
                                                />
                                                {
                                                    errors.email && errors.email.type === "required" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.email.message}
                                                        </Box>
                                                    ) : (null)

                                                }
                                                {
                                                    errors.email && errors.email.type === "pattern" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.email.message}
                                                        </Box>
                                                    ) : (null)

                                                }


                                            </GridItem>
                                            <GridItem colSpan={1}>

                                                <Input
                                                    id="password"
                                                    type="password"
                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'}
                                                    placeholder="Password"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    register={register('password')}
                                                    {...register('password', {
                                                        required: 'This is required',
                                                        minLength:{
                                                            value:4,
                                                            message:'Password must be greater than 4 characters'
                                                        },
                                                        maxLength:{
                                                            value:20,
                                                            message:'Password must be less than 20 characters' 
                                                        }
                                                    })}
                                                />
                                                {
                                                    errors.password && errors.password.type === "required" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.password.message}
                                                        </Box>
                                                    ) : (null)

                                                }
                                                 {
                                                    errors.password && errors.password.type === "minLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.password.message}
                                                        </Box>
                                                    ) : (null)
                                                }
                                                {
                                                    errors.password && errors.password.type === "maxLength" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.password.message}
                                                        </Box>
                                                    ) : (null)
                                                }

                                                

                                            </GridItem>

                                            <GridItem colSpan={1}>
                                                <Flex w="100%" flexDirection={'row'}
                                                    alignItems={'flex-start'}
                                                    justifyContent={'space-around'}>
                                                    <Checkbox
                                                        id="tnc"
                                                        py={1}
                                                        {...register('tnc', { required: 'This is required' })}
                                                    />
                                                   
                                                    <Text
                                                        px={3}
                                                        color={'white'}
                                                    >I agree to the website&apos;s
                                                        <Link
                                                            bgClip={'text'}
                                                            bgGradient={'linear(to-l, #7928CA, #FF0080)'}>
                                                            {' '} Privacy Policy {'&'} Terms and Conditions
                                                        </Link>
                                                    </Text>

                                                </Flex>
                                                {
                                                    errors.tnc && errors.tnc.type === "required" ? (
                                                        <Box
                                                        position={'fixed'}
                                                        fontSize={'10px'}
                                                        py={1}
                                                            maxH={'0px'}
                                                            color={'white'}>
                                                            {errors.tnc.message}
                                                        </Box>
                                                    ) : (null)

                                                }
                                            </GridItem>
                                            <GridItem colSpan={1}>

                                                <Button
                                                    w="100%"
                                                    type="submit"
                                                    _hover={{}}
                                                    bgGradient={'linear(to-l, #7928CA, #FF0080)'} color={'white'} fontWeight={500}>
                                                    Register
                                                </Button>

                                            </GridItem>

                                            <GridItem colSpan={1}>
                                                <Text color="white" w={'100%'}>
                                                    Already have an account?
                                                    <Link
                                                    href="https://ecommerce1234.vercel.app/login"
                                                        bgGradient={'linear(to-l, #7928CA, #FF0080)'} bgClip="text">
                                                        {' '} Log in
                                                    </Link>
                                                    {' '}here.
                                                </Text>
                                            </GridItem>

                                        </SimpleGrid>
                                    </FormControl>
                                </form>
                            </Flex>
                        </Box>

                    </Box>
                </Flex>
            </Box>
        </Layout>
    )
}

export default RegisterPage