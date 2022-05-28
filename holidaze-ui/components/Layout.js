import Head from "next/head";
import Nav from "./Nav";
import { UserProvider } from "../lib/authContext";
import Footer from "./Footer";

const Layout = ({ user, loading = false, children}) => (
    <UserProvider value={{ user, loading}}>
    <Head>
        <title> Holizade</title>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

    </Head>
    <Nav />
    <main className="px-4">
        <div 
        className="
        flex
        justify-center
        items-center
       text-white
        mx-auto
        w-full
        rounded-lg
        my-20
        p-16
        heading
        ">
        
        <div className="text-1xl font-medium">{children}</div>
        </div>

    </main>
    <Footer/>
        </UserProvider>
)

export default Layout;