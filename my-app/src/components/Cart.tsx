import React from "react";
import { CartItem } from "../types/types";

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  confirmOrder: () => void;
  resetOrder: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  confirmOrder,
  resetOrder,
}) => {
  // Cálculo do total
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-total">
            <span>Order Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="cart-actions">
            <button className="confirm-order-btn" onClick={confirmOrder}>
              Confirm Order
            </button>
            <button className="new-order-btn" onClick={resetOrder}>
              New Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};
