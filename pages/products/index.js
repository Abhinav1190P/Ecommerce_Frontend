import React, { useEffect, useState } from 'react'
import {
  Container, Flex, HStack, Box,
  useMediaQuery,
  VStack, Heading, Text, Image, Divider, Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  RadioGroup,
  Radio,
  DrawerCloseButton, useDisclosure,
  SimpleGrid, GridItem, Input, FormControl, Link, IconButton, Stack, Logo, ButtonGroup
} from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

import axios from 'axios'

export default function Products() {

  const [data, setData] = useState([])
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('right')
  useEffect(() => {
    GetAllProducts()
  }, [])

  const GetAllProducts = async () => {
    let products = await axios.get("https://ecomm123-backend.herokuapp.com/api/prod/getproducts")
    let got = products.data

    setData(got.product)
  }






  return (
    <Container
      bg="white"
      maxW={'100vw'} p={0}>
      <HStack
        flexDirection={{ base: 'column', md: 'row' }}
        w="100%" h="100vh">


        <Box w={["100%", "100%", "15%"]} h={["10%", "20%", "100%"]}>
          <VStack
            flexDirection={{ base: "row", md: "column" }}
            w="100%" h="100%">

            <Box
              w="100%" h={["100%", "100%", "15%"]}>
              <Heading
                size={'2xl'}
                p={[3, 5, 8]}
                color={'black'}
                fontWeight={600}
              >
                Durian
              </Heading>
            </Box>

            <Box
              display={{ base: "none", md: "block" }}
              w={["80%", "80%", "100%"]} h={["100%", "100%", "85%"]}>
              <VStack
                px={8}
                py={2}
                spacing={10}
                flexDirection={{ base: 'row', md: 'column' }}
                w="100%" h="100%" alignItems={'flex-start'}>
                <Link
                  href={'/products/cart'}
                  color={'black'}
                >Cart</Link>

                <Link
                  color={'black'}
                  href={'/wishlist'}
                >Wishlist</Link>

                <Link href={'/login'} onClick={() => { cookie.remove('token') }}>Logout</Link>
              </VStack>

            </Box>


            <Box w={["20%", "20%", "100%"]}
              p={[3, 5, 8]}
              display={{ base: "block", md: "none" }}
              minH={"100%"}
              overflow={'scroll'}
            >
              <IconButton
                onClick={onOpen}
                icon={<HamburgerIcon />}
                color={'black'}
                background={'white'}
                _active={{ background: 'white' }}
                _hover={{ background: 'white' }}
              />
            </Box>
          </VStack>
        </Box>
        <Drawer
          size={'xs'}
          display={{ base: 'none', md: 'block' }}
          placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Contents</DrawerHeader>
            <DrawerBody>
              <VStack
                spacing={10}
                w="100%" alignItems={'flex-start'}>
                <Link href={'/'}>Home</Link>
                <Link href={'/products/cart'}>Cart</Link>
                <Link href={'/wishlist'}>Wishlist</Link>
                <Link href={'/login'} onClick={() => { cookie.remove('token') }}>Logout</Link>

              </VStack>

            </DrawerBody>
          </DrawerContent>
        </Drawer>


        <Box w="100%" h="100%">

          <Box w="100%" h="10%">
            <Flex
              w="100%" h="100%" alignItems={'flex-end'} justifyContent={'flex-end'}>
              <Box
                w={["60%", "40%", "20%"]} h="100%">
                <HStack w="90%" h="100%">

                  <Input
                    size={'sm'}
                    type="text" placeholder="Search" />

                  <IconButton
                    size={'sm'}
                    icon={<Search2Icon />}
                  />
                </HStack>
              </Box>

            </Flex>
          </Box>


          <Flex w="100%" h="90%"
            flexDirection={'row'}
            flexFlow={'wrap'}
            alignItems={'center'} flexWrap={'wrap'}>
            {
              data?.map((item, i) => {
                return (
                  <Link
                  key={i}
                    href={`/products/${item._id}`}
                    w={["100%", "75%", "25%"]} h="45%">
                    <Box
                      cursor={'pointer'}
                      borderRadius={2}

                      key={i}
                      w="100%" h="100%">
                      <Flex w="100%" h="100%" alignItems={'center'} justifyContent={'center'}>
                        <Box w="55%" h="90%" >
                          <Flex w="100%" h="100%" flexDirection={'column'}>
                            <Box w="100%" h="80%">
                              <Image
                                w="full"
                                h="full"
                                src={item.img}
                                alt={item.title}
                              />
                            </Box>
                            <Box
                              px={2}
                              bg={'white'}
                              w="100%" h="30%">
                              <Flex w="100%" h="100%" flexDirection={'column'}>
                                <Heading
                                  fontSize={'lg'}
                                  noOfLines={1}
                                >{item.title}
                                </Heading>
                                <Text
                                  marginTop={2}
                                >
                                  Rs. {item.price}
                                </Text>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                )
              })
            }
          </Flex>
        </Box>
      </HStack>
    </Container>
  )
}
