import React from "react";

//component
import FoodTab from "../Components/FoodTab";
import Navbar from "../Components/Navbar";



const HomeLayout = ({ children }) => {
    return(
    <>
    <div className="container mx-auto  lg:px-20"> 
     <Navbar />
     {children}
     </div>
     <FoodTab />
    </> 
   ); };
export default HomeLayout;