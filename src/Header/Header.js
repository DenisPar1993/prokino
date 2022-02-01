import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';
import logo from './logo.svg'
import search from './search.svg'
import useRespondFilm from '../Service/Service';
import { useSelector,useDispatch } from 'react-redux';
import { searchFilm } from '../actions';
import {fetchSearch} from '../FilmSearch/sliceSearch';

const Header = ()=>{
    let history= useNavigate();
    const {resposeSearch}=useRespondFilm()
    const [valueInp, setValueInp]=useState('')
    const dispatch= useDispatch()

    const takeInpute =(e)=>{
       setValueInp(e.target.value);
     
    }
    const submitSearch= async (e)=>{
     e.preventDefault();
     if(valueInp){
        history(`/filmsearch/${valueInp}`);
        setValueInp('');
     }
    }
    
    return(
        <header className="header">
        <div className="container">
            <div className="menu">
               <Link to='/'> <img src={logo} alt=""/></Link>
                <nav >
                    <ul className="header__menu">
                        <li><Link to="/top">Фильмы</Link></li>
                        <li><Link to="/popular">Популярное</Link></li>
                        <li><Link to="/premiers">Премьеры</Link></li>
                    </ul>
                </nav>
                <div className="search__block">
                    <form action="" onSubmit={submitSearch}>
                <input onChange={takeInpute} value={valueInp} placeholder="Поиск..." className="search" type="text"/>
                <img className='search-img' onClick={submitSearch} src={search} alt="search-image"/>
            </form>
            </div>
            </div>
        </div>
    </header>
    )
}
export default Header