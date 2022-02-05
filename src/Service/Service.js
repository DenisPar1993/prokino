// import { offsetUp } from "../Popular/popularSlice";

const useRespondFilm=()=>{
const _apiBase ='https://kinopoiskapiunofficial.tech/api/v2.2/films';
const _apiSet={
    method: 'GET',
    headers: {
        'X-API-KEY': '9e8a516e-69e2-4800-815b-cc50b900a5c8',
        'Content-Type': 'application/json',
    }
}
const date=new Date;
const arrMouths=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
const mouth= date.getMonth()
const responseTop= async(url)=>{
    const req= await fetch(`${_apiBase}${url}`,_apiSet)
     const resw = await req.json();
     const film = resw.films.map(transformTop)
    return film
}
const responseId = async(id)=>{
    const resp= await fetch (`${_apiBase}/${id}`,_apiSet)
    const respJson = await resp.json();
    return TransformFilm(respJson);
}
const responseImage = async(id)=>{
    const resp= await fetch (`${_apiBase}/${id}/images`,_apiSet)
    const respJson = await resp.json();
    return respJson;
}
const responseVideos = async(id)=>{
    const resp= await fetch (`${_apiBase}/${id}/videos`,_apiSet)
    const respJson = await resp.json();
     let lem= '';
     respJson.items.forEach(item=>{
        if(item.site==='YOUTUBE'){
            lem= item.url
        }
    })
    if(lem===''){
        return
    }
    let zet= lem.slice(lem.length-11,lem.length)
    return zet;
}
const responseBoxOffice = async(id)=>{
    const resp= await fetch (`${_apiBase}/${id}/box_office`,_apiSet)
    const respJson = await resp.json();
    if(respJson.items[0]){
        return respJson.items[0].amount+respJson.items[0].symbol;
    }
    return 'Нет данных'   
} 
 
const resposeSearch = async (name)=>{
    const resp= await fetch (`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}&page=1`,_apiSet)
    const respJson = await resp.json();
    return respJson;
}
const responsePremier =async()=>{
    const resp= await fetch (`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${arrMouths[mouth]}`,_apiSet);
    const respJson = await resp.json();
    return respJson.items;
    
}
const responseSerials =async(offset=1)=>{
    const resp= await fetch (`https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&order=RATING&type=ALL&ratingFrom=8&ratingTo=10&yearFrom=2000&yearTo=2021&page=${offset}`,_apiSet);
    const respJson = await resp.json();
    return respJson.items;
}

const responseStaff=async(id)=>{
    const arrStaff={};
    const actors=[];
 const resp= await  fetch (`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`,_apiSet)
 const respJson = await resp.json();
  respJson.forEach(item=>{
         if  (item.professionKey=='DIRECTOR'){   
        arrStaff.director=item.nameRu
    }
    if  (item.professionKey=="WRITER"){   
        arrStaff.writer=item.nameRu
    }
    if  (item.professionKey=="OPERATOR"){   
        arrStaff.operator=item.nameRu
    }
    if(item.professionKey=="ACTOR"){
        actors.push({name:item.nameRu, image:item.posterUrl,description:item.description})
        arrStaff.actors=actors
    }
 })
 return arrStaff;

}
const TransformFilm = (char)=>{
      
        return{
            id:char.kinopoiskId,
            posterUrl:char.posterUrl,
            nameRu:char.nameRu,
            nameOrig:char.nameOriginal,
            genre:char.genres[0].genre,
            year:char.year,
            filmLength:char.filmLength,
            age:char.ratingAgeLimits.slice(3,char.ratingAgeLimits.length),
            description:char.description,
            ratingKinopoisk:char.ratingKinopoisk,
            country:char.countries[0].country
        }
      
}

const TransformStaff = (char)=>{
    let boxOffice=[];
    char.forEach(item=>{
        if  (item.professionKey=='DIRECTOR'){
            console.log(item.nameRu);   
            boxOffice.director=item.nameRu
        }
        if  (item.professionKey=="WRITER"){   
            boxOffice.writer=item.nameRu
        }
        if  (item.professionKey=="OPERATOR"){   
            boxOffice.operator=item.nameRu
        }
    })
    return console.log(boxOffice);
}

const transformTop=(char)=>{
            return{
                id:char.filmId,
                posterUrl:char.posterUrl,
                nameRu:char.nameRu,
                genre:char.genres[0].genre,
                year:char.year,
                filmLength:char.filmLength,
                age:char.ratingAgeLimits,
                description:char.description,
                ratingKinopoisk:char.ratingKinopoisk,
                country:char.countries[0].country
            }
    }  
    return{transformTop,responseTop,responseId,responseBoxOffice ,responseStaff,responseImage,responseVideos,resposeSearch,responsePremier,responseSerials }
    

   
}



export default useRespondFilm

