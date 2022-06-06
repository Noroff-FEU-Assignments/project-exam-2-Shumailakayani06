import Image from 'next/image'

const Herobanner = () => {
    return (
        <div className="herobanner">
            <Image 
            src="/hero/hero.jpg"
            alt="Hotel picture"
            width={500}
            height={500}
            ></Image>
        </div>
    )

  

};

export default Herobanner;