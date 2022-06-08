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
    await fetcher(`https://demo-strapi06.herokuapp.com/api/messages`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                   
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
            <section className="contact-form">
            <h1 className="text-3xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                   Contact us,
                </span>
            </h1>
        
                <form onSubmit={handleSubmit}>
                    <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={messager.value}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    required={true} />
                    <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700 border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={message.value}
                    onChange={handleChange}
                    placeholder="Write a message..."
                    required={true} 
                    ></textarea>
                    
                    <button 
                    className="md:p-2 rounded py-2 text black bg-purple-300 p-2"
                    type="submit"
                    >
                        Send Message
                        
                    </button>
                
                </form>
         
           
            </section>
  
    </Layout>
    )
    
};

export async function getStaticProps(){
   
    const estabResponse = await fetcher(`https://demo-strapi06.herokuapp.com/api/messages?populate=*`);

    return{
        props: {
            dataReturn : estabResponse.data
        }
    }
 
  }



export default Contact;