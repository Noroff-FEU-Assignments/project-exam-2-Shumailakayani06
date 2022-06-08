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
        <h2 className="text-3xl md:text-6xl font-extrabold leading-tighter mb-4 ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                 Messages
                </span>
            </h2>
            <ul className="message-ul">
                {
                    messageReturn.messageReturn && 
                    messageReturn.messageReturn.map((message) => {
                    return (
                        <li key={message.id} className=" border-2 border-teal-400 rounded-lg focus:outline-none">
                            <div>
                            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                               Name : 
                            </span>
                            <span className="text-black italic"> {message.attributes.messager}</span>
                            </div>
                           <div>
                         <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2"> Said : </span> <span className="text-black italic" > &quot; {message.attributes.message} &quot; </span> 
                          </div>
                        
                            
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
   
   
    const messageResponse = await fetcher(`https://demo-strapi06.herokuapp.com/api/messages?populate=*`,
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