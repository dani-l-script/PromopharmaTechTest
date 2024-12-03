import React from "react";
import fetchProducts from "@/utils/fetchProducts";
import { ProductType } from "@/common/types/Product.type";
import ProductCard from "../ProductCard/ProductCard";

const ProductList: React.FC = async () => {
  try {
    const products: ProductType[] = await fetchProducts();

    if (!products.length) {
      return <p className="text-gray-500 text-center">No products available.</p>;
    }

    return (
      <ul className="grid gap-6 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-auto-fit">
        {products.map((product: ProductType) => {
          try {
            return <ProductCard key={product.code} product={product} />;
          } catch (error) {
            console.error("Error rendering product card:", error);
            return null;
          }
        })}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <p className="text-gray-500 text-center">Products not available, please contact later.</p>;
  }
};

export default ProductList;
