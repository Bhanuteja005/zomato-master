import React from 'react';
import DeliveryFoodCategory from './DeliveryFoodCategory';
const DeliveryCarousal = () => {
  return (
    <>
    <h1 className="text-xl font-semibold my-2">Eat What Makes you Happy!</h1>
    <div className="gap-3 flex flex-wrap justify-between">
        <DeliveryFoodCategory />
        <DeliveryFoodCategory />
        <DeliveryFoodCategory />
        <DeliveryFoodCategory />
        <DeliveryFoodCategory />
        <DeliveryFoodCategory />
    </div>
    </>
  );
}

export default DeliveryCarousal;