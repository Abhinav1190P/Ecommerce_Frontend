
import { FormControl, Input, Button, Container, Box, HStack, useToast,VStack, Heading, Text, Image, Flex, SimpleGrid, GridItem, FormLabel, Grid, Center, Checkbox, Link, Img } from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import cookie from 'js-cookie'
import Layout from "../Layout/layout";

const LoginPage = () => {
    const toast = useToast()
    const [success,SetSuccess] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm(
        { mode: 'onChange' }
    )

    useEffect(() => {
        if (cookie.get('token')) {
            Router.router.push('/products')
        }
    }, [])

    const SubmitTheForm = (data) => {
        
        if (data) {
            let obj = {
                username:data.username,
                password:data.password
            }
            SendToCall(obj)
        }
    }

    const SendToCall = async (data) =>{
        const req = await axios.post('https://ecomm123-backend.herokuapp.com/api/auth/login',data)
        .then(response => response.data)
        SetSuccess(req.success)
        
        cookie.set('token',req.token)
        
        Router.router.push('/products')
    } 

    useEffect(()=>{
        if(success){
            toast({
                title: "Login successfull",
                status: 'success',
                isClosable: true,
              })     
        }
    },[success,toast])

    return (
        <Layout>
            <Box minW={'100vw'}>
                <Flex w="100%" flexDir={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>

                    <Box
                        borderLeft={'2px'}
                        py={[0, 3, 10]}
                        w={['100%', '100%', '45%']} minH={'100vh'} bg="blackAlpha.900">
                        <VStack minHeight={'30vh'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                            <Text color={'white'} fontSize={['2xl', '3xl', '4xl']}>
                                Durian
                            </Text>
                            <Text color={'white'}
                                fontSize={['sm', 'sm', 'sm']}
                                textAlign={'center'}
                                w={['70%', '50%', '60%']}>
                                A place where you be swaggin
                            </Text>
                        </VStack>

                        <Box w="100%" h="100%"

                        >
                            <Flex w="100%" alignItems={'flex-start'} justifyContent={'center'}>
                                <form className="theForm"
                                    onSubmit={handleSubmit(SubmitTheForm)}
                                >
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
                                                    id="username"
                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'} type="text"
                                                    placeholder="Username"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    {...register("username", {
                                                        required: "This field is required"
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

                                            </GridItem>


                                            <GridItem colSpan={1}>

                                                <Input
                                                    id="password"
                                                    type="password"
                                                    _focus={{ borderColor: 'white' }}
                                                    color={'white'}
                                                    placeholder="Password"
                                                    _placeholder={{ color: 'white', opacity: .5 }}
                                                    {...register("password", {
                                                        required: "This field is required"
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

                                            </GridItem>


                                            <GridItem colSpan={1}>

                                                <Button
                                                type="submit"
                                                    w="100%"
                                                    _hover={{}}
                                                    bgGradient={'linear(to-l, #7928CA, #FF0080)'} color={'white'} fontWeight={500}>
                                                    Login
                                                </Button>

                                            </GridItem>

                                            <GridItem colSpan={1}>
                                                <Text color="white" w={'100%'}>
                                                    Don&apos;t have an account?
                                                    <Link
                                                    href="https://ecommerce123.vercel.app/register"
                                                        bgGradient={'linear(to-l, #7928CA, #FF0080)'} bgClip="text">
                                                        {' '} Register
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
                </Flex>
            </Box>
        </Layout>

    )
}

export default LoginPage