import "./App.css";
import NavbarComp from "./Components/Navbar";
import Grid from "./Components/HeroSection";
import Categories from "./Components/Categories";
import ProductSection from "./Components/ProductSection";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import FullCategory from "./pages/FullCategory";
import SearchResults from "./Components/SearchResults";
import {
  fruitsData,
  vegetablesData,
  dairyData,
  SnacksData,
  beveragesData,
  bakeryData,
} from "./data/products";

import CartPage from "./pages/Cartpage";
import BottomCheckoutBar from "./Components/BottomCheckoutBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [activeCategory, setActiveCategory] = useState("Fruits");
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("Hyderabad-500001");

  const allProducts = [
    ...fruitsData,
    ...vegetablesData,
    ...dairyData,
    ...SnacksData,
    ...beveragesData,
    ...bakeryData,
  ];

  const currentPath = useLocation().pathname;

  const hideNavbar =
    currentPath === "/login" || currentPath === "/signup";

  const hideCheckoutBar =
    currentPath === "/login" ||
    currentPath === "/signup" ||
    currentPath === "/cart";

  return (
    <>
     <div style={{ background: "linear-gradient(135deg, #0B2D21, #123C2A, #1A4B33"
, minHeight: "100vh" }}>
      {!hideNavbar && (
        <NavbarComp
          onSearchChange={setSearchText}
          location={location}
          setLocation={setLocation}/>
      )}

      <Routes>
        
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />

      
        <Route path="/" element={
          <ProtectedRoute>
            <>
                {searchText ? (
                  <SearchResults
                    products={allProducts}
                    searchText={searchText}
                  />
                ) : (
                  <>
                    <Grid />
                    <Categories onCategoryChange={setActiveCategory} />
                    <ProductSection
                      category={activeCategory}
                      searchText={searchText}
                    />
                  </>
                )}
              </>
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/category/:name"
          element={
            <ProtectedRoute>
              <FullCategory category={activeCategory} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>}/>
         </Routes>

      
      {!hideCheckoutBar && <BottomCheckoutBar />}
      </div> 
    </>
  
  );
}

export default App;
