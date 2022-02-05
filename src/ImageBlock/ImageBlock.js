import React from 'react'
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';
import "slick-carousel/slick/slick.css";

import './imageBlock.scss'

function ImageBlock({images}) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 788,
              settings: {
                arrows:false,
                slidesToShow: 1,
                infinite: true,
              }
            },
        ]
      }
    return (
        <>
         
            <ul className='image-block'>
                <Slider {...settings}>
                            {images.items.map((item,i)=>{
                    return(
                        <li key={uuidv4()} className='image-block__item'><a><img className='img-block'  src={item.imageUrl} alt="" /></a></li>
                    )
                })}
                            </Slider>
                
            </ul>
        </>
    )
}

export default ImageBlock
