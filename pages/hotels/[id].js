
export const getStaticPaths = async () => {
  const res = await fetch ('http://localhost:1337/api/establishments?populate=*');
  const data = await res.json();
  const json = data.data

 const paths = json.map((detail) =>{
     return {
         params: { id: detail.id.toString() }
     }
 })
  return{
     paths,
     fallback: false 
  }
}

export const getStaticProps = async (context) => {
const id = context.params.id;
const res = await fetch('http://localhost:1337/api/establishments?populate=*' + id);
const data = await res.json();

const jsonData = data.data;

console.log(jsonData)

return {
  props : {jsonData}
}
}


const Details = ({ jsonData }) => {
  console.log(jsonData[0].attributes.title)

 return ( 
     <div>
       Detail 
    {jsonData.title}     
     </div>
  );
}

export default Details;