import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import fetchProducts from "@/utils/fetchProducts";


const ProductList: React.FC = async () => {

const products = await fetchProducts()

  if (!products.length) {
    return <p className="text-gray-500 text-center">No hay productos disponibles.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.code} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
