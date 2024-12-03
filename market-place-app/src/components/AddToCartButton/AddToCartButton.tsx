"use client";

import React, { useState } from "react";
import useCartStore from "@/store/useCartStore";
import { ProductType } from "@/common/types/Product.type";
import { ClipLoader } from "react-spinners";

interface AddToCartButtonProps {
  product: ProductType;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  console.log(product);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      addToCart(product);
    } catch (error) {
      console.error("Error when adding to Cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleAddToCart}
        className=" w-full mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
