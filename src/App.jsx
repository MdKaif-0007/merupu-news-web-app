import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Layout from "../Layout";
import NewsDetail from "./components/NewsDetails/NewsDetails";
import AllNews from "./components/AllNews/AllNews";
import NewsDistrict from "./components/NewsDistrict/NewsDistrict";
import ContactUs from "./components/Links/ContactUs";
import About from "./components/Links/About";
import PrivacyPolicy from "./components/Links/PrivacyPolicy";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />

        <Route path="/news/:category" element={<NewsDistrict />} />
        <Route path="/api/news/:id" element={<NewsDetail />} />

        <Route path="/news/all-news" element={<AllNews/>} />

        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />

        <Route path="" element={<Footer />} />
      </Route>
    )
  );

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
