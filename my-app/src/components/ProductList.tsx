import React from "react";
import { Product } from "../types/types";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  addToCart,
}) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-content">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
