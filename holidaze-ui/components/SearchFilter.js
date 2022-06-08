import { useState } from "react";
import Link from "next/link";



const SearchFilter = () => {
async function fetchHotels(){
    const response = await  fetch('http://localhost:1337/api/establishments?populate=*')
    return await response.json();
}

let hotels = []

fetch('http://localhost:1337/api/establishments?populate=*')
.then((response) => {
    return response.json();
})
.then((data) => {
  data.data.map((d)=>{
      
      hotels.push(d)
  })
})

// the value of the search field 
const [name, setName] = useState('');

// the search result
const [foundHotels, setFoundHotels] = useState(hotels);

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== '') {
    const results = hotels.filter((hotel) => {
      return hotel.attributes.title.toLowerCase().startsWith(keyword.toLowerCase());
      // Use the toLowerCase() method to make it case-insensitive
    });
    setFoundHotels(results);
  } else {
    setFoundHotels(hotels);
    // If the text field is empty, show all users
  }

  setName(keyword);
};
  
    

    return ( 
        <div className="search-container">
        <input
          type="search"
          value={name}
          onChange={filter}
          className="input"
          placeholder="Filter"
        />
  
        <div className="user-list">
          {foundHotels && foundHotels.length > 0 ? (
            foundHotels.map((hotel) => (
              <li key={hotel.id} className="user">
                <a href={`bookings/`} >
                <span className="user-name">{hotel.attributes.title}</span>
                </a>
              </li>
            ))
          ) : (
            <h1>Search for a hotel</h1>
        
          )}
          
        </div>
      </div>
     );
}

 
export default SearchFilter;    