import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import useRespondFilm from "../Service/Service";


const initialState = {
    premiers:[],
    activeFiltPremier:['Все','Все'],
    loadingPremiers:false,
    error:false,
}
export const fetchPremier = createAsyncThunk(
    'premier/fetchPremier',
    async ()=>{
        const {responsePremier}=useRespondFilm();
        const resp =await responsePremier();
        const arrPrem= resp.map(item=>{
            return {...item, id: item.kinopoiskId}
        })
        return arrPrem

    }
)

const premierSlice = createSlice({
    name:'premier',
    initialState,
    reducers:{
        filtPremiers: (state,action)=>{
            state.activeFiltPremier=action.payload  
        }
    },
    extraReducers:(builder)=>{
        builder
             .addCase(fetchPremier.pending,state=>{
                state.error=false;
                 state.loadingPremiers=true;
             })
             .addCase(fetchPremier.fulfilled,(state,action)=>{
                state.premiers=action.payload;
                state.loadingPremiers=false;
             })
             .addCase(fetchPremier.rejected,state=>{
                 state.error=true;
                 state.loadingPremiers=false;

             })
             
    }
})

const {actions,reducer} = premierSlice;
export default reducer;
export const {
    addPremiers,
    filtPremiers,

} = actions