import Link from 'next/link';
import Image from 'next/image';



const Navbar = () => {
    return ( 
        <nav>
            <div className="logo">
                <Link href="/"><a><h1 className='LOGO'>HOLIDAZE</h1></a></Link>
            </div>
          <Link href="/"><a>Home</a></Link>
          <Link href="hotels/"><a>Hotels</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
          <Link href="/login"><a>Login</a></Link>
        </nav>
     );
}
 
export default Navbar;