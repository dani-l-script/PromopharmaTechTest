"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImageType } from "@/common/types/Product.type";

interface ProductImageProps {
  name: string;
  images: ProductImageType[];
  styles?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ name, images, styles }) => {
  const [imageUrl, setImageUrl] = useState(
    images?.[0]?.variants["420"]?.formats.jpg?.resolutions["1x"]?.url ||
      "/placeholder.png"
  );

  return (
    <div className={`rounded-md mb-4 overflow-hidden max-w-35 max-h-35 ${styles}`}>
      <Image
        src={imageUrl}
        alt={name}
        width={128}
        height={128}
        className="object-cover w-full h-full"
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
