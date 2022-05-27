import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";




export default function Home() {
  const { user, loading } =  useFetchUser();
  return (
 <Layout user= {user}>
   <div>
   <h1 className="font-bold text-5xl"> Welcome Holidaze, </h1>
   </div>

 
 </Layout>
  )
}
