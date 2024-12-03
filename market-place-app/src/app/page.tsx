import CartSidebar from "@/components/CartSideBar/CartSideBar";
import ProductList from "@/components/ProductList/ProductList";

export default function Home() {
  return (
    <div className="bg-white p-8">
      <ProductList/>
      <CartSidebar />
    </div>
  );
}
