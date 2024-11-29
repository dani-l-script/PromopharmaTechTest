import React from "react";
import { Product } from "@/common/types/Product";
//import AddToCartButton from "../AddToCartButton/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300">
      {product.images && product.images.length > 0 ? (
        <img
          src={
            product.images[0].variants["100"]?.formats.jpg?.resolutions["1x"].url ||
            "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-500">No hay imagen disponible</span>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Proveedor:</span> {product.supplier}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Precio:</span> {product.prices.salesPrice.formattedValue}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Calificación:</span> {product.rating} ({product.reviewCount} reseñas)
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Tamaño del Paquete:</span> {product.packagingSize}
      </p>

      {/* <AddToCartButton product={product} /> */}
    </li>
  );
};

export default ProductCard;
