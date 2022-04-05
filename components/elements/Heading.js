import styles from '../../styles/Home.module.css'

const Heading = (props) => {
    return ( 

       <h1 className={styles.title}>{props.content}</h1>
     );
}
 
export default Heading;