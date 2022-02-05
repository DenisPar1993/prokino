import React from 'react';
import Card from '../Card/Card';
import SideFilter from '../SideFilter/SideFilter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { activeFilterPopular, fetchPopularOffset ,setPagination} from './popularSlice';
import './popular.scss';
import { v4 as uuidv4 } from 'uuid';

 

function Popular() {
const {error,loadingPopular}=useSelector(state=>state.popular)
const load= loadingPopular?<Spinner />:null;
    const view= !loadingPopular||!error?<View />:null; 
   const errMess= error?<ErrorMessage />:null;
   
  return (
      <>
      {errMess}
     {load} 
     {view}
      </>
    
  );
}
const View =()=>{
    const {popularOffset,popularPagination,error,currentArr}=useSelector(state=>state.popular)
    const dispatch = useDispatch()
    const filterPopular = useSelector(state=>{
        const popularState= state.popular
       if (popularState.activeFiltPopular[0]==='Все'&&popularState.activeFiltPopular[1]==='Все'){
           return popularState.popular;
       }else{
        const filtCountries=popularState.popular.filter(item=>{
              if(popularState.activeFiltPopular[0]==='Все'){
                  return item
              }else{
               return item.country===popularState.activeFiltPopular[0]
              }

        })
        const filtArr = filtCountries.filter(item=>{
            console.log(item);
            if(popularState.activeFiltPopular[1]==='Все'){
                return item
            }else{
                return item.genre===popularState.activeFiltPopular[1]
            }
        })
        return filtArr;
       }
        
    })
    const scrollTest=(e)=>{
        if(e.target.documentElement.scrollHeight-window.innerHeight-e.target.documentElement.scrollTop<100){  
            console.log('Сробатывает пагинация');
            dispatch(setPagination())
        }
    }
    useEffect(()=>{
          if( popularOffset==1|| currentArr.length){
            dispatch(fetchPopularOffset(popularOffset))
          }
        
    },[popularPagination])
    useEffect(()=>{
        setGenre('Все');
        setCountry('Все');

        dispatch(activeFilterPopular(['Все','Все']))
        window.addEventListener("scroll", scrollTest);
        return () => window.removeEventListener("scroll",scrollTest);
   
       },[])
    const [genre, setGenre]=useState('Все')
    const [country,setCountry]=useState('Все')
    const onFilter=(elem)=>{ 
        if(elem.name=='country'){
       setCountry(elem.val)
       dispatch(activeFilterPopular([elem.val,genre]))
        }else if(elem.name=='genre'){
           setGenre(elem.val)
           dispatch(activeFilterPopular([country,elem.val]))
        }  
    }
    return (
        <div className='popular'>
            
             <div className="popular-filt">
             <SideFilter onFilter={onFilter} name={'country'}  valueArr={["Все", "США", "Россия", "Франция"]}/>
          <SideFilter onFilter={onFilter} name={'genre'} valueArr={["Все", "фантастика", "драма", "боевик","триллер","комедия","мелодрама","мультфильм","ужасы","детектив",'фэнтези','документальный']} />
             </div>
    
         
         <div className='popular-inner'>
         <div className="popular-wrap">
              {filterPopular&& filterPopular.map(item=>{
                 return (
                     <Card key={uuidv4()} item={item}
                                  />
                 )
             })}
             </div>
         </div>
        
         </div>
    )
}

export default Popular;

