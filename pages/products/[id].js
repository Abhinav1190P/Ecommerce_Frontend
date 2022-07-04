import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box, Container, VStack, Flex, HStack, useToast, IconButton, Text, Heading, Image, Icon, Button } from '@chakra-ui/react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShare2 } from 'react-icons/fi'
import { ChevronLeftIcon, StarIcon } from '@chakra-ui/icons'
import { BiCommentDetail } from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import ReactStars from 'react-stars'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

function OneProduct({ product }) {
  const router = useRouter()
  
  const [size,SetSize] = useState('MD')
  const [Like,SetLike] = useState(null)
  const [success,SetSuccess] = useState(false)
  const toast = useToast()
  
const {id} = router.query


  const SendToCall = async (data) => {
    const req = await axios.post('https://ecomm123-backend.herokuapp.com/api/cart/add-item',data,{
      headers:{
        "Content-type": "Application/json",
        "Authorization": `Bearer ${cookie.get('token')}`
    }
    })
    .then(response => response.data)
    
      SetSuccess(req.success)
  
  }

  useEffect(()=>{
    if(success){
      toast({
          title: "Item added to cart",
          status: 'success',
          isClosable: true,
        })     
  }
  },[success,toast])
  

  const AddToCart = () =>{
    let obj={
      title: product.item.title,
      description:product.item.description,
      price:product.item.price,
      img:product.item.img,
      size:size,
      quantity:1,
      brand:product.item.brand
    }
    SendToCall(obj)
  }



  const CallLikeFunction = async () => {

    if(Like == true){
      
      const UnLikeProduct = async () => {
        const liked = await axios.post(`https://ecomm123-backend.herokuapp.com/api/wish/unlike-product/${id}`,{},{
          headers:{
            "Content-type": "Application/json",
            "Authorization": `Bearer ${cookie.get('token')}`
        }
        }).then(response => response.data)
        if(liked){
          SetLike(false)
        }
      }
      UnLikeProduct()

    }

    else if(Like == false){
      const LikeProduct = async () =>{
        const liked = await axios.post(`https://ecomm123-backend.herokuapp.com/api/wish/like-product/${id}`,product.item,{
          headers:{
            "Content-type": "Application/json",
            "Authorization": `Bearer ${cookie.get('token')}`
        }
        }).then(response => response.data)
        if(liked){
          SetLike(true)
        }
      }
      LikeProduct()
    }
   
  }

  
  
  

  useEffect(()=>{
    const CheckLiked = async () => {
      const {isLiked} = await axios.get(`https://ecomm123-backend.herokuapp.com/api/wish/check-like/${id}`,{
        headers:{
          "Content-type": "Application/json",
          "Authorization": `Bearer ${cookie.get('token')}`
      }
      }).then(response => response.data)
      SetLike(isLiked)
    }
    CheckLiked()
  },[id])

  return (
    <VStack
      minW={'100vw'}
      h={'100vh'}
      alignItems={'center'}
      justifyContent={'flex-start'}
    >
      <Box w="80%" h="20%">
        <HStack
          alignItems={'flex-end'}
          w="100%" h="50%">
          <Box
            w="10%"
            h="100%"
          >
            <Flex w="100%" h="100%" alignItems={'center'} justifyContent={'flex-start'}>
              <IconButton
              onClick={()=>{router.push('/products/')}}
                size={"md"}
                border={'1px'}
                background={'transparent'}
                icon={<ChevronLeftIcon />}
              />
            </Flex>
          </Box>

          <Box w="90%" h="100%">
            <Flex
              alignItems={'center'}
              justifyContent={'flex-start'}
              w="100%" h="100%">
              <Text
                px={5}
                noOfLines={1}
                fontSize={['2xl','3xl','5xl']}
              >
                {product.item.title}
              </Text>
            </Flex>
          </Box>
        </HStack>

        <HStack w="100%"
         h="50%"
          justifyContent={'center'}>
          <Box
            w="75%" h="100%">
            <HStack
              spacing={0}
              w="100%" h="100%" alignItems={'center'} justifyContent={'flex-start'}>
              <Box w={["50%",'40%',"15%"]} h="100%">
                <Heading
                  fontSize={'xl'}
                  fontWeight={200}
                  py={2}
                >
                  by {product.item.brand}
                </Heading>
              </Box>

              

              <Box w={["50%",'60%',"15%"]} h="100%" p={0}>
                  <ReactStars
                    count={5}
                    value={product.item.rating}
                    size={24}
                    edit={false}
                    color2={'#ffd700'} />
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Box>


      <Box w={['100%','90%','80%']} h={['100%','80%','60%']} >
        <Flex
        flexDirection={{base:'column',md:'row'}}
        w="100%" h="100%" alignItems={'flex-start'} justifyContent={'center'}>
          <Box w={["100%",'100%','50%']} h="100%">
            <Flex w="100%" h="100%" alignItems={'center'} justifyContent={'center'}>
              <Box

                w="55%" h="100%">
                <Image
                  w="100%"
                  h="100%"
                  src={product.item.img}
                  alt={product.item.title}
                />
              </Box>
            </Flex>
          </Box>

          <Box  w={["100%",'100%','50%']} h="100%">
            <Flex w="100%"
              flexDirection={'column'}
              alignItems={'center'}
              h="100%">
              <Box py={7} w="80%" h={["80%","70%","40%"]}>
                <Text noOfLines={[5,3,3]}>
                  {product.item.description}
                </Text>
              </Box>
              <Box w="80%" h={["20%","30%","40%"]}>
                <Flex w="100%" h="100%" alignItems={'flex-start'}>
                  <Box w="100%" h="20%">
                    <HStack
                      spacing={6}
                      w="100%" h="100%">
                        {
                          Like ? (
                            <Icon
                            onClick={()=>CallLikeFunction()}
                            cursor={'pointer'}
                            w={8}
                            h={8}
                            as={FcLike} />
                          ):(
                            <Icon
                            onClick={()=>CallLikeFunction()}
                            cursor={'pointer'}
                            w={8}
                            h={8}
                            as={AiOutlineHeart} />
                          )
                        }
                     

                      <Icon
                        w={8}
                        h={8}
                        as={FiShare2}
                      />
                    </HStack>

                  </Box>
                </Flex>
              </Box>
              <Box w="80%" h="20%">
                <HStack w="100%" spacing={5}>
                  <Button
                  color="white"
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    fontWeight={500}
                    _hover={{}}
                  >Buy now</Button>

                  <Button
                    borderRadius={'5px'}
                    background={'transparent'}
                    onClick={()=>{AddToCart()}}
                    border={'1px'}
                    _hover={{}}
                    _active={{ background: 'blackAlpha.500', color: 'white' }}
                  >Add to cart</Button>


                  <Button
                  borderRadius={'5px'}
                  background={'transparent'}
                  onClick={()=>{router.push(`https://ecommerce1234.vercel.app/reviews/${product.item._id}`)}}
                  border={'1px'}
                  _hover={{}}
                  _active={{ background: 'blackAlpha.500', color: 'white' }}
                  >
                    Reviews
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </Box>

        </Flex>
      </Box>

      <Box w={["100%","90%","80%"]} h="20%">
        <Flex w="100%" h="70%" justifyContent={'flex-end'}>
          <Box
            w="90%" h="full">
            <HStack w="100%" h="100%">

              <HStack spacing={5} w="48%" h="100%">
                <Box>
                  <Text px={3}>
                    Size
                  </Text>
                </Box>
                {product.item.sizes?.map((item, i) => (
                  <Text key={i}>
                    <Button
                      onClick={()=>{SetSize(item)}}
                      _hover={{ background: 'whiteAlpha.200' }}
                      size={'sm'} background={'transparent'} border={'1px'}>
                      {item}
                    </Button>
                  </Text>
                ))}
              </HStack>
            </HStack>
          </Box>
        </Flex>
      </Box>
      
    </VStack>
  )
}



export async function getServerSideProps(context) {
  const request = await axios.get(`https://ecomm123-backend.herokuapp.com/api/prod/get-one-item/${context.params.id}`)
    .then(response => response.data)

  return {
    props: {
      product: request,
    }
  }
}


export default OneProduct



