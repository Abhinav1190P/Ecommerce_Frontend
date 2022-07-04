import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { Container, Flex, Box, Text, VStack, HStack, Heading, Select, IconButton, Image, Link, useToast } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import { AiFillDelete } from 'react-icons/ai'
import {FaFileSignature} from 'react-icons/fa'
export default function Wishlist() {

    const router = useRouter()
    const [deleteSuccess, setDeleteSuccess] = useState(null)
    const toast = useToast()
    const [Wishitems,setWishItems] = useState([])
    const otherSizes = ["SM", "MD", "LG", "XL"]
    useEffect(()=>{
        const GetAllItems = async ()=>{
            const wishlist = await axios.get('https://ecomm123-backend.herokuapp.com/api/wish/get-favourite-items',{
                headers:{
                    "Content-type": "Application/json",
                "Authorization": `Bearer ${cookie.get('token')}`
                }
            }).then(response=>response.data)
            if(wishlist){
                setWishItems(wishlist.items)
            }
        }

       GetAllItems()
    
    },[])
    
    const DeleteCallback = async (item) => {
  
      let token = await cookie.get('token')

      const content = await axios.post(`https://ecomm123-backend.herokuapp.com/api/wish/delete-item/${item._id}`, {}, {
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(response => response.data)

      setDeleteSuccess(content.success)
  
      let clone = Wishitems.filter((item2, i) => {
        if (item2._id !== item._id) {
          return item2
        }
      })
      setWishItems(clone)
  
  
    }

    useEffect(() => {
      if (deleteSuccess) {

        toast({
          title: "Item deleted",
          status: 'success',
          isClosable: true,
        })
      }
      else if (deleteSuccess == false) {
        toast({
          title: "Something went wrong",
          status: 'error',
          isClosable: true,
        })
      }
    }, [deleteSuccess,toast])

  return (
    <VStack spacing={0} minW="90vw">
      <Box w="100%" h="10vh">
        <Heading w="50%" h="100%"
          size={'2xl'}
          fontWeight={500}
          p={3}>
          Wishlist
        </Heading>
      </Box>


      <VStack w="100%" minH="max-content" >
        {
          Wishitems && Wishitems.length > 0 ? (
            Wishitems.map((item, i) => (
              <Box
                key={i}
                borderTop={'1px'}
                borderColor={'gray.300'}
                w="100%" h={['100vh', '70vh', '40vh']}>
                <HStack w="100%" h="100%" flexDirection={{ base: 'column', md: 'row' }}>
                  <Box w={['80%', '60%', '15%']} h="100%">
                    <Flex w="100%" h="100%" justifyContent={'center'} alignItems={'center'}>
                      <Image
                        w="80%"
                        h="80%"
                        src={item.img}
                        alt={item.title}
                      />
                    </Flex>
                  </Box>

                  <Box w="85%" h="100%">
                    <VStack spacing={0} w="100%" h="100%">
                      <Box w="100%" h="20%" >

                        <HStack w="100%" h="100%" alignItems={'center'} justifyContent={'flex-start'}>
                          <Box w="90%">
                            <Heading fontSize={['xl', '2xl', '3xl']} fontWeight={500}>
                              {item.title}
                            </Heading>

                          </Box>

                          <Box w={['20%', '10%', '10%']}>
                            <Text fontSize={['1xl', '2xl', '2xl']}>
                              $ {item.price}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>


                      <Box w="100%" h="20%">
                        <HStack w={['90%', '50%', '50%']} h="100%">
                          <Box w={['50%', '100%', '20%']}>
                            <Text w="100%">
                              by {item.brand}
                            </Text>
                          </Box>

                          <Box px={5} w={['50%', '100%', '20%']} borderLeft={'1px'} borderColor={'gray.300'}>
                            <Text color={'green'}>
                              In Stock
                            </Text>
                          </Box>

                        </HStack>
                      </Box>
                      <Box

                        w="100%" h="40%">
                        <HStack w="100%" h="100%">
                          <Box w="50%" h="100%">
                            <HStack spacing={10} w="100%" h="100%" justifyContent={'flex-start'} alignItems={'center'}>
                                <Text noOfLines={[2,2,3]} fontSize={['sm','sm','sm']}>
                                    {item.description}
                                </Text>
                            </HStack>
                          </Box>

                          <Box w="40%" h="100%">
                            <HStack w="100%" h="100%" alignItems={'center'} justifyContent={'flex-end'}>
                              
                              <Box>
                              <IconButton
                                  onClick={() => { router.push(`/reviews/${item.productId}`) }}
                                  icon={<FaFileSignature />}
                                  size={'lg'}
                                  border={'1px'}
                                  borderColor={'green'}
                                  aria-label="Delete"
                                  _focus={{}}
                                  color={'green'}
                                  _active={{ color: 'white', border: '2px' }}
                                  _hover={{}}
                                  background={'white'}
                                />
                              </Box>
                              <Box>
                                <IconButton
                                  onClick={() => { DeleteCallback(item) }}
                                  icon={<AiFillDelete />}
                                  size={'lg'}
                                  border={'1px'}
                                  borderColor={'red'}
                                  aria-label="Delete"
                                  _focus={{}}
                                  color={'red'}
                                  _active={{ color: 'white', border: '2px' }}
                                  _hover={{}}
                                  background={'white'}
                                />
                              </Box>
                            </HStack>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            ))

          ) : (<Box>
            <Heading>
              No items here
            </Heading>
          </Box>)

        }
      </VStack>
      
    </VStack>
  )
}


    

