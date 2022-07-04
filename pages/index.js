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
  DrawerCloseButton,useDisclosure,
    SimpleGrid, GridItem, Input, FormControl, Link, IconButton, Stack, Logo, ButtonGroup
} from "@chakra-ui/react";
import Layout from "../Layout/layout";
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'
import ReactStars from 'react-stars'
import cookie from 'js-cookie'

const IndexPage = ({ products }) => {

    let AllProducts = products.product
    const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('right')
    console.log("Hello")

    return (
        <Layout>
            <VStack w="100%" overflowX={'hidden'} h="200vh">
                <Box

                    w="100%" h="10vh">
                    <Flex w="100%" h="100%" flexDirection={'row'} alignItems={'flex-start'}>

                        <Box w={["70%","60%","70%"]} h="100%">
                            <Heading w={["50%","30%","20%"]} h="100%" px={5} py={2} fontWeight={500}>
                                Durian
                            </Heading>
                        </Box>

                        <Box 
                        display={{base:'none',md:'block'}}
                        w={["30%","40%","30%"]} h="100%">
                            <Flex w="100%" h="100%" flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Link href={'/products/'}>Products</Link>
                                <Link href={'/products/cart'}>Cart</Link>
                                <Link href={'/wishlist'}>Wishlist</Link>
                                <Link href={'/login'} onClick={()=>{cookie.remove('token')}}>Logout</Link>
                            </Flex>
                        </Box>

                        <Box 
                        
                        py={5}
                        display={{base:'block',md:'none'}}
                        w={["30%","40%","30%"]}>
                            <Flex
                            w="85%" h="100%"
                            flexDirection={'row'}
                            alignItems={'centers'}
                            justifyContent={'flex-end'}
                            >
                            <IconButton
                            onClick={onOpen}
                icon={<HamburgerIcon />}
                color={'black'}
                background={'white'}
                _active={{ background: 'white' }}
                _hover={{ background: 'white' }}
              />
                            </Flex>
                            
                        </Box>

                    </Flex>
                </Box>

                <Box
                display={{base:'none',md:'block'}}
                w="100vw" h={['10vh', '30vh', '70vh']}>
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <Image src='./banner4.webp' alt='Dan Abramov' />
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <Image src='./banner3.jpg' alt='Dan Abramov' />
                        </div>

                    </Carousel>
                </Box>
               

      <Drawer
      size={'xs'}
      display={{base:'none',md:'block'}}
      placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Contents</DrawerHeader>
          <DrawerBody>
            <VStack
            spacing ={10}
            w="100%" alignItems={'flex-start'}>
            <Link href={'/products/'}>Products</Link>
                                <Link href={'/products/cart'}>Cart</Link>
                                <Link href={'/wishlist'}>Wishlist</Link>
                                <Link href={'/login'} onClick={()=>{cookie.remove('token')}}>Logout</Link>
           
            </VStack>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
                



                <Box  w="100%" h="100vh">
                    <VStack w="100%" h="100%" alignItems={'flex-start'}>
                        <Box display={{base:'none',md:'block'}} w="100%" h="5vh">
                            <Text
                                fontWeight={500}
                                px={5} py={5}>
                                Some of our top brands!
                            </Text>

                        </Box>
                        <Box py={10} w="100%" h="95vh">
                            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} w="100%" h="100%">
                                <Box h="100%">
                                    <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'} flexWrap={'wrap'}>
                                        {
                                            AllProducts && AllProducts.length > 0 ? (
                                                AllProducts?.map((item, i) => (
                                                    <Box py={5} key={i} w={['100%','100%','50%']} h={['80vh','60vh','50vh']}>
                                                        <Flex justifyContent={'center'} w="100%" h="100%" >
                                                            <Box w={['100%','80%','80%']} h="100%" >
                                                                <Flex flexDirection={{base:'column',md:'row'}} w="100%" alignItems={{base:'center'}} h="100%">
                                                                    <Box w={{base:'80%',md:'50%'}} h="100%">
                                                                        <Image
                                                                            w="100%"
                                                                            h="100%"
                                                                            src={item.img} alt={item.title} />
                                                                    </Box>
                                                                    <Box px={5} w={{base:'80%',md:'50%'}} h="100%">
                                                                        <VStack w="100%" h="100%" spacing={5}>
                                                                            <HStack w="100%" h="10%">
                                                                                <Box>
                                                                                    <Heading
                                                                                        noOfLines={1}
                                                                                        fontWeight={700}
                                                                                        size={'md'}
                                                                                    >{item.title}</Heading>
                                                                                </Box>

                                                                                <Box h="10%">
                                                                                    <ReactStars
                                                                                        count={1}
                                                                                        value={1}
                                                                                        size={24}
                                                                                        edit={false}
                                                                                        color2={'#ffd700'} />
                                                                                </Box>
                                                                            </HStack>
                                                                            <Box w="100%" h="5%" px={1}>
                                                                                <Heading size={'sm'} fontWeight={400}>
                                                                                    by: {item.brand}
                                                                                </Heading>
                                                                            </Box>


                                                                            <Box w="100%" minH="max-content">
                                                                                <Text fontSize={'10px'}>
                                                                                    {item.description}
                                                                                </Text>
                                                                            </Box>
                                                                            
                                                                            <HStack w="100%" h="5%">
                                                                                <Link color={'black.100'} href={`/products/${item.productId}`}>
                                                                                Check out
                                                                                </Link>
                                                                            </HStack>
                                                                        </VStack>
                                                                    </Box>
                                                                </Flex>
                                                            </Box>
                                                        </Flex>
                                                    </Box>
                                                ))
                                            ) : (null)

                                        }
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </VStack>
                </Box>



            </VStack>


            
        </Layout>
    )


}
export async function getServerSideProps(context) {
    const data = await axios.get("https://ecomm123-backend.herokuapp.com/api/show/getAllItems")
        .then(response => response.data)
    return {
        props: {
            products: data
        }
    }
}


export default IndexPage;