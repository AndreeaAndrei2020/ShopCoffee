import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/FoodDrinks/MenuFoodDrinks";
import SingleBaristaCourse from "./components/Menu/BaristaCourse/SingleBaristaCourse.js";
import BaristaCourse from "./components/Menu/BaristaCourse/BaristaCourse.js";
import GiftCards from "./components/Menu/GiftCards/GiftCards.js";
import GiftCard from "./components/Menu/GiftCards/GiftCard.js";
import Delivery from "./components/Delivery/Delivery";
import SingleDrink from "./components/Menu/FoodDrinks/Drinks/SingleDrink";
import Drinks from "./components/Menu/FoodDrinks/Drinks/Drinks";
import FoodMenu from "./components/Menu/FoodDrinks/Food/Food";
import SingleFood from "./components/Menu/FoodDrinks/Food/SingleFood";
import Register from "./components/User/Register/Register";
import Profile from "./components/User/Profile/Profile";
import Equipment from "./components/Menu/Equipment/Equipment.js";
import SingleEquipment from "./components/Menu/Equipment/SingleEquipment.js";
import Login from "./components/User/Login/Login";
import Page404 from "./components/Page404";
import OrdersUser from "./components/User/Profile/OrdersUser";
import Contact from "./components/Contact/Contact";
import PlaceOrder from "./components/CompleteTheOrder/PlaceOrder/PlaceOrder";
import CartScreen from "./components/CompleteTheOrder/CartScreen/CartScreen";
import "./App.css";
import ShippingScreen from "./components/CompleteTheOrder/ShippingScreen/ShippingScreen";
import Payment from "./components/CompleteTheOrder/Payment/Payment";

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
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/ordersUser" element={<OrdersUser />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>{" "}
    </div>
  );
}

export default App;
