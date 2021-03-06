import {
  Box, VStack, Text, Heading, HStack, Divider, Button, Flex, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  useToast,
  useDisclosure,
  ModalCloseButton,
  Image,
  ModalOverlay,
  Tab,
  TabPanel,
  Tabs,
  TabList,
  TabPanels,
  SimpleGrid, GridItem, FormLabel, Textarea, IconButton, Link, FormControl, Icon, useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ReactStars from 'react-stars';
import { AiFillCamera, AiFillDelete, AiFillFileImage, AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import cookie from 'js-cookie';




export default function Reviews({ reviews }) {

  const inRef = useRef(null)
  const router = useRouter()
  const toast = useToast()
  const [success, setSuccess] = useState(null)
  const [urlSuccess, seturlSuccess] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [Files, SetFiles] = useState([])
  const [Url, SetUrl] = useState('')
  const [tab, setTab] = useState(0)
  const [userReviews, setuserReviews] = useState([])
  const [deleteSucess, setDeleteSuccess] = useState(null)

  const { id } = router.query

  const isMinWidth = useMediaQuery('(max-width:600px)')

  const EnableFile = () => {
    inRef.current.click()
  }


  const UploadFile = async (files) => {
    const file = files[0]
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "blrx6dsr")

    const data = await axios.post("https://api.cloudinary.com/v1_1/dvvzlzude/image/upload", formData)
      .then(response => response.data)

    if (data) {
      seturlSuccess(true)
      SetUrl(data.url)
      let clone = [...Files]
      clone.push(file)
      SetFiles(clone)
    }

  }


  useEffect(() => {
    if (urlSuccess) {
      toast({
        title: "Image uploaded",
        status: 'success',
        isClosable: true,
      })
    }
  }, [urlSuccess,toast])


  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm(
    { mode: 'onChange' }
  )



  const [stars, setStars] = useState(0)

  function SubmitTheForm(data) {
    if (data) {
      let obj = {
        rating: stars,
        title: data.title,
        content: data.content,
        photoURL: Url ? Url : ''
      }
      SendObj(obj)
    }
  }

  const SendObj = async (data) => {
    const rev = await axios.post(`https://ecomm123-backend.herokuapp.com/api/rev/add-review/${id}`, data, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${cookie.get('token')}`
      }
    })
      .then(response => response.data)

    setSuccess(rev.success)
  }

  useEffect(() => {
    if (success) {
      toast({
        title: "Review added",
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

  const ratingChange = (newRating) => {
    setStars(newRating)
  }

  useEffect(() => {
    if (tab == 1) {
      const GetUserReview = async () => {
        const data = await axios.get(`https://ecomm123-backend.herokuapp.com/api/rev/get-user-reviews/${id}`, {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${cookie.get('token')}`
          }
        })
          .then(response => response.data)
        if (data) {
          setuserReviews(data.reviews)
        }

      }
      GetUserReview()
    }
  }, [tab,id])

  const DeleteCallback = async (item) => {
    let token = await cookie.get('token')
    const content = await axios.post(`https://ecomm123-backend.herokuapp.com/api/rev/delete-review/${item._id}`, {}, {
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(response => response.data)
    setDeleteSuccess(content.success)

    let clone = userReviews.filter((item2, i) => {
      if (item2._id !== item._id) {
        return item2
      }
    })
    setuserReviews(clone)
  }

  useEffect(() => {
    if (deleteSucess) {
      toast({
        title: "Review Deleted",
        status: 'success',
        isClosable: true,
      })
    }
    else if (deleteSucess == false) {
      toast({
        title: "Something went wrong",
        status: 'error',
        isClosable: true,
      })
    }
  }, [deleteSucess,toast])

  {/* */ }

  return (
    <VStack minW="90vw" h="100vh">
      <HStack

        alignItems={'flex-start'}
        justifyContent={'flex-start'}

        w="95%" h="10vh">

        <Box

          h="100%">
          <Heading
            py={5}
            size={['xl', 'xl', 'xl']}
            fontWeight={500}
          >
            Reviews
          </Heading>
        </Box>

        <HStack
          justifyContent={'center'}

          w={["70%", "70%", '90%']}
          h="100%"
        >
          <Tabs
            py={2}
            size={'sm'}
            onChange={(number) => { setTab(number) }}
            variant="unstyled">
            <TabList

            >
              <Tab
                fontSize={["10px", "15px", "15px"]}
                _selected={{ color: "white", bg: "gray.500" }}>All reviews</Tab>
              <Tab
                fontSize={["10px", "15px", "15px"]}
                _selected={{ color: "white", bg: "gray.500" }}>You&apos;re reviews</Tab>
            </TabList>
          </Tabs>
        </HStack>

        <HStack


          h="100%" justifyContent={'flex-end'}>
          <IconButton
            w="100%"
            icon={<AiOutlinePlus />}
            onClick={onOpen}
          />
        </HStack>



      </HStack>

      <Box w="100%" minH="90vh">
        <Flex
          flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
          <Modal
            isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a Review</ModalHeader>
              <ModalCloseButton />

              <ModalBody>

                <form onSubmit={handleSubmit(SubmitTheForm)}>
                  <FormControl>
                    <SimpleGrid spacing={5} columns={2}>

                      <GridItem>
                        <FormLabel>Rate the product</FormLabel>
                        <ReactStars
                          count={5}
                          value={stars}
                          size={24}
                          edit={true}
                          onChange={ratingChange}
                          color2={'#ffd700'}
                        />
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormLabel>Title</FormLabel>
                        <Input
                          type="text"
                          id="title" name="title" {...register("title", {
                            required: "This part is required",
                            maxLength: { value: 30, message: "Title should be under 30 characters" },
                            minLength: { value: 5, message: "Title should be greater than 5 characters" }
                          })} />
                      </GridItem>



                      <GridItem colSpan={2}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          type="text"
                          id="content"
                          name="content"
                          {...register("content", {
                            required: "This part is required",
                            minLength: { value: 5, message: "Content should be more than 5 characters" }
                          })}
                        />
                      </GridItem>

                      <GridItem colSpan={2}>
                        {
                          Files.length > 0 ? (
                            Files?.map((item, i) => {
                              return (
                                <Box key={i}>
                                  <HStack>
                                    <Icon w={8} h={8}>
                                      <AiFillFileImage />
                                    </Icon>

                                    <Text fontSize={'xl'} color={'black'}>
                                      {item.name}
                                    </Text>
                                  </HStack>
                                </Box>
                              )
                            })
                          ) : (
                            <IconButton
                              onClick={() => EnableFile()}
                              border={'1px'}
                              borderColor={'gray.200'}
                              background={'white'}
                              _hover={{ background: 'gray.50' }}
                              icon={<AiFillCamera />}
                              w="100%" />
                          )
                        }


                        <input
                          style={{ width: '0', height: '0', display: 'none' }}
                          onChange={(e) => { UploadFile(e.target.files) }}
                          type="file"
                          accept="image/*"
                          ref={inRef}
                        />
                      </GridItem>

                      <GridItem colSpan={2} py={3}>
                        <Button
                          onClick={onClose}
                          type="submit"
                          colorScheme='blue' mr={3}>
                          Submit
                        </Button>
                      </GridItem>
                    </SimpleGrid>
                  </FormControl>
                </form>
              </ModalBody>


            </ModalContent>
          </Modal>

          {
            tab == 0 ? (
              reviews ? (
                reviews?.map((item, i) => (
                 
                    <VStack
                    key={i}
                      spacing={5}
                      marginBottom={'3vh'}
                      justifyContent={'space-between'}
                      borderTop={'10px'}
                      boxShadow={'md'}
                      rounded={'md'}
                      w="95%"
                      h="100%"
                    >
                      <HStack

                        px={8}
                        spacing={10}
                        w="100%" minH="5vh">
                        <Heading
                          fontWeight={600}
                          size="lg">
                          {item.title}
                        </Heading>

                        <Box display={{ base: 'block', md: 'none' }}>
                          <ReactStars
                            size={20}
                            count={5}
                            edit={false}
                            value={item.rating}
                            color2={'#ffd700'}
                          />
                        </Box>


                        <Box display={{ base: 'none', md: 'block' }}>
                          <ReactStars
                            size={40}
                            count={5}
                            edit={false}
                            value={item.rating}
                            color2={'#ffd700'}
                          />
                        </Box>



                      </HStack>

                      <Box w="95%" minH="5vh">
                        <Text
                          color={'gray.600'}

                        >
                          {item.content}
                        </Text>
                      </Box>

                      {
                        item.photoURL === '' ? (
                          null
                        ) : (
                          <Box h="max-content" w="90%">
                            <Image 
                            w="100%"
                            h="50%"
                            src={item.photoURL} alt="none" />
                          </Box>
                        )
                      }


                      <Box w="100%" h="12%">
                        <HStack px={5} w="100%" h="100%">
                          <Box minW="10%" h="100%">
                            <Text py={3} px={5}>
                              by {item.username}
                            </Text>
                          </Box>

                          <Box minW={'10%'} h="100%">
                            <Text py={3} px={5}>
                              On {item.createdAt.split('T')[0]}
                            </Text>
                          </Box>


                        </HStack>
                      </Box>
                    </VStack>
                 
                ))
              ) : (null)
            ) : (
              userReviews ? (
                userReviews?.map((item, i) => (
                  
                    <VStack
                    key={i}
                      spacing={5}
                      marginBottom={'3vh'}
                      justifyContent={'space-between'}
                      borderTop={'10px'}
                      boxShadow={'md'}
                      rounded={'md'}
                      w="90%"
                      h="100%"
                    >
                      <HStack

                        px={8}
                        spacing={10}
                        w="100%" minH="5vh">
                        <Heading
                          fontWeight={600}
                          size="lg">
                          {item.title}
                        </Heading>

                        <Box display={{ base: 'block', md: 'none' }}>
                          <ReactStars
                            size={20}
                            count={5}
                            edit={false}
                            value={item.rating}
                            color2={'#ffd700'}
                          />
                        </Box>


                        <Box display={{ base: 'none', md: 'block' }}>
                          <ReactStars
                            size={40}
                            count={5}
                            edit={false}
                            value={item.rating}
                            color2={'#ffd700'}
                          />
                        </Box>

                        <Box>

                        </Box>
                      </HStack>

                      <Box w="95%" minH="5vh">
                        <Text
                          color={'gray.600'}

                        >
                          {item.content}
                        </Text>
                      </Box>

                      {
                        item.photoURL === '' ? (
                          null
                        ) : (
                          <Box h="max-content" w="90%">
                            <Image 
                            w="100%"
                            h="50%"
                            src={item.photoURL} alt="none" />
                          </Box>
                        )
                      }


                      <Box w="100%" h="12%">
                        <HStack px={5} w="100%" h="100%">
                          <Box minW={["40%","30%","40%"]} h="100%">
                            <Text py={3} px={5}>
                              by {item.username}
                            </Text>
                          </Box>

                          <Box minW="40%" h="100%">
                            <Text py={3} px={5}>
                              On {item.createdAt.split('T')[0]}
                            </Text>
                          </Box>

                          <Box minW="20%">
                            <Text
                            cursor={'pointer'}
                              onClick={() => { DeleteCallback(item) }}
                              color="red.400">
                              Delete
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                ))
              ) : (null)
            )
          }



        </Flex>
      </Box>


    </VStack>



  )


}


export async function getServerSideProps(context) {
  const data = await axios.get(`https://ecomm123-backend.herokuapp.com/api/rev/get-reviews/${context.params.id}`)
    .then(response => response.data)

  return {
    props: {
      reviews: data.reviews
    }
  }

}