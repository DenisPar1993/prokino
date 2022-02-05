import React from 'react';
import Card from '../Card/Card';
import SideFilter from '../SideFilter/SideFilter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTop,fetchTopOffset,activeFilterTop,setPagination } from './topSlice';
import './top.scss';
import { v4 as uuidv4 } from 'uuid';


function Top() { 
    const {loadingTop,error}=useSelector(state=>state.top)   
    const load= loadingTop?<Spinner />:null;
    const view= !(loadingTop&&error)?<View />:null;
    const errMess= error?<ErrorMessage />:null;
       
    return (
        <>
        {errMess}
        {load}
        {view}
        </>
      
    )
}


const View=()=>{
    const {topOffset,loadingTop,loadPagination,error,currentArr}=useSelector(state=>state.top)   
    const filterTop = useSelector(state=>{
        const topState= state.top
       if (topState.activeFiltTop[0]==='Все'&&topState.activeFiltTop[1]==='Все'){
           return topState.top;
       }else{
        const filtCountries=topState.top.filter(item=>{
              if(topState.activeFiltTop[0]==='Все'){
                  return item
              }else{
               return item.country===topState.activeFiltTop[0]
              }

        })
        const filtArr = filtCountries.filter(item=>{
            if(topState.activeFiltTop[1]==='Все'){
                return item
            }else{
                return item.genre===topState.activeFiltTop[1]
            }
        })
        return filtArr;
       }
        
    })
   
    const [genre, setGenre]=useState('Все')
    const [country,setCountry]=useState('Все')
    const dispatch = useDispatch()
    const scrollTest=(e)=>{
        if(e.target.documentElement.scrollHeight-window.innerHeight-e.target.documentElement.scrollTop<100){
            console.log('работает Пагинация');
            dispatch(setPagination())   
        }
    }
    useEffect(()=>{
       if(topOffset==1||currentArr.length&&!error){
        dispatch(fetchTopOffset(topOffset))
       }
        
    },[loadPagination])
    useEffect(()=>{
        setGenre('Все');
        setCountry('Все');
        dispatch(activeFilterTop(['Все','Все']))
        window.addEventListener("scroll", scrollTest);
        return () => window.removeEventListener("scroll",scrollTest);
   
       },[])
    const onFilter=(elem)=>{ 
        if(elem.name=='country'){
       setCountry(elem.val)
       dispatch(activeFilterTop([elem.val,genre]))
        }else if(elem.name=='genre'){
           setGenre(elem.val)
           dispatch(activeFilterTop([country,elem.val]))
        }  
    }
return (
    <div className="top">
            
            <div className="top-filt">
            <SideFilter onFilter={onFilter} name={'country'}  valueArr={["Все", "США", "Россия", "Франция"]}/>
         <SideFilter onFilter={onFilter} name={'genre'} valueArr={["Все", "фантастика", "драма", "боевик","триллер","комедия","мелодрама","мультфильм","ужасы","детектив",'фэнтези','документальный']} />
            </div>

         
        <div className='top-inner'>
           <div className="top-wrap">
             {filterTop&& filterTop.map(item=>{
                return (
                    <Card key={uuidv4()} item={item} />
                )
            })}
            </div>
        </div>
        
        </div>
)
}
export default Top;
