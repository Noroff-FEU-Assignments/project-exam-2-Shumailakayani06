import styles from '../../styles/Home.module.css'
import Image from 'next/image';

const Herobanner = () => {
    return ( 
  <div className='banner'>
       <Image
       src="/herobanner.png"
       width={1600}
       height={300}
       />
 </div>
     );
}
 
export default Herobanner;