import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie} from "../../lib/auth";
import { useFetchUser } from "../../lib/authContext";

const Establishment = ({establishment, jwt, plot, error}) => {
    console.log(establishment.attributes.title)
    const { user, loading } =  useFetchUser();
    const router = useRouter();
    const [ review, setReview] = useState({
        value: '',
    });

    const handleChange = (e) => {
        setReview({ value: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = getTokenFromLocalCookie();
        try {
             await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                        review: review.value,
                        reviewer: getUserFromLocalCookie(),
                        Establishment: establishment.id,
                        establishment: establishment.attributes.title
                    }
                })
            });
            router.reload()
        }catch(error){
            console.error('error with request', error);
        }
    }
return(
    <Layout user= {user}>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
             {establishment.attributes.title}
            </span>
        </h1>
        <img src={establishment.attributes.image_url} alt=""/>
        <p>
            {' '}
            <p className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {establishment.attributes.rate}
            </p> 
             {establishment.attributes.price} kr
        </p>
        <p>Description: {establishment.attributes.description}</p>
        <p>Adress: {establishment.attributes.adress}</p>
        <p>Telephone nr: {establishment.attributes.number}</p>
    
        {user && (
            <>
            <h2 className="text-3xl md:text-4xl font extrabold leading-tighter mb-4 mt-4">
                <span className="bg-clip-text text-transperant bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Reviews
                </span>
                <form onSubmit={handleSubmit}>
                    <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={review.value}
                    onChange={handleChange}
                    placeholder="Add your review"
                    ></textarea>
                    <button 
                    className="md:p-2 rounded py-2 text black bg-purple-200 p-2"
                    type="submit"
                    >
                        Add Review
                        
                    </button>
                </form>
            </h2>
            <ul>
                {establishment.attributes.reviews && 
                establishment.attributes.reviews.data.map((review) => {
                    return (
                        <div className="reviews">
                        <li key={review.id}>
                            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transperant">
                                {review.attributes.reviewer}
                            </span>{' '}
                            Said: "{review.attributes.review}"
                        </li>
                        </div>
                    )
                })
                }
            </ul>
            </>
        )}
    </Layout>
)
}

export async function getServerSideProps({req, params}){
    const { id } = params;
    const jwt = typeof window !== 'undefined' 
    ? getTokenFromLocalCookie
     : getTokenFromServerCookie(req)
    const estabResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/establishments/${id}?populate=*`, 
    jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
    }
    : ''
    );
    return {
        props: {
            establishment: estabResponse.data
        }
    }
}

export default Establishment;