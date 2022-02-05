import React from 'react'
import Slider from "react-slick";
import Card from '../Card/Card';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResp } from './mainSlice';
import './main.scss'
import "slick-carousel/slick/slick.css";

const Main = () => {
    const { resps, loadingMain, error } = useSelector(state => state.main);
    const dispatch = useDispatch();
    const [widthWindow,setWidthWindow]=useState(1200)
    const load = loadingMain ? <Spinner /> : null;
    const view = !(loadingMain && error) ? <View resps={resps} widthWindow={widthWindow} /> : null;
    const errMess = error ? <ErrorMessage /> : null;
    useEffect(() => {
      const wid = document.documentElement.offsetWidth
      if(wid<789){
        setWidthWindow(wid)
      }
    



        if (resps.length == 0) {
            dispatch(fetchResp());
        }
       
        
    }, [])
console.log(widthWindow);
    return (
        <>
            {load}
            {view}
            {errMess}
        </>
    )


}
const View = ({ resps,widthWindow }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1133,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 788,
                settings: {
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            
        ]
    };
    return (
        resps.length && <div  className="film__wrapper" style={{maxWidth:`${widthWindow}px`}}>

            <h3 className="cards__title">Топ фильмов</h3>
            <div className="cards">
                <div  className="slide__wrap">

                    <Slider {...settings}>

                        {resps[0] && resps[0].map((item, ind) => {
                            return (
                                <div key={ind}>
                                    <Card item={item}/>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>

            <h3 className="cards__title" >Популярные фильмы</h3>
            <div className="cards">

                <div className="slide__wrap">
                    <Slider {...settings}>
                        {resps[1] && resps[1].map((item, ind) => {
                            return (
                                <div key={ind}>
                                    <Card item={item} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>


            <h3 className="cards__title">Ожидаемые фильмы</h3>
            <div className="cards">
                <div className="slide__wrap">
                    <Slider {...settings}>
                        {resps[2] && resps[2].map((item, ind) => {
                            return (
                                <div key={ind}>
                                    <Card item={item} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>

            </div>




        </div>
    )
}

export default Main
