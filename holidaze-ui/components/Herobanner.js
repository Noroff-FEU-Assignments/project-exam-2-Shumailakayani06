import Image from 'next/image'

const Herobanner = () => {
    return (
        <div className="herobanner">
            <Image 
            src="/hero/hero.jpg"
            alt="Hotel picture"
            width={1800}
            height={800}
            ></Image>
        </div>
    )

  

};

export default Herobanner;