import { useRouter } from "next/router";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";


const Query = (queryReturn) => {

    const { user, loading }  = useFetchUser();
    const router = useRouter();


    return (
        
       
        <Layout user= {user}>

    
        {user && (
            <>
            <h2 className="text-3xl md:text-4xl font extrabold leading-tighter mb-4 mt-4">
                <span className="bg-clip-text text-transperant bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Booking Query
                </span>
              
            </h2>
            <ul>
                {
                    queryReturn.queryReturn && 
                    queryReturn.queryReturn.map((query) => {
                    return (
                        <li key={query.id}>
                            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transperant">
                                {query.attributes.firstname}
                            </span>{' '}
                            {query.attributes.lastname}
                            {query.attributes.email}
                            {query.attributes.date}
                            
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
   
   
    const queryResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/queries?populate=*`,
    jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
    }
    : ''
    );


    return{
        props: {
            queryReturn : queryResponse.data,
         

        }
    }
 
  }

  



export default Query;