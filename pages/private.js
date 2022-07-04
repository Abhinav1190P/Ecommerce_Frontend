import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../Layout/layout'
import cookie from 'js-cookie'
export default function Private() {
    

    const router = useRouter()
    const [isAuth,SetIsAuth] = useState(false)

    useEffect(()=>{
        if(!cookie.getItem('token')){
            router.push('/login')
        }

        const fetchPrivateData = async () =>{
            const data = await axios.get('https://ecomm123-backend.herokuapp.com/api/private',{
                headers:{
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${cookie.getItem('token')}`
                }
            })
            .then(response => response.data)
            SetIsAuth(data.success)
            
        }   
        fetchPrivateData()
    })

  return (
    <Layout
    auth={isAuth}
    >Private</Layout>
  )
}
