import { configureStore} from "@reduxjs/toolkit";
// import mainReducer from "../reducers/mainReducer";
// import serial from "../reducers/serial";
// import premier from "../reducers/premier";
import premier from '../Premiers/premierSlice'
import popular from '../Popular/popularSlice'
import top from '../top/topSlice'
import main from '../Main/mainSlice'
import search from '../FilmSearch/sliceSearch'
import singleFilm from '../FilmPage/filmSlice'


// const store = createStore(combineReducers({mainReducer,serial,premier}),
//  compose(applyMiddleware(ReduxThunk)
// ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
const store = configureStore({
    reducer:{main,popular,premier,search,singleFilm,top},
    middleware:getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;