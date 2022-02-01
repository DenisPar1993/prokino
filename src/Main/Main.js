import React from 'react'
import Slider from "react-slick";
import Card from '../Card/Card';
import useRespondFilm from '../Service/Service';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState,useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTops,fetchPopular,fetchAwaits,fetchResp } from './mainSlice';

import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import "slick-carousel/slick/slick.css";

const Main = ({onFilmPage,filt}) => {
    const {resps,loadingMain,error}=useSelector(state=>state.main);
    console.log(resps);
    
    const dispatch=useDispatch();
    const load= loadingMain?<Spinner />:null;
    const view= !(loadingMain&&error)?<View resps={resps} />:null;
    const errMess= error?<ErrorMessage />:null;
    useEffect(()=>{
        if(resps.length==0){
            dispatch(fetchResp());
        }
       
    },[])
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };

      return(
          <>
          {load}
          {view}
          {errMess}
          </>
      )
   
    // return (
    //   loadingMain||!resps?<Spinner />:<div className="film__wrapper">
            
    //                     <h3 className="cards__title">Топ фильмов</h3>
    //                     <div className="cards">
    //                         <div className="slide__wrap">
                               
    //                         <Slider {...settings}>
                            
    //                              {resps[0] && resps[0].map((item, ind) => {
    //                                  return (
    //                                      <div key={ind}>
    //                              <Card item={item}
    //                              onFilmPage={(id)=>onFilmPage(id)}/>
    //                              </div>
    //                                                   )
    //                                                   })}
    //                         </Slider>
    //                         </div>
    //                     </div>

    //                     <h3 className="cards__title">Популярные фильмы</h3>
    //                     <div className="cards">
                            
    //                         <div className="slide__wrap">
    //                         <Slider {...settings}>  
    //                          {resps[1] && resps[1].map((item, ind) => {
    //                                  return (
    //                                      <div key={ind}>
    //                              <Card item={item}
    //                              onFilmPage={(id)=>onFilmPage(id)}/>
    //                              </div>
    //                                                   )
    //                                                   })}
    //                         </Slider>
    //                         </div>
    //                     </div>


    //                     <h3 className="cards__title">Ожидаемые фильмы</h3>
    //                     <div className="cards">
    //                     <div className="slide__wrap">
    //                         <Slider {...settings}>
    //                         {resps[2] && resps[2].map((item, ind) => {
                                
    //                                  return (
    //                                      <div key={ind}>
    //                              <Card item={item}
    //                              onFilmPage={(id)=>onFilmPage(id)} />
    //                              </div>
    //                                                   )
    //                                                   })}
    //                         </Slider>
    //                         </div>

    //                     </div>


                       

    //                 </div>
    // )
}
const View =({resps})=>{
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };
return (
      resps.length&&<div className="film__wrapper">
            
                        <h3 className="cards__title">Топ фильмов</h3>
                        <div className="cards">
                            <div className="slide__wrap">
                               
                            <Slider {...settings}>
                            
                                 {resps[0] && resps[0].map((item, ind) => {
                                     return (
                                         <div key={ind}>
                                 <Card item={item}
                                //  onFilmPage={(id)=>onFilmPage(id)}
                                 />
                                 </div>
                                                      )
                                                      })}
                            </Slider>
                            </div>
                        </div>

                        <h3 className="cards__title">Популярные фильмы</h3>
                        <div className="cards">
                            
                            <div className="slide__wrap">
                            <Slider {...settings}>  
                             {resps[1] && resps[1].map((item, ind) => {
                                     return (
                                         <div key={ind}>
                                 <Card item={item}
                                //  onFilmPage={(id)=>onFilmPage(id)}
                                 />
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
                                 <Card item={item}
                                //  onFilmPage={(id)=>onFilmPage(id)} 
                                 />
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
