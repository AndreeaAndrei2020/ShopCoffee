import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SingleDrink from "./components/Menu/DrinksMenu/SingleDrink";
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
          <Route path="/drinks/:id" element={<SingleDrink />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/food" element={<FoodMenu />} />
        </Routes>
        <Footer />
    </Router> </div>
  );
}

export default App;
