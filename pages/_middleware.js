import {NextResponse} from 'next/server'


export default async function middleware(req){


    const {cookies} = req

    let token = cookies.token
    
    const url = req.url
    
    if(url.includes('http://localhost:3000/products' || 'http://localhost:3000/reviews')){
        if(token == undefined){
            return NextResponse.redirect('http://localhost:3000/login')
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
                return NextResponse.redirect('http://localhost:3000/login')
            }
        } catch (error) {
            return NextResponse.redirect('http://localhost:3000/login')
        }
    }
    return NextResponse.next()
}