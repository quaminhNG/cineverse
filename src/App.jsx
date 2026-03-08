import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layout/MainLayout";
import LoadingScreen from "./components/common/LoadingScreen";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Search = lazy(() => import("./pages/Search"));
const Watch = lazy(() => import("./pages/Watch"));
const Profile = lazy(() => import("./pages/Profile"));
const TvShows = lazy(() => import("./pages/TvShows"));
const Movies = lazy(() => import("./pages/Movies"));
const NewPopular = lazy(() => import("./pages/NewPopular"));
const MyList = lazy(() => import("./pages/MyList"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="tv-shows" element={<TvShows />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route path="new-popular" element={<NewPopular />}></Route>
          <Route path="my-list" element={<MyList />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/watch" element={<Watch />} />

        <Route
          path="*"
          element={
            <div className="text-white text-center mt-20">404 - Not Found</div>
          }
        />
      </Routes>
    </Suspense>
  );
}
export default App;
