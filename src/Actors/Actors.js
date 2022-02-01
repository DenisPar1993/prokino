import React from 'react'
import './actors.scss'

function Actors({ actors }) {
    console.log(actors);
    return (


        <div className='actors'>
            {actors.map(item => {
                return (
                    <div className='actors-wrapper'>
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
