import Herobanner from "./elements/Herobanner";
import Footer from "./Footer";
import Navbar from "./Navbar";


const Layout = ({children}) => {
    return ( 
        <div>
       <Herobanner/>
        <div className="content">
            <Navbar />
            { children }
            <Footer />
        </div>
        </div>
    )
}
 
export default Layout;