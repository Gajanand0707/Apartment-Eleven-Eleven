import Image from 'next/image';
import React from 'react';
import './Residentsfaq.css'

const ResidentsCard = () => {
    return (
        <div className='residentscard overflow-hidden'>
            <div className='testimonials-card relative w-full max-w-[366px]'>
                <div className=' overflow-hidden absolute left-16 top-14 bottom-0'>
                    <img
                        src="/Residentsleftdoor.svg"
                        alt="testimonial"
                        className="object-contain relative left-0 left_door"
                    />
                </div>
                <div className='relative z-2 '>
                    <img src="/frametransparent3.svg"
                        alt="testimonial"
                        className="object-contain "
                    />
                </div>
                <div className='overflow-hidden absolute right-16 top-14 bottom-0'>
                    <img
                        src="/Residentsrightdoor.svg"
                        alt="testimonial"
                        className="object-contain relative right-0 right_door "
                    />
                </div>

            </div>
        </div>
    );
}

export default ResidentsCard;
