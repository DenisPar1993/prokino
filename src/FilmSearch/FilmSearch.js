import React, { useEffect } from 'react'
import Card from '../Card/Card'
import { useParams } from 'react-router';
import './filmSearch.scss';
import Spinner from '../Spinner/Spinner';
import { useSelector,useDispatch } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchSearch } from './sliceSearch';
import { v4 as uuidv4 } from 'uuid';
function EmptySeach(){
    return(
        <h3>По вашему запросу ничего не найдено</h3>
    )
}
function FilmSearch() {
    const {word}=useParams();
         const dispatch=useDispatch()
         useEffect(()=>{
                   dispatch(fetchSearch(word))
               },[word])
    const {searchFilm,loadingSearch,error}=useSelector(state=>state.search)
   const load=loadingSearch?<Spinner />:null;
   const errorMess= error?<ErrorMessage/>:null;
   const view=!(loadingSearch||error)?<View search={searchFilm}/>:null;
    return (
        <>
    {load}
    {errorMess}
    {view}
    </>
    )
}

const View=({search})=>{
    
    return(
        <div className='film-search'>
        {search.length?search.map(item=>{
            return (
                <Card key={uuidv4()} item={item}
                           />
            )
        }):<EmptySeach />} 
        </div> 
    )
}

export default FilmSearch
