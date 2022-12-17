import { Fragment } from "react";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "./component/layout/Main";
// import HomePage from "./page/HomePage";
import BannerSlide from "./component/BannerSlide";
// import MoviePage from "./page/MoviePage";
// import MovieDetail from "./page/MovieDetail";
import { lazy, Suspense } from "react";
import Loading from "./component/Loading";
const HomePage = lazy(() => import("./page/HomePage"));
const MoviePage = lazy(() => import("./page/MoviePage"));
const MovieDetail = lazy(() => import("./page/MovieDetail"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loading></Loading>}>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path='/'
            element={
              <>
                <BannerSlide></BannerSlide>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
          <Route
            path='/movies/:movieId'
            element={<MovieDetail></MovieDetail>}
          ></Route>
        </Route>
      </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
