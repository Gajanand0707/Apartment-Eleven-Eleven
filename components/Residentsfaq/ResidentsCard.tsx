import Image from 'next/image';
import React, { FC } from 'react';
import './Residentsfaq.css'
type Carddata ={
    text:string;
    image:string
}
const ResidentsCard:FC<Carddata> = ({text,image}) => {
    return (

        <div className='residentscard overflow-hidden'>
            <div className='testimonials-card relative w-full max-w-[296px]'>
                <div className=' overflow-hidden z-1 absolute left-16 top-14 bottom-0'>
                    <img
                        src="/Residentsleftdoor.svg"
                        alt="testimonial"
                        className="object-contain relative left-0 left_door"
                    />
                </div>
                <div className='relative z-2 '>
                    <img src="/rametransparent3.svg"
                        alt="testimonial"
                        className="object-contain "
                    />
                </div>
                <div className='overflow-hidden z-1 absolute right-17 top-14 bottom-0'>
                    <img
                        src="/Residentsrightdoor.svg"
                        alt="testimonial"
                        className="object-contain relative right-0 right_door "
                    />
                </div>
                <div className="p-4 text-[20px] font-goudy pb-12 shadow-[0_-2px_30px_#00000087] residents-text-box  rounded-sm absolute bottom-[80px] leading-6 max-w-[220px] left-[39px] mx-auto bg-cover text-center bg-center" style={{backgroundImage:"url('/Residentstextbg.png')"}}>
                    <p>{text}</p>
                    <div className='size-[97px] mx-auto mt-6 flex items-center justify-center bg-white rounded-full'><img src={image} alt="image" /></div>
                </div>

            </div>
        </div>
    );
}

export default ResidentsCard;
