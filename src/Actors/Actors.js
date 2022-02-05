import React from 'react'
import './actors.scss'
import { v4 as uuidv4 } from 'uuid';

function Actors({ actors }) {
    return (


        <div className='actors'>
            {actors.map(item => {
                return (
                    <div key={uuidv4()} className='actors-wrapper'>
                        <div className="actors-image">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="actors-desc">
                            <div className="actors-name">
                                {item.name}
                            </div>
                            <div className="actors-role">
                                {item.description}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Actors
