
import Link from "next/link"
import { useState } from "react";
import { fetcher } from "../lib/api";
import { setToken, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";

const Nav = () => {
    const [data, setData] = useState({
        identifier: '',
        password: '',
    });

    const { user, loading } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const responseData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              identifier: data.identifier,
              password: data.password,
          }),
        }
        );
        console.log(responseData);
        setToken(responseData);
    };

    const logout = () => {
        unsetToken();
    }
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    let [open, setOpen] = useState(false);


    return(
        <nav
        className="
        shadow-md w-full fixed top-0 left-0 flex justify-between bg-white">
       
            <div className="md-flex flex items-center justify-between py-4 md:px-10 px-7 w-full">
               <div className="font-bold text-2xl curson-pointer flex items center ">
                <span>
                <Link href="/" passHref>
                    <a>
                       <h1 className="logo">HOLIDAZE</h1>
                    </a>
                </Link>
                </span>
                </div>

     <div onClick={() => setOpen(!open)}
     className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
     <ion-icon name={open ? 'close':'menu'}></ion-icon>
     </div>
     <div>
     <ul
            className={`
             md:flex md:items-center md:pb-0 pb-12  
             bg-white
              absolute md:static md:z-auto z-[-1] left-0 w-full md:w-full md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100':'top-[-490px]'} md:opacity-100 opaxity-0
            `}
            >
                    <li >
                    <Link href="/">
                      <a className="md:p-2 py-2 block hover:text-purple-400 duration-500 nav-link">
                          Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/establishments">
                      <a className="md:p-2 py-2 block hover:text-purple-400 duration-500 nav-link">
                          Establishments
                     </a>
                    </Link>
                </li>
            
         
                {!loading && !user ? (
     <li  >
     <Link href="/contact">
       <a className="md:p-2 py-2 block hover:text-purple-400 nav-link">
           Contact
      </a>
     </Link>
 </li>
) : (
    ' '
)}
    {!loading &&
    (user ? (
        <li>
            <Link href="/query">
                <a className="md:p-2 py-2 block hover:text-purple-400 nav-link">
                   Queries
                </a>
            </Link>
        </li>
        
    ) : (
        ' '
    ))}

{!loading &&
    (user ? (
        <li>
            <Link href="/message">
                <a className="md:p-2 py-2 block hover:text-purple-400 nav-link">
                   Messages
                </a>
            </Link>
        </li>
        
    ) : (
        ' '
    ))}
    {!loading &&
    (user ? (
        <li>
            <Link href="/hotel">
                <a className="md:p-2 py-2 block hover:text-purple-400 nav-link">
                   Add Hotel
                </a>
            </Link>
        </li>
        
    ) : (
        ' '
    ))}
{!loading &&
(user ? (
    <li >
        <a
        className="md:p-2 py-2 block hover:text-purple-400 nav-link"
        onClick={logout}
        style={{ cursor: 'pointer'}}>
            Logout
        </a>
    </li>
):(
    ' '
))}
{!loading && !user ? (
    <>
    <li >
        <form onSubmit={handleSubmit} className="form-inline">
            <input 
            type="text"
            name="identifier"
            onChange={handleChange}
            placeholder="Username"
            className=" form-input py-2 rounded mx-2"
            required
            />
            <input 
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="md:p-2 form-input py-2 rounded mx-2 "
            required
            />

            <button
            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
            type="submit"
            >
                Login
            </button>
        </form>
        </li>
   
        </>
) : (
    ' '
)}



    </ul>
    </div>
    </div>

 </nav>
    );
}



export default Nav;