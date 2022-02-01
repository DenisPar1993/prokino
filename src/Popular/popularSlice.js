 import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import useRespondFilm from "../Service/Service";
 const initialState={
    popular:[],
    popularOffset:1,
    currentArr:[],
    activeFiltPopular:['Все','Все'],
    loadingPopular:false,
    popularPagination:false,
    error:false
 }
 export const fetchPopularOffset= createAsyncThunk(
    'popular/fetchPopularOffset',
    async(offset)=>{
        const {responseTop}=useRespondFilm();
        const resp = await responseTop(`/top?type=TOP_100_POPULAR_FILMS&page=${offset}`);
    
          return resp;
    }
)


 const popularSlice = createSlice({
     name: "popular",
     initialState,
     reducers: {
         activeFilterPopular:(state,action)=>{
               state.activeFiltPopular=action.payload;
         },
         setPagination:(state,action)=>{
             state.popularPagination=true;
         },
         offsetUp:(state,action)=>{
             state.popularOffset=action.payload+1
         },
     },
     
     extraReducers: (builder)=>{
         builder
              .addCase(fetchPopularOffset.pending,(state)=>{
                state.error=false;
                  state.loadingPopular=true;
              })
              .addCase(fetchPopularOffset.fulfilled,(state,action)=>{
                state.loadingPopular=false;
                state.popularPagination=false;
                   action.payload.forEach(item=>state.popular.push(item));
                   state.currentArr=action.payload;
                   state.popularOffset=state.popularOffset+1;
              })
              .addCase(fetchPopularOffset.rejected,(state)=>{
                  state.loadingPopular=false
                  state.error=true;
              })
     }
 })


 export const {actions,reducer}= popularSlice;
 export default reducer;
 export const {
    activeFilterPopular,
    offsetUp,
    setPagination
 }=actions