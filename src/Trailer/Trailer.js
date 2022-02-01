import React from 'react'
const NoData=()=>{
    return(
        <div>  Нет данных </div>
    )
}

function Trailer({trail}) {
    return (
        <div>
           {trail? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trail}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>:<NoData /> }
        </div>
    )
}

export default Trailer
