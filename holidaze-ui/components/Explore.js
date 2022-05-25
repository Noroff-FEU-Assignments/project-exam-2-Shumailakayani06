import Link from "next/link";

const Explore = ({establishments}) => {
    return (
        <>
        <ul className="list-none space-y-4 text-4xl font-bold mb-3 ">
            {establishments && 
            establishments.data.map((establishment) =>{
                return(
                    <li key={establishment.id}>
                        <Link href={`explore/` + establishment.id} >
                             <div className="border border-2 border-teal-400 rounded-lg focus:outline-none card">
                                 <h1>{establishment.attributes.title}</h1>
                                 <h2>{establishment.attributes.rate}</h2>
                             </div>
                            
                        </Link>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default Explore;