import './Card.scss'
import { Link } from 'react-router-dom';
import { fetchSingleFilm } from '../FilmPage/filmSlice';
import { useDispatch } from 'react-redux';


const Card = ({item,onFilmPage})=>{
    // const adr=useParams()
    // console.log(adr.id);
   const dispatch=useDispatch();
    const onPage=(id)=>{
        // dispatch(fetchSingleFilm(id))
        //
    }
    
    return(
        <div onClick={()=>onPage(item.id)}  className="card">
               <Link   to={`/filmpage/${item.id}`}><img width={190} height={266} src={item.posterUrl} alt=""/></Link> 
                
                <h5 > <a href=''>{item.nameRu?item.nameRu:item.nameOriginal}</a> </h5>
                <span >{item.genre}, {item.year}</span>
                
            </div>
    )
}
export default Card;