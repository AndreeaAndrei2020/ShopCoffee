import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
import CartScreen from './components/CartScreen/CartScreen.js'
import GiftCards from "./components/GiftCards/GiftCards";
import GiftCard from "./components/GiftCards/GiftCard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ShippingScreen from "./components/ShippingScreen/ShippingScreen";
import Payment from "./components/Payment/Payment";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import OrderScreen from "./components/OrderScreen/OrderScreen";

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
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/baristaCourses" element={<BaristaCourse />} />
          <Route path="baristaCourses/:id" element={<SingleBaristaCourse />} />
          <Route path="/giftCards" element={<GiftCards />} />
          <Route path="/giftCards/:id" element={<GiftCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping" element={<ShippingScreen/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/placeorder" element={<PlaceOrder/>} />
          <Route path="/orders/:id" element={<OrderScreen/>} />
        </Routes>
        <Footer />
    </Router> </div>
  );
}

export default App;
