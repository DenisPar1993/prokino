import { Routes, Route } from 'react-router';
import './App.scss';
import Header from './Header/Header';
import FilmPage from './FilmPage/FilmPage';
import Main from './Main/Main';
import FilmSearch from './FilmSearch/FilmSearch';
import Premiers from './Premiers/Premiers';
import Popular from './Popular/Popular';
import Footer from './Footer/Footer';
import Top from './top/Top';
import ErrorMessage from './ErrorMessage/ErrorMessage';

function App() {
    return (
        <div className="App">
            <Header  />
            <div className="films">

                <div className="container">
                    <Routes>
                        <Route path="/" element={< Main />} />
                        <Route path="/top" element={< Top/>} />
                        <Route path="/filmsearch/:word" element={< FilmSearch/>} />
                         <Route path="/popular" element={< Popular/>} />
                        <Route path="/premiers" element={< Premiers/>} />
                        <Route path="/filmpage/:id" exact element={< FilmPage/>} />
                        <Route path="*" element={< ErrorMessage/>} />

                    </Routes>
                </div>
            </div>

            <Footer />

        </div>
    );
}

export default App;
