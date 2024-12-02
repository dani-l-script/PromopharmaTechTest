"use client";

import React from "react";
import useFavoritesStore from "@/store/useFavoriteStore";
import { FaHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  productCode: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productCode }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(productCode);

  return (
    <button
      onClick={() => toggleFavorite(productCode)}
      className="focus:outline-none transition-transform duration-200 hover:scale-110"
    >
      {favorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaHeart className="text-gray-400" />
      )}
    </button>
  );
};


export default FavoriteButton;