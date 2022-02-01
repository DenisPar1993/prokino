import { useState, useEffect } from 'react'
import { Routes, Route, } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import FilmDescription from '../FilmDescription/FilmDescription'
import Actors from '../Actors/Actors';
import Trailer from '../Trailer/Trailer';
import ImageBlock from '../ImageBlock/ImageBlock'
import Spinner from '../Spinner/Spinner';
import useRespondFilm from '../Service/Service';
import './FilmPage.scss'
import { } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideo, fetchImage, fetchSingleFilm } from './filmSlice';
import { fetchPopularOffset } from '../Popular/popularSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const FilmPage = ({ filmItem, boxOffice, staffFilm }) => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { filmData, loadingSingleFilm, trailUrl, loadingVideo, error } = useSelector(state => state.singleFilm)
    useEffect(() => {
        console.log(id);
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

    // const FilmPage =({filmItem,boxOffice,staffFilm})=>{
    //     const {id} = useParams()
    //     const dispatch=useDispatch();
    //     // const [imgFilm, setImgFilm]= useState([])
    //     const [activeFilter, setActiveFilter]=useState([true,false,false,false])
    //     const [activeFilm,setActiveFilm]=useState(true)
    //     const [activeImage,setActiveImage]=useState(false)
    //     const [onTrailer, setOnTrailer] = useState(false)
    //     // const [trailUrl,setTrailUrl]=useState('')
    //     const [onActors,setOnActors]=useState(false)

    //     const {filmData,loadingSingleFilm,trailUrl,loadingVideo,error}=useSelector(state=>state.singleFilm)
    //     // const {loadingPopular,popular}=useSelector(state=>state.popular)


    //     const {responseImage,responseVideos}=useRespondFilm();
    //     // const respImg = async ()=>{
    //     //       return await responseImage(filmItem.id)
    //     // }
    //     const changeActivePart=(id)=>{
    //         const newArr= activeFilter.map(item=>item=false);
    //         newArr[id]=true;
    //         setActiveFilter(newArr);
    //     }
    //     const addImage = async (id)=>{
    //         setOnTrailer(false)
    //         setOnActors(false)
    //         if(id==='film'){
    //             setActiveImage(false)
    //             setActiveFilm(true)
    //         }
    //         if(id==='image'){
    //             setActiveFilm(false)
    //             setActiveImage(true)
    //             // dispatch(fetchImage(filmData[0].id))
    //             // let imgRes= await respImg();
    //             // console.log(imgRes);
    //             // setImgFilm(imgRes.items)
    //         }

    //     }
    //     const addTrailer= async()=>{
    //         // setImgFilm([])
    //         setActiveImage(false)
    //         setOnActors(false)
    //         setActiveFilm(false)
    //         setOnTrailer(true)
    //         // dispatch(fetchVideo(filmData[0].id))
    //         console.log(filmData[0]);

    //     //    const a= await responseVideos(filmItem.id)
    //     //    setTrailUrl(a)
    //     //    console.log(a);
    //     }

    //     const addActors = ()=>{
    //         setOnTrailer(false)
    //         setActiveImage(false)
    //         setActiveFilm(false)
    //         // setImgFilm([])

    //         setOnActors(true)


    //     }
    //     useEffect(() => {
    //     //   const loa= async()=>{
    //     //     await dispatch(fetchPopularOffset(1))
    //     //     console.log(popular);
    //     //   }
    //     //   loa()

    //     //     console.log('1загрузка ', loadingSingleFilm);
    //      const dt= async (id)=>{
    //          console.log(id);
    //         await dispatch(fetchSingleFilm(id))
    //         console.log('2загрузка ', loadingSingleFilm);
    //         await console.log(filmData[0]);
    //      }
    //      dt(id)


    //     }, [id])
    // //  const load=loadingSingleFilm?<Spinner/>:null;
    // //  const errorMess= error?<ErrorMessage/>:null;
    // //  const view=!(loadingSingleFilm||error)?<View loadingVideo={loadingVideo} filmData={filmData}/>:null;

    //     return(
    //     <>
    //     {filmData?<h1>Работтттттттттааааааа</h1>:<Spinner/>}
    //    {/* {load}
    //    {errorMess}
    //    {filmData?view:null} */}

    //     </>
    //     )
    // }

    const View = ({ filmData,loadingVideo}) => {
        // const {id} = useParams()
        // const dispatch=useDispatch();
        // // const [imgFilm, setImgFilm]= useState([])
        const [activeFilter, setActiveFilter] = useState([true, false, false, false])
        // const [activeFilm,setActiveFilm]=useState(true)
        // const [activeImage,setActiveImage]=useState(false)
        // const [onTrailer, setOnTrailer] = useState(false)
        // // const [trailUrl,setTrailUrl]=useState('')
        // const [onActors,setOnActors]=useState(false)

        // const {filmData,loadingSingleFilm,trailUrl,loadingVideo,error}=useSelector(state=>state.singleFilm)

        //  console.log(activeFilter[0]);

        // const {responseImage,responseVideos}=useRespondFilm();
        // // const respImg = async ()=>{
        // //       return await responseImage(filmItem.id)
        // // }
        const changeActivePart = (id) => {
            const newArr = activeFilter.map(item => item = false);
            newArr[id] = true;
            setActiveFilter(newArr);
        }
        // const addImage = async (id)=>{
        //     setOnTrailer(false)
        //     setOnActors(false)
        //     if(id==='film'){
        //         setActiveImage(false)
        //         setActiveFilm(true)
        //     }
        //     if(id==='image'){
        //         setActiveFilm(false)
        //         setActiveImage(true)
        //         // dispatch(fetchImage(filmData[0].id))
        //         // let imgRes= await respImg();
        //         // console.log(imgRes);
        //         // setImgFilm(imgRes.items)
        //     }

        // }
        // const addTrailer= async()=>{
        //     // setImgFilm([])
        //     setActiveImage(false)
        //     setOnActors(false)
        //     setActiveFilm(false)
        //     setOnTrailer(true)
        //     // dispatch(fetchVideo(filmData[0].id))
        //     console.log(filmData[0].id);

        // //    const a= await responseVideos(filmItem.id)
        // //    setTrailUrl(a)
        // //    console.log(a);
        // }

        // const addActors = ()=>{
        //     setOnTrailer(false)
        //     setActiveImage(false)
        //     setActiveFilm(false)
        //     // setImgFilm([])

        //     setOnActors(true)


        // }
        // useEffect(() => {


        //  const loa= async ()=>{
        //    await dispatch(fetchSingleFilm(id))
        //  }
        //    loa()


        // }, [id])
        return(
            <>
            {filmData.length&&<div className="film-page">
                     <div className="discribe">
                         <div className="discribe-up">
                             <div className="discribe-up__image">
                              <img width={349} height={485} src={filmData[0]&&filmData[0].posterUrl} alt="" />
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
                                 <li><a name={0}  onClick={()=>changeActivePart(0)}>СЮЖЕТ ФИЛЬМА</a></li>
                                      <li><a onClick={()=>changeActivePart(1)} href="#">ТРЕЙЛЕР</a></li>
                                      <li><a name={1} onClick={()=>changeActivePart(2)} >КАДРЫ</a></li>
                                      <li><a href="#" onClick={()=>changeActivePart(3)}>В РОЛЯХ</a></li>
                                  </ul>
                              </nav>
                               {/* {filmItem&& <FilmDescription 
                              description = {filmItem.description}  
                              rating = {filmItem.ratingKinopoisk} 
                             />} */}
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