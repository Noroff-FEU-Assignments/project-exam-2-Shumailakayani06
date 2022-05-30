import React, {useState} from 'react'
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'


const ImageSlider = ({slides}) => {

    const [current, setCurrent] = useState(0)
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () =>{
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    console.log(current);

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null
    }

  return (
      <>
     
     <h2 className="text-3xl md:text-6xl font-extrabold leading-tighter mb-4 explore-h1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                  Explore Bergen
                </span>
            </h2>
            
    <section className='slider'>
   
       
           <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
           <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
    {SliderData.map((slide, index) => {
        return(
           <div className={index === current ? 'slide active' : 'slide'} key={index}>
               {index === current && (<img src={slide.image} alt="Bergen"/>)}
  
           </div>
        )
       

    })}
      </section>
      
</>
  )
}

export default ImageSlider