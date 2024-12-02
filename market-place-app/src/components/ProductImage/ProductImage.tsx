"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImageType } from "@/common/types/Product.type";

interface ProductImageProps {
  name: string;
  images: ProductImageType[];
}

const ProductImage: React.FC<ProductImageProps> = ({ name, images }) => {

  const [imageUrl, setImageUrl] = useState(
    images?.[0]?.variants["420"]?.formats.jpg?.resolutions["1x"]?.url ||
      "/placeholder.png"
  );

  return (
    <div className="relative w-24 h-24 rounded-md mb-4">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="rounded-md"
        placeholder="blur"
        blurDataURL="/placeholder.png"
        unoptimized
        onError={() => {
          setImageUrl("/placeholder.png");
        }}
      />
    </div>
  );
};

export default ProductImage;
