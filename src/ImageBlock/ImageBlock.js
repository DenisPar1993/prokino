import React from 'react'
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import "slick-carousel/slick/slick.css";

import './imageBlock.scss'

function ImageBlock({images}) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
      console.log(images);
    return (
        <>
         
            <ul className='image-block'>
                <Slider {...settings}>
                            {images.items.map((item,i)=>{
                    return(
                        <li key={uuidv4()} className='image-block__item'><a><img className='img-block' width={600} height={600} src={item.imageUrl} alt="" /></a></li>
                    )
                })}
                            </Slider>
                
            </ul>
        </>
    )
}

export default ImageBlock
