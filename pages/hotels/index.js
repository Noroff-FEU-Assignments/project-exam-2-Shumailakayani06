
import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Heading from "../../components/elements/Heading";
import Link from "next/link";


export const getStaticProps = async () => {
  const res = await fetch('http://localhost:1337/api/establishments?populate=*');
  const data = await res.json();
  const hotelCards = data.data;
 


  return {
    props: {hotelCards}
    
  }
  
}

const Hotels = ({hotelCards}) => {
 
  console.log(hotelCards)
 
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
                <img src={item.attributes.image_url} />
                {item.attributes.price} kr
                {item.attributes.content}
              </a>
            </Link> 
           ))}
       
        </div>
    </div>
     );
}
 
export default Hotels;


// 