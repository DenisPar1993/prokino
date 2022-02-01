import React from 'react'
import './SideFilter.scss'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {filterSerials} from '../actions'
import { v4 as uuidv4 } from 'uuid';

function SideFilter({onFilter,name,valueArr}) {
    const dispatch = useDispatch()
    const [genre, setGenre]=useState('Все')
    const [country,setCountry]=useState('Все')

const Filt=(e)=>{
    
    onFilter({val:e.target.value, name:name})
    
}


    return (
        <div className='filter'>
            <select onChange={Filt} defaultValue={"Все"} name={name} id="123">
                {valueArr.map((item,i)=>{
                    return(
                        i==0?<option key={i}   value='Все'>Все</option>:
                        <option key={i} value={item}>{item}</option>
                    )
                })}
            {/* <option selected value='Все'>Все</option>
                <option  value='США'>США</option>
                <option value='Россия'>Россия</option>
                <option value='Франция'>Франция</option> */}
            </select>
        </div>
    )
}

export default SideFilter
