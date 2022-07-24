import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SingleDrink from "./components/Menu/DrinksMenu/SingleDrink";
import Menu from './components/Menu/Menu';
import Drinks from './components/Menu/DrinksMenu/Drinks';
import FoodMenu from "./components/Menu/FoodMenu/FoodMenu";
import Equipment from "./components/Equipment/Equipment.js";
import SingleEquipment from './components/Equipment/SingleEquipment.js'
import BaristaCourse from "./components/BaristaCourse/BaristaCourse";
import SingleBaristaCourse from "./components/BaristaCourse/SingleBaristaCourse.js";
import SingleFood from "./components/Menu/FoodMenu/SingleFood";


function App() {
  return (
    <div className="App">
    <Router>
 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food" element={<FoodMenu />} />
          <Route path="/food/:id" element={<SingleFood />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/drinks/:id" element={<SingleDrink />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/:id" element={<SingleEquipment />} />
          
          <Route path="/baristaCourses" element={<BaristaCourse />} />
          <Route path="baristaCourses/:id" element={<SingleBaristaCourse />} />
        </Routes>
        <Footer />
    </Router> </div>
  );
}

export default App;
