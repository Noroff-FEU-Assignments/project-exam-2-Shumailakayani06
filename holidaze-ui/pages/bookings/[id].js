import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie} from "../../lib/auth";
import { useFetchUser } from "../../lib/authContext";

const Booking = ({establishment, jwt, plot, error}) => {
    console.log(establishment.attributes.title)
    const { user, loading } =  useFetchUser();
    const router = useRouter();
    const [ firstname, setFirstname] = useState({
        value: '',
    });
    const [ lastname, setLastname] = useState({
        value: '',
    });
    const [ email, setEmail] = useState({
        value: '',
    });
    const [ date, setDate] = useState({
        value: '',
    });
    const [ hotelname, setHotelname] = useState({
        value: '',
    });

    const handleFirstName = (e) => {
        setFirstname({ value: e.target.value})
    }
    const handleLastName = (e) => {
        setLastname({ value: e.target.value})
    }
    const handleEmail = (e) => {
        setEmail({ value: e.target.value})
    }
    const handleDate = (e) => {
        setDate({ value: e.target.value})
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = getTokenFromLocalCookie();
        try {
             await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/queries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                        firstname: firstname.value,
                        lastname: lastname.value,
                        email: email.value,
                        date: date.value,
                        hotelname: establishment.attributes.title
                        
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

        <form onSubmit={handleSubmit}>
                    <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={firstname.value}
                    onChange={handleFirstName}
                    placeholder="Enter your name" />

                        <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={lastname.value}
                    onChange={handleLastName}
                    placeholder="Enter your lastname" />

                        <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="email"
                    value={email.value}
                    onChange={handleEmail}
                    placeholder="Enter your email" />

                        <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="date"
                    value={date.value}
                    onChange={handleDate}
                    placeholder="" />

             
                    
                    <button 
                    className="md:p-2 rounded py-2 text black bg-purple-200 p-2"
                    type="submit"
                    >
                        Book now
                        
                    </button>
                
                </form>
       
      
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

export default Booking;