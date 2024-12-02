"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useCartStore from "@/store/useCartStore";
import { roundPrice } from "@/utils/roundPrice";
import ProductImage from "../ProductImage/ProductImage";

const CartSidebar: React.FC = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalValue,
    getTotalAmount,
  } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openCart}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-50 flex items-center justify-center"
      >
        🛒 {getTotalAmount()}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeCart}
          ></div>

          <div className="relative bg-white w-80 sm:w-96 h-full shadow-xl overflow-y-auto transition-transform duration-300 transform">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={closeCart}>
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <ul>
                  {cartItems.map((productItem) => (
                    <li
                      key={productItem.code}
                      className="flex items-center mb-4"
                    >
                        <ProductImage
                          name={productItem.name}
                          images={productItem.images}
                        />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">
                          {productItem.name}
                        </h3>
                        <p className="text-gray-600">
                          Price: {productItem.prices.salesPrice.formattedValue}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {productItem.quantity}
                        </p>
                        <p className="text-gray-600">
                          Total: $
                          {productItem.prices.salesPrice.value *
                            productItem.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() => addToCart(productItem)}
                          className="bg-green-500 text-white px-2 py-1 rounded mb-2 hover:bg-green-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(productItem.code)}
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
                  <span className="font-semibold">
                    ${roundPrice(getTotalValue())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={clearCart}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Clear Cart
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
