import { ProductType } from "@/common/types/Product.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends ProductType {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productCode: string) => void;
  clearCart: () => void;
  getTotalValue: () => number;
  getTotalAmount: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product: ProductType) => {
        const existingItem = get().cartItems.find(
          (item: { code: string }) => item.code === product.code
        );
        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.code === product.code
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity: 1 }],
          });
        }
      },
      removeFromCart: (productCode: string) => {
        const updatedCartItems = get().cartItems.reduce<CartItem[]>(
          (acc, item) => {
            if (item.code === productCode) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          },
          []
        );
        set({ cartItems: updatedCartItems });
      },
      clearCart: () => set({ cartItems: [] }),
      getTotalValue: () =>
        get().cartItems.reduce(
          (total, item) => total + item.prices.salesPrice.value * item.quantity,
          0
        ),
      getTotalAmount: () =>
        get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
