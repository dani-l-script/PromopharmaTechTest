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
    <li className="flex flex-col font-medium justify-around bg-white shadow-md rounded-sm p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
      {product.images && product.images.length > 0 ? (
        <div className="relative">
          <ProductImage name={name} images={images} styles={"sm:max-w-35 max-h-35 "} />
          <div className="absolute bottom-0 right-4">
            <CSRComponent componentImportName={"FavoriteButton"}>
              <FavoriteButton productCode={code} />
            </CSRComponent>
          </div>
        </div>
      ) : (
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-500 text-sm">No image available</span>
        </div>
      )}

      <h2 className="h-12 text-md font-semibold mb-2 text-gray-800">
        {product.name}
      </h2>
      <div className="">
        <p className=" text-sm text-gray-600 mb-1">
          {`${product.packagingSize} - ${product.dosageForm}`}
        </p>
        <p className="text-sm text-gray-600 mb-1">{product.supplier}</p>
        <p className="flex text-gray-600 mb-1">
          <span className="font-bold text-lg mr-2 bold">
            {product.prices.salesPrice.formattedValue}
          </span>
          <span className="text-sm self-center text-gray-300 decoration-gray-300 line-through">
            {product.prices.recommendedRetailPrice.formattedValue}
          </span>
        </p>
        <p className="text-gray-600 mb-4">{product.baseprice}</p>

        <AddToCartButton product={product} />
      </div>
    </li>
  );
};

export default ProductCard;
