import axios from "axios";
import LocationHOC from "./HOC/Location.HOC";

import { Redirect, Route } from "react-router-dom";

import Tab from "./Components/Tabs/Navigator";
import RestaurantHOC from "./HOC/Restaurant.HOC";

import GoogleAuth from "./Components/Pages/GoogleAuth";
import CheckoutPage from "./Components/Pages/Secondary/Restaurant/Checkout/CheckoutPage";
import MenuPage from "./Components/Pages/Secondary/Restaurant/Menu/MenuPage";
import OrderOnline from "./Components/Pages/Secondary/Restaurant/Order Online/OrderOnline.page";
import PhotosPage from "./Components/Pages/Secondary/Restaurant/Photos/Photos.page";
import RestaurantRedirect from "./Components/Pages/Secondary/Restaurant/Redirect";
import ReviewsPage from "./Components/Pages/Secondary/Restaurant/Reviews/Reviews.restaurant";
import Temp from "./Components/Pages/Secondary/Restaurant/temp";
import CheckoutHOC from "./HOC/Checkout.HOC";

// Axios global settings 
if(localStorage.zomato){
  const {token} = JSON.parse(localStorage.zomato);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


function App() {
  return (
    <>
      <Route path="/" exact>
        <Redirect to="/location/delivery"/>
      </Route>
      <Route path="/restaurant/:id" exact component={RestaurantRedirect} />
      
      <LocationHOC path="/location/:tabName" exact component={Tab} />
      <RestaurantHOC path="/restaurant/:id/overview" exact component={Temp}/>
      <RestaurantHOC path="/restaurant/:id/order-online" exact component={OrderOnline}/>
      <RestaurantHOC path="/restaurant/:id/reviews" exact component={ReviewsPage}/>
      <RestaurantHOC path="/restaurant/:id/photos" exact component={PhotosPage}/>
      <RestaurantHOC path="/restaurant/:id/menu" exact component={MenuPage}/>
      <CheckoutHOC path="/checkout" exact component={CheckoutPage} />
      <LocationHOC path="/google/:token" exact component={GoogleAuth}/>
    </>
  );
}

export default App;
