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
  SimpleGrid, GridItem, FormLabel, Textarea, IconButton,Link, FormControl, Icon, Select
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ReactStars from 'react-stars';
import { AiFillCamera, AiFillDelete,AiFillFileImage } from 'react-icons/ai';
import axios from 'axios';
import cookie from 'js-cookie';




export default function Reviews({ reviews }) {

  const inRef = useRef(null)
  const router = useRouter()
  const toast = useToast()
  const [success, setSuccess] = useState(null)
  const [urlSuccess,seturlSuccess] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [Files,SetFiles] = useState([])
  const [Url,SetUrl] = useState('')
  const [tab,setTab] = useState(0)
  const [userReviews,setuserReviews] = useState([])
  const [deleteSucess,setDeleteSuccess] = useState(null)

  const { id } = router.query

  const EnableFile = () => {
   inRef.current.click() 
  }
  

  const UploadFile = async (files) => {
    const file = files[0]
    const formData = new FormData()
    formData.append("file",file)
    formData.append("upload_preset","blrx6dsr")

    const data = await axios.post("https://api.cloudinary.com/v1_1/dvvzlzude/image/upload",formData)
    .then(response => response.data)

    if(data){
      seturlSuccess(true)
      SetUrl(data.url)
      let clone = [...Files]
      clone.push(file)
      SetFiles(clone)
    }

  }


  useEffect(()=>{
    if(urlSuccess){
      toast({
          title: "Image uploaded",
          status: 'success',
          isClosable: true,
      })
    }
  },[urlSuccess])


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
        photoURL: Url ? Url:''
      }
      SendObj(obj)
    }
  }

  const SendObj = async (data) => {
    const rev = await axios.post(`http://localhost:5000/api/rev/add-review/${id}`, data, {
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
  }, [success])

  const ratingChange = (newRating) => {
    setStars(newRating)
  }
  
  useEffect(()=>{
    if(tab == 1 && userReviews.length == 0){
      const GetUserReview = async () => {
        const data = await axios.get(`http://localhost:5000/api/rev/get-user-reviews/${id}`,{ 
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${cookie.get('token')}`
          }
        })
        .then(response => response.data)
        if(data){
          setuserReviews(data.reviews)
        }
       
      }
      GetUserReview()
    }
  },[tab])

  const DeleteCallback = async (item) => {
    let token = await cookie.get('token')
    const content = await axios.post(`http://localhost:5000/api/rev/delete-review/${item._id}`,{},{
      headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(response => response.data)
    setDeleteSuccess(content.success)

    let clone = userReviews.filter((item2,i)=>{
      if(item2._id !== item._id){
        return item2
      }
    })
    setuserReviews(clone)
  }

  useEffect(()=>{
    if (success) {
      toast({
        title: "Review Deleted",
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
  },[deleteSucess])

  return (
    <VStack minW="90vw" h="100vh">
      <HStack justifyContent={'space-between'} w="100%" h="10vh">
        <Heading w="60%" h="100%"
          size={'xl'}
          fontWeight={500}
          py={3}
          px={10}
          >
          Reviews
        </Heading>

        <Tabs
        onChange={(number)=>{setTab(number)}}
        variant="unstyled" w="30%">
  <TabList>
    <Tab _selected={{ color: "white", bg: "blue.500" }}>Tab 1</Tab>
    <Tab _selected={{ color: "white", bg: "green.400" }}>Tab 2</Tab>
  </TabList>
</Tabs>

          <Button
            onClick={onOpen}>Add review</Button>

      </HStack>

      <Box w="100%" minH="90vh">
        <Flex 
        flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
          <Modal
            isOpen={isOpen} onClose={onClose}>
<ModalOverlay/>
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
                            Files?.map((item,i)=>{
                              return(
                              <Box key={i}>
                                <HStack>
                                  <Icon w={8} h={8}>
                                  <AiFillFileImage/>
                                  </Icon>

                                  <Text fontSize={'xl'} color={'black'}>
                                    {item.name}
                                  </Text>
                                </HStack>
                              </Box>
                              )
                            })
                          ):(
                            <IconButton
                        onClick = {()=>EnableFile()}
                          border={'1px'}
                          borderColor={'gray.200'}
                          background={'white'}
                          _hover={{background:'gray.50'}}
                          icon={<AiFillCamera />}
                          w="100%" />
                          )
                        }
                        

                          <input
                          style={{width:'0',height:'0',display:'none'}}
                          onChange={(e)=>{UploadFile(e.target.files)}}
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
                                <Link
                                _hover={{}}
                                w="95%" minH="10vh" 
                                key={i}
                                >
                                <VStack
                                spacing={10}
                                marginBottom={'3vh'}
                                justifyContent={'space-between'}
                                borderTop={'10px'}
                                boxShadow={'md'}
                                rounded={'md'}
                               w="100%"
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
                
                                    <ReactStars
                                    size={40}
                                    count={5}
                                    edit={false}
                                    value={item.rating}
                                    color2={'#ffd700'}
                                    />
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
                                    ):(
                                      <Box boxSize={'md'}>
                                      <Image src={item.photoURL} alt="none"/>
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
                                </Link>
                              ))
                            ) : (null)
                          ):(
                            userReviews ? (
                              userReviews?.map((item, i) => (
                                <Link
                                _hover={{}}
                                w="95%" minH="10vh" 
                                key={i}
                                >
                                <VStack
                                spacing={10}
                                marginBottom={'3vh'}
                                justifyContent={'space-between'}
                                borderTop={'10px'}
                                boxShadow={'md'}
                                rounded={'md'}
                               w="100%"
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
                
                                    <ReactStars
                                    size={40}
                                    count={5}
                                    edit={false}
                                    value={item.rating}
                                    color2={'#ffd700'}
                                    />

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
                                    ):(
                                      <Box boxSize={'md'}>
                                      <Image src={item.photoURL} alt="none"/>
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
                
                                      <Box minW={'80%'} h="100%">
                                        <Text py={3} px={5}>
                                          On {item.createdAt.split('T')[0]}
                                        </Text>
                                      </Box>

                                      <Box>
                                        <Text 
                                        onClick={()=>{DeleteCallback(item)}}
                                        color="red.400">
                                          Delete
                                        </Text>
                                      </Box>
                                    </HStack>
                                  </Box>
                                </VStack>
                                </Link>
                              ))
                            ) :(null)
                          )
                        }

          

        </Flex>
      </Box>


    </VStack>



  )


}


export async function getServerSideProps(context) {
  const data = await axios.get(`http://localhost:5000/api/rev/get-reviews/${context.params.id}`)
    .then(response => response.data)

  return {
    props: {
      reviews: data.reviews
    }
  }

}