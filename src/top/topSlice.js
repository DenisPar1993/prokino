import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import useRespondFilm from "../Service/Service";
 const initialState={
    top:[],
    topOffset:1,
    currentArr:[],
    activeFiltTop:['Все','Все'],
    loadingTop:false,
    loadPagination:false,
    error:false
 }

 export const fetchTopOffset= createAsyncThunk(
    'top/fetchTopOffset',
    async(offset)=>{
        const {responseTop}=useRespondFilm();
        const resp = await responseTop(`/top?type=TOP_250_BEST_FILMS&page=${offset}`);
          return resp;
    }
)

 const topSlice = createSlice({
     name: "top",
     initialState,
     reducers: {
         activeFilterTop:(state,action)=>{
               state.activeFiltTop=action.payload;
         },
         setPagination:(state,action)=>{
             state.loadPagination=true;
         },
         offsetUp:(state,action)=>{
             state.topOffset=action.payload+1
         }
     },
     
     extraReducers: (builder)=>{
         builder
              .addCase(fetchTopOffset.pending,(state)=>{
                state.error=false;
                  state.loadingTop=true;
              })
              .addCase(fetchTopOffset.rejected, (state)=>{
                state.loadingTop=false;
                state.error= true;  
              })
              .addCase(fetchTopOffset.fulfilled,(state,action)=>{
                   action.payload.forEach(item=>state.top.push(item));
                   state.currentArr=action.payload;
                   state.loadingTop=false;
                   state.loadPagination=false;
                   state.topOffset=state.topOffset+1;
              })
     }
 })


 export const {actions,reducer}= topSlice;
 export default reducer;
 export const {
    activeFilterTop,
    offsetUp,
    setPagination
 }=actions