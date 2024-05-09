import React from "react";
import { BsHandbag } from "react-icons/bs";
import { GiMorgueFeet } from "react-icons/gi";
import { IoBeerOutline } from "react-icons/io5";

const MobileTab = () => {
    return (
        <>
        <div className="lg:hidden bg-white  p-3 fixed bottom-0 z-10 w-full flex items-center justify-between border text-grey-500">
            <div className="flex flex-col items-center text-xl"><BsHandbag />
            <h5>Delivery</h5>
            </div>
            <div className="flex flex-col items-center text-xl"><IoBeerOutline  />
            <h5>Night Life</h5>
            </div>
            <div className="flex flex-col items-center text-xl"><GiMorgueFeet  />
            <h5>Dining out</h5>
            </div>
        </div>
        </>
    );
}

const FoodTab = () => {
    return (
        <>
        <div>
            <MobileTab />
        </div>
        </>
    );
}

export default FoodTab;
//master_url:type

//delivery ,dining ,night life -> type