import './Card.scss'
import { Link } from 'react-router-dom';


const Card = ({item})=>{
    
    return(
        <div  className="card">
               <Link   to={`/filmpage/${item.id}`}><img width={190} height={266} src={item.posterUrl} alt=""/></Link> 
                
                <h5 > <Link to={`/filmpage/${item.id}`}>{item.nameRu?item.nameRu:item.nameOriginal}</Link> </h5>
                <span >{item.genre}, {item.year}</span>
                
            </div>
    )
}
export default Card;