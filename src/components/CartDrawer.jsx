
import React from "react";
import PurchaseCart from "./PurchaseCart";
import { IoIosArrowBack } from "react-icons/io";
export default function CartDrawer({ isOpen, setIsCartOpen, cart, setCart, total }) {

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

<div className="flex items-center gap-2 p-4 border-b sticky top-0 bg-white z-10">
  <button
  onClick={() => setIsCartOpen(false)}
  className="text-2xl p-1 rounded hover:bg-gray-100 transition"
>
  <IoIosArrowBack />
</button>

  <h2 className="text-lg font-semibold">
    Your Cart
  </h2>

</div>
        
<div className="h-[calc(100vh-60px)] overflow-y-auto">
  <PurchaseCart
    cart={cart}
    setCart={setCart}
    total={total}
  />
</div>
      </div>
    </>
  );
}