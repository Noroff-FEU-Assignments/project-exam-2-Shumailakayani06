import Link from "next/link";
import { useUser } from "../lib/authContext";

const Establishments = ({establishments}) => {
     
    const { user, loading } = useUser();
    return (
        <section className="establishment-section">
       
  
        <ul className="list-none space-y-4 text-4xl font-bold mb-3 div-estab ">
            {establishments && 
            establishments.data.map((establishment) =>{
         
                return(
                    <ul  key={establishment.id} className="establishment-card">
                    <li >
                        <Link href={`establishments/` + establishment.id} >
                             <div className=" border-2 border-teal-400 rounded-lg focus:outline-none card estab-card">
                             <img src={establishment.attributes.image_url} alt=""/>
                                 <h1>{establishment.attributes.title}</h1>
                                 <h2>{establishment.attributes.rate}</h2>
                             </div>    
                        </Link>
                    </li>
                    {!loading && !user ? (
                    <ul className="estabBtn">
                    <li key={establishment.id}>
                        <Link href={`bookings/` + establishment.id} >
                             <div className="  rounded-lg focus:outline-none btnDiv">
                             
                                 <h1 className="md:p-2 rounded py-2 text-blue-400 bg-white p-2 btnUi">Book {establishment.attributes.title}</h1>
                                 
                             </div>
                            
                        </Link>
                    </li>
                        </ul>
                        ) : (
                            ' '
                        )}
                        </ul>
                
                )
            })}
        </ul>
       
        </section>
    )
}

export default Establishments;

