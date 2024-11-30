"use client";

import React, { useState } from "react";
import { ProductType } from "@/common/types/Product.type";
import useCartStore from "@/store/useCartStore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  product: ProductType;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      addToCart(product);
      toast.success(`${product.name} agregado al carrito.`);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("Error al agregar al carrito.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
      disabled={loading}
    >
      {loading ? (
        <ClipLoader size={20} color="#ffffff" />
      ) : (
        "Agregar al Carrito"
      )}
    </button>
  );
};

export default AddToCartButton;
