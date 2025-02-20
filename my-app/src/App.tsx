import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList.tsx";
import { Cart } from "./components/Cart.tsx";
import { OrderModal } from "./components/OrderModal.tsx";
import { Product, CartItem } from "./types/types.ts";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Envia o pedido para a API
  const submitOrder = async () => {
    const orderData = {
      userId: 1,
      date: new Date().toISOString(),
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setOrderId(result.id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
    }
  };

  const confirmOrder = () => {
    if (cart.length > 0) {
      submitOrder();
    }
  };

  const resetOrder = () => {
    setCart([]);
    setIsModalOpen(false);
    setOrderId(null);
  };

  return (
    <div className="app-container">
      {/* Se quiser um título para a seção, por exemplo: */}
      <h1 className="section-title">Loja Teste</h1>


      <div className="wrapper-content">
        {/* Lista de produtos */}
        <ProductList products={products} addToCart={addToCart} />
        {/* Carrinho */}
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          confirmOrder={confirmOrder}
          resetOrder={resetOrder}
        />

      </div>

      {/* Modal de confirmação */}
      <OrderModal
        isModalOpen={isModalOpen}
        resetOrder={resetOrder}
        orderId={orderId}
      />

    </div>
  );
};

export default App;
