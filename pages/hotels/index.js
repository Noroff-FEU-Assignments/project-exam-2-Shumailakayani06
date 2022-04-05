import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Heading from "../../components/elements/Heading";
import Link from "next/link";


export const getStaticProps = async () => {
  const res = await fetch('https://project-prept.herokuapp.com/api/hotel-rooms?populate=*');
  const data = await res.json();
  const hotelCards = data.data
  console.log(hotelCards)

  return {
    props: {hotelCards}
    
  }
  
}

const Hotels = ({hotelCards}) => {
    return ( 
    <div>
          <Heading content="ALL HOTELS"/>
        <div>
          {hotelCards.map(item =>(
            <Link href={'/hotels/' + item.id} key={item.id}>
              <a>
                <h2>
                  {item.attributes.title}
                </h2>
                <img src={item.attributes.image} width='150' height='200'/>
              </a>
            </Link>
          ))}
        </div>
    </div>
     );
}
 
export default Hotels;