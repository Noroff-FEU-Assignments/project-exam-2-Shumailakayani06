
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
                <div className="hotel_card">
                <div>
                   <div className="img_div">
                       <img src={item.attributes.image_url} />
                   </div>
                   <h2>
                       {item.attributes.title}
                    </h2>
                   <div className="price_stars">
                       <p>{item.attributes.price} kr</p>
                       <p>{item.attributes.content}</p>
                    </div>
                </div>
                </div>
              </a>
            </Link> 
           ))}
       
        </div>
    </div>
     );
}
 
export default Hotels;


