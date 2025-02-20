import React from "react";

interface OrderModalProps {
  isModalOpen: boolean;
  resetOrder: () => void;
  orderId: number | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isModalOpen,
  resetOrder,
  orderId,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Pedido Confirmado!</h2>
        {orderId ? (
          <p className="modal-description">
            Seu pedido foi registrado com o ID: <strong>{orderId}</strong>
          </p>
        ) : (
          <p className="modal-description">Processando seu pedido...</p>
        )}
        <button className="close-modal-btn" onClick={resetOrder}>
          Fechar
        </button>
      </div>
    </div>
  );
};
