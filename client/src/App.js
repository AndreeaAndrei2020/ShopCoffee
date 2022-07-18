import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products";
import Product from "./components/Product";
import Shop from "./components/Shop/Shop";
import Menu from './components/Menu/Menu';
import Drinks from './components/Menu/DrinksMenu/Drinks';
import FoodMenu from "./components/Menu/FoodMenu/FoodMenu";
import "./App.css";

function App() {
  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/foodMenu" element={<FoodMenu />} />
        </Routes>
        <Footer />
    </Router> </div>
  );
}

export default App;
