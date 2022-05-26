import Link from "next/link";
import { useUser } from "../lib/authContext";

const Establishments = ({establishments}) => {
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
                             <div className=" border-2 border-teal-400 rounded-lg focus:outline-none card">
                             <img src={establishment.attributes.image_url} alt=""/>
                                 <h1>{establishment.attributes.title}</h1>
                                 <h2>{establishment.attributes.rate}</h2>
                             </div>
                            
                        </Link>
                    </li>
                    {!loading && !user ? (
                    <ul>
                    <li key={establishment.id}>
                        <Link href={`bookings/` + establishment.id} >
                             <div className="border-2 border-teal-400 rounded-lg focus:outline-none card">
                             
                                 <h1>book{establishment.attributes.title}now</h1>
                                 
                             </div>
                            
                        </Link>
                    </li>
                        </ul>
                        ) : (
                            ' '
                        )}
                        </>
                
                )
            })}
        </ul>
       
        </>
    )
}

export default Establishments;