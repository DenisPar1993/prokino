import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import FilmDescription from '../FilmDescription/FilmDescription'
import Actors from '../Actors/Actors';
import Trailer from '../Trailer/Trailer';
import ImageBlock from '../ImageBlock/ImageBlock'
import Spinner from '../Spinner/Spinner';
import './FilmPage.scss'
import { } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchSingleFilm } from './filmSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const FilmPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { filmData, loadingSingleFilm,  loadingVideo, error } = useSelector(state => state.singleFilm)
    useEffect(() => {
        dispatch(fetchSingleFilm(id))
    }, [id])
       const load=loadingSingleFilm?<Spinner/>:null;
      const errorMess= error?<ErrorMessage/>:null;
      const view=!(loadingSingleFilm||error)?<View loadingVideo={loadingVideo} filmData={filmData}/>:null;
    return(
        <>
         {load}
         {errorMess}
         {view}
        </>
    )

}

    const View = ({ filmData,loadingVideo}) => {
        
        const [activeFilter, setActiveFilter] = useState([true, false, false, false])
        const changeActivePart = (id) => {
            const newArr = activeFilter.map(item => item = false);
            newArr[id] = true;
            setActiveFilter(newArr);
        }
        return(
            <>
            {filmData.length&&<div className="film-page">
                     <div className="discribe">
                         <div className="discribe-up">
                             <div className="discribe-up__image">
                              <img className='big-image' src={filmData[0]&&filmData[0].posterUrl} alt="" />
                             </div>
                             <div className="discribee-up__list">
                                 <div className="discribee-up__title">
                                 {filmData[0].nameRu?filmData[0].nameRu:filmData[0].nameOrig}
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Год</div>
                                   <div className="discribe__item-value">{filmData[0]&&filmData[0].year}</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Страна</div>
                                <div className="discribe__item-value">{filmData[0]&&filmData[0].country}</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Сборы в мире</div>
                                     <div className="discribe__item-value">{filmData[1]}</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Жанр </div>
                                 <div className="discribe__item-value"> {filmData[0].genre}</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Продолжительность </div>
                         <div className="discribe__item-value">{filmData[0].filmLength} мин</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Возраст</div>
                                 <div className="discribe__item-value">{filmData[0].age}+</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Режиссёр</div>
                                     <div className="discribe__item-value">
                                         {filmData[2].director}</div>
                                 </div>
                                 <div className="discribe__item">
                                     <div className="discribe__item-name">Оператор</div>
                                     <div className="discribe__item-value">
                                     {filmData[2].operator}</div>
                                 </div>
                             </div>
                         </div>
                         <div className="discribe-down">
                             <nav>
                                 <ul className="discribe__menu">
                                 <li><a name={0} className='discribe__menu-link' onClick={()=>changeActivePart(0)}>СЮЖЕТ ФИЛЬМА</a></li>
                                      <li><a className='discribe__menu-link'  onClick={()=>changeActivePart(1)} href="#">ТРЕЙЛЕР</a></li>
                                      <li><a name={1} className='discribe__menu-link' onClick={()=>changeActivePart(2)} >КАДРЫ</a></li>
                                      <li><a href="#" className='discribe__menu-link' onClick={()=>changeActivePart(3)}>В РОЛЯХ</a></li>
                                  </ul>
                              </nav>
                            {activeFilter[0] && <FilmDescription 
                         description = {filmData[0].description}  
                         rating = {filmData[0].ratingKinopoisk} 
                         />}
                         {activeFilter[2] && <ImageBlock images={filmData[4]} />}
                         {activeFilter[1]&& (loadingVideo?<Spinner/>:<Trailer trail={filmData[3]} />)}
                         { activeFilter[3]&& <Actors actors={filmData[2].actors} />}
                        </div>
                    </div>
             </div>}
             </>
        )
    }
    export default FilmPage