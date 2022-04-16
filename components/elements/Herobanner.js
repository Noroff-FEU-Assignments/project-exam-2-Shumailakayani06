import styles from '../../styles/Home.module.css'
import Image from 'next/image';



const Herobanner = () => {
    return ( 
      <div className={styles.homePageTopSection}>

  <div className={styles.sloganDiv}>
     <h2 className={styles.slogan}>
       Slogan goes here
     </h2>
     </div>
  <input type="text" placeholder='Search for establishment...' className={styles.searchBox}></input>

 
   </div>
     );
}
 

 
export default Herobanner;