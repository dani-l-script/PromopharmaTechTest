"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ProductType } from "@/common/types/Product.type";

const AddToCartButton = dynamic(() => import("./AddToCartButton"), {
  loading: () => (
    <button
      className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
      disabled
    >
      Loading...
    </button>
  ),
  ssr: false,
});

interface AddToCartButtonLoaderProps {
  product: ProductType;
}

const AddToCartButtonLoader: React.FC<AddToCartButtonLoaderProps> = ({ product }) => {
  return <AddToCartButton product={product} />;
};

export default AddToCartButtonLoader;