"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useCartStore from "@/store/useCartStore";

const CartSidebar: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openCart}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-50 flex items-center justify-center"
      >
        🛒 {cartItems.length}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeCart}
          ></div>

          <div className="relative bg-white w-80 sm:w-96 h-full shadow-xl overflow-y-auto transition-transform duration-300 transform">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Tu Carrito</h2>
              <button onClick={closeCart}>
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío.</p>
              ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.code} className="flex items-center mb-4">
                      <img
                        src={
                          item.images[0]?.variants["100"]?.formats.jpg?.resolutions["1x"].url ||
                          "/placeholder.png"
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          Precio: {item.prices.salesPrice.formattedValue}
                        </p>
                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                        <p className="text-gray-600">
                          Total: ${(item.prices.salesPrice.value * item.quantity)}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 text-white px-2 py-1 rounded mb-2 hover:bg-green-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.code)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          -
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${getTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={clearCart}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
