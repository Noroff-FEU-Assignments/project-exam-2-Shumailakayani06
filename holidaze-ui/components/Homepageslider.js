import Link from "next/link";
import { useUser } from "../lib/authContext";

const Homepageslider = ({establishments}) => {
    const { user, loading } = useUser();
    return (
        <>
       
        <ul className="list-none space-y-4 text-4xl font-bold mb-3 ">
            {establishments && 
            establishments.data.map((establishment) =>{
                return(
                    <>
                    <li key={establishment.id}>
                        <Link href={`establishments/` + establishment.id} >
                             <div className=" border-2 border-teal-400 rounded-lg focus:outline-none card homepage-card">
                            <div className="main-card-info">
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4"> 
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                 {establishment.attributes.title}
                </span>
                </h1> 
                 <h2>{establishment.attributes.rate}</h2>
                            </div>
                             <img src={establishment.attributes.image_url} alt=""/>
                                 
                                 
                             </div>
                            
                        </Link>
                    </li>
                   
                        </>
                
                )
            })}
        </ul>
       
        </>
    )
}

export default Homepageslider;