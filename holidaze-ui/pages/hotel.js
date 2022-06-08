import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie} from "../lib/auth";
import { useFetchUser } from "../lib/authContext";

const Hotel = () => {
   
    const { user, loading } =  useFetchUser();
    const router = useRouter();
    const [ title, setTitle] = useState({
        value: '',
    });
    const [ description, setDescription] = useState({
        value: '',
    });
    const [ adress, setAdress] = useState({
        value: '',
    });
    const [ number, setNumber] = useState({
        value: '',
    });
    const [ rate, setRate] = useState({
        value: '',
    });
    const [ price, setPrice] = useState({
        value: '',
    });
    const [ image, setImage] = useState({
        value: '',
    });

    const handleTitle = (e) => {
        setTitle({ value: e.target.value})
    }
    const handleDescription = (e) => {
        setDescription({ value: e.target.value})
    }
    const handleAdress = (e) => {
        setAdress({ value: e.target.value})
    }
    const handleNumber = (e) => {
        setNumber({ value: e.target.value})
    }
    const handleRate = (e) => {
        setRate({ value: e.target.value})
    }
    const handlePrice = (e) => {
        setPrice({ value: e.target.value})
    }
    const handleImage = (e) => {
        setImage({ value: e.target.value})
    }


   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = getTokenFromLocalCookie();
        try {
             await fetcher(`https://demo-strapi06.herokuapp.com/api/establishments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                    title: title.value,
                    description: description.value,
                    adress: adress.value,
                    number: number.value,
                    rate: rate.value,
                    price: price.value,
                    image_url: image.value
                        
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

<h2 className="text-3xl md:text-6xl font-extrabold leading-tighter mb-4 ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                 Add Establishment
                </span>
            </h2>
   

        <form onSubmit={handleSubmit} className="add-hotel">
              <div>
              <input
                    className=" border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={title.value}
                    onChange={handleTitle}
                    placeholder="Title"
                    required={true}  />
              </div>
                <div>
                <input
                    className=" border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={adress.value}
                    onChange={handleAdress}
                    placeholder="Adress"
                    required={true}  />
                </div>
                <div>
                <input
                    className=" border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="number"
                    value={number.value}
                    onChange={handleNumber}
                    placeholder="Enter phone number" 
                    required={true} />
                </div>
                <div>
                <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="text"
                    value={rate.value}
                    onChange={handleRate}
                    placeholder="add rating⭐️"
                    required={true}  />
                </div>
                <div>
                <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="number"
                    value={price.value}
                    onChange={handlePrice}
                    placeholder="Enter price"
                    required={true}  />
                </div>
                <div>
                <input
                    className="border-2 border-teal-400 rounded-lg focus:outline-none"
                    type="file"
                    value={image.value}
                    onChange={handleImage}
                    placeholder="Enter image url"
                    required={true}  />
                </div>
                <div>
                <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700  border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={description.value}
                    onChange={handleDescription}
                    placeholder="Add your description"
                    required={true} 
                    ></textarea>
                </div>
               <div>
               <button 
                    className="md:p-2 rounded py-2 text black bg-purple-300 p-2"
                    type="submit"
                    >
                       Add Establishment
                        
                    </button>
               </div>
            
                
                </form>
       
      
    </Layout>
)
}



export default Hotel;