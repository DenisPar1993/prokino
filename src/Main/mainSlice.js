import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useRespondFilm from "../Service/Service";

const initialState={
    searchFilm:[],
    resps:[],
    loadingMain:false,
    error:false,
    activeResp:false
}

export const fetchResp = createAsyncThunk(
    'main/fetchResp',
    async ()=>{
      const {responseTop}=useRespondFilm();
      
      const ResponseMain= await Promise.all([
        responseTop('/top?type=TOP_250_BEST_FILMS&page=1'),
        responseTop('/top?type=TOP_100_POPULAR_FILMS&page=1'),
        responseTop('/top?type=TOP_AWAIT_FILMS&page=1')
      ]).then(res=>res)
    
      return ResponseMain;

    }
)

const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers:{
       addActive(state){
          state.activeResp=!state.activeResp
       }
    },
    extraReducers:(builder)=>{
        builder
                .addCase(fetchResp.fulfilled,(state,action)=>{
                    state.resps=action.payload;
                    state.loadingMain=false;
                })
                .addCase(fetchResp.pending,state=>{
                    state.error=false
                    state.loadingMain=true;
                })
                .addCase(fetchResp.rejected,state=>{
                    state.loadingMain=false;
                    state.error=true
                })
    }
})

const {actions,reducer}=mainSlice;
export default reducer;
export const {
    topFilms,
    popularFilms,
    awaitFilms,
}=actions