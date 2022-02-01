import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useRespondFilm from "../Service/Service";
const initialState={
    filmData:[],
    loadingSingleFilm:false,
    error:false
}

export const fetchSingleFilm=createAsyncThunk(
    'singleFilm/fetchSingleFilm',
    async (id)=>{
        console.log(id);
        const {responseId, responseBoxOffice, responseStaff,responseVideos,responseImage,resposeSearch,responseTop}=useRespondFilm();
         const arrFilm= await Promise.all([
           responseId(id),
           responseBoxOffice(id),
           responseStaff(id),
           responseVideos(id),
           responseImage(id)
         ]).then(res=>res)
         console.log(arrFilm);
         return arrFilm;
    }
)

const filmSlice=createSlice({
    name:'singleFilm',
    initialState,
    extraReducers:(builder)=>{
        builder
              .addCase(fetchSingleFilm.fulfilled,(state,action)=>{
                         
                          state.filmData=action.payload;
                          state.loadingSingleFilm=false; 
                          
              })
              .addCase(fetchSingleFilm.pending,state=>{
                state.error=false;
                  state.loadingSingleFilm=true;
              })
              .addCase(fetchSingleFilm.rejected,(state)=>{
                  state.error=true;
                  state.loadingSingleFilm=false;
              })
             
    }
})

const {reducer}=filmSlice;
export default reducer;