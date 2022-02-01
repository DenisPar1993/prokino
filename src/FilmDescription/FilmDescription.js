import React from 'react'

function FilmDescription({ description, rating, active }) {
    return (
        <>
        <div className='wrap-film'>
            <div className="discribe-down__text">
                {description}
            </div>
            <div className="rating">
                <h5 className="rating__title">РЕЙТИНГ ФИЛЬМА</h5>
                <div className="pragress">
                    <div className="progress__wrapper">
                        <div style={{ width: `${rating * 10}%` }} className="progress__inner"></div>
                    </div>
                    <span className="rate-value">{rating} </span>
                </div>
            </div>
            </div>
        </>
    )
}

export default FilmDescription
