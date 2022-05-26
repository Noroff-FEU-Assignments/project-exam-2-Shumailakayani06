import { useRouter } from "next/router";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";


const Contact = (dataReturn) => {
   
    const { user, loading }  = useFetchUser();
    const router = useRouter();
    const [message, setMessage] = useState({
        value: '',
    });
    const [messager, setMessager] = useState({
        value: '',
    });
    const handleChange = (e) => {
        setMessage({value: e.target.value});
        
    };
    const handleNameChange = (e) => {
        setMessager({value: e.target.value});
        
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
    await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/messages`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    data:{
                        message: message.value,
                        messager:messager.value ,
                    }
                })
            })
           
            router.reload()
        }catch(error){
            
           
        
            console.log('error with request', error)
        }
    }
    return (
        
       
        <Layout>

    
       
            <>
            <h2 className="text-3xl md:text-4xl font extrabold leading-tighter mb-4 mt-4">
                <span className="bg-clip-text text-transperant bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Messages
                </span>
        
                <form onSubmit={handleSubmit}>
                    <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={messager.value}
                    onChange={handleNameChange}
                    placeholder="Enter your name" />
                    <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700 border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={message.value}
                    onChange={handleChange}
                    placeholder="Add your review"
                    ></textarea>
                    
                    <button 
                    className="md:p-2 rounded py-2 text black bg-purple-200 p-2"
                    type="submit"
                    >
                        Add Message
                        
                    </button>
                
                </form>
            </h2>
           
            </>
  
    </Layout>
    )
    
};

export async function getStaticProps(){
   
    const jwt = typeof window !== 'undefined' 
   
   
    const estabResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/messages?populate=*`,
    jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
    }
    : ''
    );

    return{
        props: {
            dataReturn : estabResponse.data
        }
    }
 
  }



export default Contact;