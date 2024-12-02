import React from "react";
import { ProductType } from "@/common/types/Product.type";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductImage from "../ProductImage/ProductImage";
import CSRComponent from "../common/CSRComponent";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  product: { code, name, images },
}) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
      {product.images && product.images.length > 0 ? (
        <CSRComponent componentImportName={"ProductImage"}>
          <ProductImage name={name} images={images} />
        </CSRComponent>
      ) : (
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-500 text-sm">No image available</span>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {product.name}
      </h2>
      <p className="text-gray-600 mb-1">
        {`${product.packagingSize} - ${product.dosageForm}`}
      </p>
      <p className="text-gray-600 mb-1">
        {product.supplier}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Price:</span> {product.prices.salesPrice.formattedValue}
        <span className="font-medium">Price:</span> {product.prices.recommendedRetailPrice.formattedValue}
      </p>
      <p className="text-gray-600 mb-4">
         {product.baseprice}
      </p>
      <div className="absolute top-4 right-4">
        <CSRComponent componentImportName={"FavoriteButton"}>
          <FavoriteButton productCode={code} />
        </CSRComponent>
      </div>

      <AddToCartButton product={product} />
    </li>
  );
};

export default ProductCard;