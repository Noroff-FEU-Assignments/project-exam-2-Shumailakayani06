import { useRouter } from "next/router";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";


const Message = (messageReturn) => {

    const { user, loading }  = useFetchUser();
    const router = useRouter();
 
 


    return (
        
       
        <Layout user= {user}>

    
        {user && (
            <>
            <h2 className="text-3xl md:text-4xl font extrabold leading-tighter mb-4 mt-4">
                <span className="bg-clip-text text-transperant bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Booking Message
                </span>
              
            </h2>
            <ul>
                {
                    messageReturn.messageReturn && 
                    messageReturn.messageReturn.map((message) => {
                    return (
                        <li key={message.id}>
                            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transperant">
                                {message.attributes.messager}
                            </span>{' '}
                            {message.attributes.message}
                        
                            
                        </li>
                    )
                })
                }
            </ul>
  
            </>
        )}
    </Layout>
    )
    
};

export async function getStaticProps(){
   
    const jwt = typeof window !== 'undefined' 
   
   
    const messageResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/messages?populate=*`,
    jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
    }
    : ''
    );


    return{
        props: {
            messageReturn : messageResponse.data,
         

        }
    }
 
  }


export default Message;