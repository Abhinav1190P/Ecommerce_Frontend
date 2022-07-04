import React, { useEffect, useState } from 'react'
import { Container, Box, Heading, Flex, Editable, useToast, EditablePreview, EditableInput, VStack, Text, HStack, Image, Select, Button, Divider, IconButton, Icon } from '@chakra-ui/react'
import cookie from 'js-cookie'
import axios from 'axios'
import { AiFillSave, AiFillDelete } from 'react-icons/ai'

function Cart() {

  const toast = useToast()

  const [items, SetItems] = useState()
  const otherSizes = ["SM", "MD", "LG", "XL"]
  const [newQuantity, setNewQuantity] = useState()
  const [error, SetError] = useState()
  const [id, SetId] = useState('')
  const [newSize, setnewSize] = useState()
  const [deleteSuccess, setDeleteSuccess] = useState(null)
  const [sender, SetSender] = useState()
  const [success, SetSuccess] = useState(null)
  const [Sum, setSum] = useState(0)



  useEffect(() => {
    const GetCartItems = async () => {

      const content = await axios.get('https://ecomm123-backend.herokuapp.com/api/cart/get-items', {
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${cookie.get('token')}`
        }
      }).then(response => response.data)

      SetItems(content.CartItem)

    }
    GetCartItems()
  }, [])

  useEffect(() => {
    if (items && items.length > 0) {
      let partial = 0
      const sum = items?.map((item, i) => {
        return partial + (item.price) * (item.quantity)
      })

      setSum(sum)
    } else {
      setSum(0)
    }
  }, [items])

  const SaverCallback = async (item) => {
    const id = item._id
    SetId(id)
    if (newSize == undefined && newQuantity == undefined) {
      let obj = {
        title: item.title,
        description: item.description,
        price: item.price,
        img: item.img,
        size: item.size,
        quantity: item.quantity,
        brand: item.brand
      }
      SetSender(obj)
    }
    else if (newSize == undefined) {
      let obj = {
        title: item.title,
        description: item.description,
        price: item.price,
        img: item.img,
        size: item.size,
        quantity: newQuantity,
        brand: item.brand
      }
      SetSender(obj)
    }
    else if (newQuantity == undefined) {
      let obj = {
        title: item.title,
        description: item.description,
        price: item.price,
        img: item.img,
        size: newSize,
        quantity: item.quantity,
        brand: item.brand
      }
      SetSender(obj)
    }
    else {
      let obj = {
        title: item.title,
        description: item.description,
        price: item.price,
        img: item.img,
        size: newSize,
        quantity: newQuantity,
        brand: item.brand
      }
      SetSender(obj)
    }



  }

  useEffect(() => {
    if (sender !== undefined) {
      const FinalStage = async () => {

        const content = await axios.post(`https://ecomm123-backend.herokuapp.com/api/cart/update-item/${id}`, sender, {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${cookie.get('token')}`
          }
        }).then(response => response.data)
        SetSuccess(content.success)
      }
      FinalStage()
    }
  }, [sender,id])

  useEffect(() => {
    if (success) {
      toast({
        title: "Item updated",
        status: 'success',
        isClosable: true,
      })
    }
    else if (success == false) {
      toast({
        title: "Something went wrong",
        status: 'error',
        isClosable: true,
      })
    }
  }, [success,toast])


  const DeleteCallback = async (item) => {

    let token = await cookie.get('token')
    const content = await axios.post(`https://ecomm123-backend.herokuapp.com/api/cart/delete-item/${item._id}`, {}, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(response => response.data)
    setDeleteSuccess(content.success)

    let clone = items.filter((item2, i) => {
      if (item2._id !== item._id) {
        return item2
      }
    })
    SetItems(clone)


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
          Cart
        </Heading>
      </Box>


      <VStack w="100%" minH="max-content" >
        {
          items && items.length > 0 ? (
            items.map((item, i) => (
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
                            <Heading fontSize={['2xl', '2xl', '3xl']} fontWeight={500}>
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
                              <Select w={['50%', '30%', '20%']}
                                onChange={(e) => setnewSize(e.target.value)}
                                defaultValue={item.size}>
                                <option>{item.size}</option>
                                {
                                  otherSizes.filter((item2, i) => {
                                    if (item.size === item2) {
                                      return null
                                    }
                                    else {
                                      return item2
                                    }
                                  }).map((item3, i) => (
                                    <option key={i}>{item3}</option>
                                  ))
                                }
                              </Select>


                              <Editable defaultValue={item.quantity} w="20%">
                                <EditablePreview w="100%" />
                                <EditableInput onChange={(e) => setNewQuantity(parseInt(e.target.value))} w="100%" />
                              </Editable>
                            </HStack>
                          </Box>

                          <Box w="40%" h="100%">
                            <HStack w="100%" h="100%" alignItems={'center'} justifyContent={'flex-end'}>
                              <Box>

                                <IconButton
                                  onClick={() => SaverCallback(item)}
                                  icon={<AiFillSave />}
                                  size={'lg'}
                                  border={'1px'}
                                  aria-label="Save"
                                  _focus={{}}
                                  color="green"
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
      <Box w="100%" minH="40vh">
        <Heading px={5} py={2}>
          Bill
        </Heading>
        <Flex px={6} py={5} w="95%" h="100%" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Box h="10vh" w="100%">
            {
              items && items.length > 0 ? (
                items?.map((item, i) => (
                  <HStack justifyContent={'space-between'} key={i} w="100%" h="100%">
                    <Text>

                      {item.title}
                      {
                        i == items.length - 1 ? (
                          null
                        ) : (
                          <Text
                            size={'lg'}
                            color={'blackAlpha.600'}
                          >
                            +
                          </Text>
                        )
                      }
                    </Text>

                    <Text>
                      $ {item.price * item.quantity}
                    </Text>
                  </HStack>
                ))
              ) : (null)

            }
            <Divider />
            <Box w="100%" h="100%">

              <Text>
                Grand Total $ {Sum}
              </Text>

            </Box>
          </Box>
        </Flex>
      </Box>
    </VStack>
  )
}





export default Cart