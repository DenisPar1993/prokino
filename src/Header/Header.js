import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './Header.scss';
import logo from './logo.svg'
import search from './search.svg'


const Header = ()=>{
    let history= useNavigate();
    const [valueInp, setValueInp]=useState('')
    const [activeOn, setActiveOn]=useState(false)
    
    const handleActiveOn= ()=>{
      setActiveOn(!activeOn)
    }
    const delActiveLogo=()=>{
      setActiveOn(false)
    }
    const takeInpute =(e)=>{
       setValueInp(e.target.value);
    }

    useEffect(()=>{
      document.querySelector('body').style.overflow=activeOn?'hidden':'auto';
    },[activeOn])


    const submitSearch= async (e)=>{
     e.preventDefault();
     if(valueInp){
      setActiveOn(false)
        history(`/filmsearch/${valueInp}`);
        setValueInp('');
     }
    }
    const addSub=(e)=>{
      e.preventDefault();
      if(activeOn){
          setActiveOn(false)
        history(e.target.name)
        setActiveOn(false)
        
      }else{
        history(e.target.name)
      }
    
    }
    
    return(
        <header className="header">
        <div className="container">
            <div className="menu">
            <Link onClick={delActiveLogo} name='/'  to='/'> <img className='logo' src={logo} alt=""/></Link>
                
                <div onClick={handleActiveOn} className="burger active-burger">
                   <div className="burger__line"></div>
                   <div className="burger__line"></div>
                   <div className="burger__line"></div>
               </div>
                <nav className='burg' >
                    <ul className={activeOn?"header__menu-active":"header__menu"}>
                        <li className='header__menu-item'><Link onClick={addSub} name={"/top"} to="/top">Фильмы</Link></li>
                        <li className='header__menu-item'><Link onClick={addSub} name={"/popular"} to="/popular">Популярное</Link></li>
                        <li className='header__menu-item'><Link onClick={addSub} name={'/premiers'} to="/premiers">Премьеры</Link></li>
                    </ul>
                </nav>
                <div className={activeOn?"active-search":"search__block"}>
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