import Link from "next/link";

const Establishments = ({establishments}) => {
    return (
        <>
        <ul className="list-none space-y-4 text-4xl font-bold mb-3">
            {establishments && 
            establishments.data.map((establishment) =>{
                return(
                    <li key={establishment.id}>
                        <Link href={`establishments/` + establishment.id}>
                             {establishment.attributes.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default Establishments;