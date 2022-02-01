import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router';
import './App.scss';
import { useSelector,useDispatch } from 'react-redux';

import { Navigation, Pagination } from 'swiper';

import "slick-carousel/slick/slick.css";
import Header from './Header/Header';

import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import FilmPage from './FilmPage/FilmPage';
import Main from './Main/Main';
import Spinner from './Spinner/Spinner';
import FilmSearch from './FilmSearch/FilmSearch';
import useRespondFilm from './Service/Service';
import Premiers from './Premiers/Premiers';
import Popular from './Popular/Popular';
import SideFilter from './SideFilter/SideFilter';
import Footer from './Footer/Footer';
// import { useParams } from 'react-router-dom';
// import {addSerials,addPremiers,fetchSerials} from './actions';
import { fetchSingleFilm } from './FilmPage/filmSlice';
import { fetchPremier } from './Premiers/premierSlice';
// import { fetchSerials } from './Serials/serialsSlice';
import Top from './top/Top';
import ErrorMessage from './ErrorMessage/ErrorMessage';

function App() {
    const { responseId, responseBoxOffice, responseStaff, resposeSearch, responsePremier,responseSerials } = useRespondFilm();
    // console.log(useParams());
    const [filmItem, setFilmItem] = useState(null)
    const [boxOffice, setBoxOffice] = useState(null)
    // const [searchFilm, setSearchFilm] = useState(null)
    const [staffFilm, setStaffFilm] = useState(null)
    // const [premiers, setPremiers] = useState(null)
    // const [serials, setSerials] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filt, setFilt] = useState('Все')
    const {serials,premiers,searchFilm}=useSelector(state=>state);
    const dispatch=useDispatch();
   
    const arrStaff = {}
    const onFilmPage = (id) => {
        responseId(id).then(res => setFilmItem(res));
        responseBoxOffice(id).then(res => setBoxOffice(res));
        responseStaff(id).then(res => setStaffFilm(res));
    }
    // const arrFilm=async()=>{
    //      Promise.all([
    //         responseId(301),
    //         responseBoxOffice(301),
    //         responseStaff(301)
    //     ]).then(res=>console.log(res))
    // }
    // arrFilm();
    // const onSearch = async (search) => {
    //     const res = await resposeSearch(search);
    //     const z = res.films.map(item => {
    //         return { ...item, id: item.filmId }
    //     })
    //     console.log(z);
    //     setSearchFilm(z)

    // }
    // dispatch(fetchSingleFilm(301))
    
    const onFilt=(name)=>{
       setFilt(name)
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    let renderFilt = []
    if(filt==='Все'){
        renderFilt=premiers
    }else{
       console.log(premiers.countries);
    }
    useEffect(() => { 
       dispatch(fetchPremier())
       fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters',{
        method: 'GET',
        headers: {
            'X-API-KEY': '9e8a516e-69e2-4800-815b-cc50b900a5c8',
            'Content-Type': 'application/json',
        }
    }).then(res=>res.json()).then(res=>console.log(res))
    //    dispatch(fetchSerials())
    //    dispatch(fetchSingleFilm(301))
    }, [])
   

    return (
        <div className="App">
            <Header  />
            {/* <Spinner /> */}

            {/* <FilmPage /> */}
            <div className="films">

                <div className="container">
                    <Routes>
                        <Route path="/" element={< Main
                            // filt = {filt}
                            // onFilmPage={(id) => onFilmPage(id)}
                        />} />
                        <Route path="/top" element={< Top/>} />
                        <Route path="/filmsearch/:word" element={< FilmSearch/>} />
                         <Route path="/popular" element={< Popular/>} />
                        <Route path="/premiers" element={< Premiers/>} />
                        <Route path="/filmpage/:id" exact element={< FilmPage/>} />
                        <Route path="*" element={< ErrorMessage/>} />

                    </Routes>
                </div>
                {/* {premiers&& <Premiers item={premiers} />} */}
            </div>

            <Footer />

        </div>
    );
}

export default App;
