import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useRespondFilm from "../Service/Service";
const initialState={
    searchFilm:[],
    loadingSearch:false,
    error:false
}
export const fetchSearch=createAsyncThunk(
    'search/searchResp',
    async (val)=>{
        const {resposeSearch}=useRespondFilm();
        const res= await resposeSearch(val);
        const seachArr= res.films.map(item => {
            return { ...item, id: item.filmId }
        })
        return seachArr;
    }
)



const searchSlice=createSlice({
    name:'search',
    initialState,
    extraReducers:(builder)=>{
        builder
               .addCase(fetchSearch.fulfilled,(state,action)=>{
                     state.searchFilm=action.payload;
                     state.loadingSearch=false
               })
               .addCase(fetchSearch.pending,state=>{
                   state.error=false;
                   state.loadingSearch=true;
               })
               .addCase(fetchSearch.rejected,state=>{
                   state.loadingSearch=false;
                   state.error=true;
               })
    }

})

const {actions,reducer}=searchSlice;
export default reducer;
