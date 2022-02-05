import React from 'react';
import Card from '../Card/Card';
import SideFilter from '../SideFilter/SideFilter';
import { useState,useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useSelector,useDispatch } from 'react-redux';
import { filtPremiers,fetchPremier } from './premierSlice';
import './Premiers.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { v4 as uuidv4 } from 'uuid';

function Premiers({item,filt}) {
    const {loadingPremiers,error}=useSelector(state=>state.premier)
    const load = loadingPremiers?<Spinner />:null;
    const ErrorMess=error?<ErrorMessage/>:null;
    const view = !loadingPremiers||!error?<View />:null;
    
    return (
        <>
        {load}
        {ErrorMess}
        {view}
        </>
    )
}

const View=()=>{
    const filterPremiers=useSelector(state=>{
        const prem= state.premier;
        if(prem.activeFiltPremier[0]==='Все'&&prem.activeFiltPremier[1]==='Все'){
            return prem.premiers
        }else{

            const filtCountries=prem.premiers.filter(item=>{
                if(prem.activeFiltPremier[0]==='Все'){
                    return item
                }else{
                    return item.countries.length>0&&item.countries[0].country===prem.activeFiltPremier[0]
                }
            })
            const filtArr=filtCountries.filter(item=>{
                if(prem.activeFiltPremier[1]=='Все'){
                    return item
                }else{
                  return item.genres.length>0&&item.genres[0].genre===prem.activeFiltPremier[1]
                }
            })
            return filtArr
            
        }
    })
    
    const [genre, setGenre]=useState('Все')
    const [country,setCountry]=useState('Все')
    useEffect(()=>{
     setGenre('Все');
     setCountry('Все');
     dispatch(filtPremiers(['Все','Все']))
     dispatch(fetchPremier())

    },[])
    const dispatch = useDispatch();
    const onFilter=(elem)=>{ 
      if(elem.name=='country'){
     setCountry(elem.val)
     dispatch(filtPremiers([elem.val,genre]))
     
      }else if(elem.name=='genre'){
         setGenre(elem.val)
         dispatch(filtPremiers([country,elem.val]))
        
      }
      
      }
    return(
        <div className="premiers">
        <div className="premiers-filt">
        <SideFilter onFilter={(elem)=>onFilter(elem)} name={'country'} valueArr={["Все", "США", "Россия", "Франция"]} />
        
        <SideFilter onFilter={(elem)=>onFilter(elem)} name={'genre'} valueArr={["Все", "фантастика", "драма", "боевик","триллер","комедия","мелодрама","мультфильм","ужасы","детектив"]} />
        </div>
    <div className='premiers-inner'>
    <div className="premiers-wrap">
        {filterPremiers&& filterPremiers.map(item=>{
            return (
                <Card key={uuidv4()} item={item}/>
            )
        })}
       </div>
    </div>
    </div> 
    )
}

export default Premiers
