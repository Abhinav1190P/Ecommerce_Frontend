import {NextResponse} from 'next/server'


export default async function middleware(req){
    const {cookies} = req
    let token = cookies.token
    const url = req.url
    
    
    if(url.includes('https://ecommerce1234.vercel.app/products')){
        if(token == undefined){
            return NextResponse.redirect('https://ecommerce1234.vercel.app/login')
        }

        try {
            const req = await fetch('https://ecomm123-backend.herokuapp.com/api/private',{
                headers:{
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await req.json()
            
            if(data.success){
                return NextResponse.next()
            }
            else{
                return NextResponse.redirect('https://ecommerce1234.vercel.app/login')
            }
        } catch (error) {
            return NextResponse.redirect('https://ecommerce1234.vercel.app/login')
        }
    }
    return NextResponse.next()
}