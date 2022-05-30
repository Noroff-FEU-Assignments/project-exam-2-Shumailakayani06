import Establishments from "../components/Establishments";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import useSWR from "swr";
import { useState } from "react";
import { useFetchUser } from "../lib/authContext";
import Homepageslider from "../components/Homepageslider";
import ImageSlider from "../components/ImageSlider";
import { SliderData } from "../components/SliderData";
import Herobanner from "../components/Herobanner";




const Home = ({establishments}) => {
    const { user, loading } = useFetchUser();
    const [pageIndex, setPageIndex] = useState(1)
    const {data}= useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/establishments?pagination[page]=${pageIndex}&pagination[pageSize]=1`, fetcher, {
        fallbackData: establishments
    })
    return (
      
     
        <Layout user={user}>
            <div className="home-heading">
        
            <div> 
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4"> 
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                   Welcome to Holidaze,
                </span>
                </h1> 
           </div>  
            <div>
               <h4 className=" text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2"> Where the world comes to stay</h4>
            </div>
                
           
            </div>
            <Herobanner/>
          
           
            <Homepageslider establishments={data} />
            <div className="space-x-4 space-y-4 home-slider-btn">
                <button 
                className={`md:p-2 rounded py-2 text-white p-2 ${
                    pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
                }`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
                >
                    {' '}
                    Previous
                </button>
                <button
                className={`md:p-2 rounded py-2 text-white p-2 ${
                    pageIndex === (data && data.meta.pagination.pageCount)
                    ? 'bg-gray-300'
                    : 'bg-blue-400'
                }`}
                disabled={pageIndex === (data && data.meta.pagination.pageCount)}
                onClick={() => setPageIndex(pageIndex + 1)}
                >
                    Next
                </button>
                <span>{`${pageIndex} of ${
                    data && data.meta.pagination.pageCount
                }`}

                </span>
            </div>

   
           
            <ImageSlider slides={SliderData}/>

        </Layout>
      
    )
}

export default Home;

export async function getStaticProps(){
   
  const estabResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/establishments?pagination[page]=1&pagination[pageSize]=1`);
  
  return{
      props: {
          establishments: estabResponse
      }
  }
}
