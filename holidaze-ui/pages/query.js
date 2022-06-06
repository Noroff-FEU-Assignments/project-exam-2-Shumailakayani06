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
           <h2 className="text-3xl md:text-6xl font-extrabold leading-tighter mb-4 ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                  Booking Queries
                </span>
            </h2>
            <ul className="booking-ul">
                {
                    queryReturn.queryReturn && 
                    queryReturn.queryReturn.map((query) => {
                    return (
                        <li key={query.id} className=" border-2 border-teal-400 rounded-lg focus:outline-none">
                              <div>
                            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">Hotel Name : </span> {query.attributes.hotelname}
                            </div>
                            <div>
                            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transperant">
                               <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">First Name : </span> {query.attributes.firstname}
                            </span>{' '}
                            </div>
                            <div>
                            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">Last Name : </span> {query.attributes.lastname}
                            </div>
                            <div>
                            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">Email : </span>{query.attributes.email}
                            </div>
                            <div>
                            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">Booking date : </span> {query.attributes.date}
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
   
   
    const queryResponse = await fetcher(`https://demo-strapi06.herokuapp.com/api/queries?populate=*`,
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