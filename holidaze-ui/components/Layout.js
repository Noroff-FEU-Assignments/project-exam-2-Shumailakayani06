import Head from "next/head";
import Nav from "./Nav";
import { UserProvider } from "../lib/authContext";
import Footer from "./Footer";

const Layout = ({ user, loading = false, children}) => (
    <UserProvider value={{ user, loading}}>
    <Head>
        <title> Database</title>
    </Head>
    <Nav />
    <main className="px-4">
        <div 
        className="
        flex
        justify-center
        items-center
        bg-white
        mx-auto
        w-3/4
        rounded-lg
        my-16
        p-16
        ">
        
        <div className="text-1xl font-medium">{children}</div>
        </div>

    </main>
    <Footer/>
        </UserProvider>
)

export default Layout;