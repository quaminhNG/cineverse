import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Watch from "./pages/Watch";

function App() {
  return (
    <Routes>
      {/* NHÓM 1: Các trang dùng chung Layout (Có Navbar + Footer) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Route>
      {/* NHÓM 2: Các trang Full màn hình (Không Navbar/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/watch" element={<Watch />} />

      {/* Route 404 (Nếu gõ linh tinh) */}
      <Route
        path="*"
        element={
          <div className="text-white text-center mt-20">404 - Not Found</div>
        }
      />
    </Routes>
  );
}
export default App;
