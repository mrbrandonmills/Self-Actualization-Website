'use client'

/**
 * Shopping Cart Widget - Video Game Style
 * Floating cart icon with item count, RPG inventory aesthetic
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/data/products'

export function CartWidget() {
  const { items, getItemCount, getTotal, removeFromCart, updateQuantity } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = getItemCount()
  const total = getTotal()

  return (
    <>
      {/* Floating Cart Button - Top Right */}
      <motion.button
        className="cart-button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="cart-icon">🛒</span>
        {itemCount > 0 && (
          <motion.span
            className="cart-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={itemCount}
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Dropdown Panel - RPG Inventory Style */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              className="cart-panel"
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="cart-header">
                <h2>⚗️ Your Inventory</h2>
                <button className="close-button" onClick={() => setIsOpen(false)}>
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="cart-items">
                {items.length === 0 ? (
                  <div className="empty-cart">
                    <div className="empty-icon">🎒</div>
                    <p>Your inventory is empty</p>
                    <small>Explore the laboratory to find treasures!</small>
                  </div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.product.id}
                      className="cart-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      layout
                    >
                      {/* Item Icon */}
                      <div className="item-icon" style={{ color: item.product.glowColor }}>
                        {item.product.itemType}
                      </div>

                      {/* Item Details */}
                      <div className="item-details">
                        <h4>{item.product.name}</h4>
                        <p className="item-price">{formatPrice(item.product.price)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.product.id)}
                        title="Remove from cart"
                      >
                        🗑️
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer with Total and Checkout */}
              {items.length > 0 && (
                <div className="cart-footer">
                  <div className="total">
                    <span>Total Gold:</span>
                    <span className="total-amount">{formatPrice(total)}</span>
                  </div>
                  <motion.button
                    className="checkout-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ⚡ Proceed to Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .cart-button {
          position: fixed;
          top: 100px;
          right: 32px;
          z-index: 100;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #C9A050 0%, #8B7030 100%);
          border: 2px solid #D4AF37;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(201, 160, 80, 0.3), 0 0 20px rgba(212, 175, 55, 0.2);
          transition: all 0.3s ease;
        }

        .cart-button:hover {
          box-shadow: 0 12px 40px rgba(201, 160, 80, 0.5), 0 0 30px rgba(212, 175, 55, 0.4);
        }

        .cart-icon {
          font-size: 28px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          font-size: 14px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        .cart-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        .cart-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 450px;
          height: 100vh;
          background: linear-gradient(180deg, #0a2a28 0%, #05201f 100%);
          border-left: 2px solid #D4AF37;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
        }

        .cart-header {
          padding: 24px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h2 {
          font-size: 24px;
          color: #D4AF37;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .close-button {
          background: none;
          border: none;
          color: #D4AF37;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          line-height: 1;
          transition: all 0.2s;
        }

        .close-button:hover {
          color: #fff;
          transform: rotate(90deg);
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .empty-cart {
          text-align: center;
          padding: 64px 24px;
          color: rgba(212, 175, 55, 0.6);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-cart p {
          font-size: 18px;
          margin-bottom: 8px;
        }

        .empty-cart small {
          font-size: 14px;
          opacity: 0.7;
        }

        .cart-item {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          display: grid;
          grid-template-columns: 48px 1fr auto auto;
          gap: 16px;
          align-items: center;
          transition: all 0.2s;
        }

        .cart-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.4);
        }

        .item-icon {
          font-size: 36px;
          text-align: center;
          filter: drop-shadow(0 0 8px currentColor);
        }

        .item-details h4 {
          color: #D4AF37;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .item-price {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin: 0;
        }

        .quantity-controls {
          display: flex;
          gap: 8px;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 4px;
        }

        .quantity-controls button {
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #D4AF37;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.2s;
        }

        .quantity-controls button:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.3);
          border-color: rgba(212, 175, 55, 0.6);
        }

        .quantity-controls button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .quantity-controls span {
          color: #D4AF37;
          font-weight: 600;
          min-width: 24px;
          text-align: center;
        }

        .remove-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.2s;
          padding: 4px;
        }

        .remove-button:hover {
          opacity: 1;
          transform: scale(1.2);
        }

        .cart-footer {
          padding: 24px;
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          background: rgba(0, 0, 0, 0.3);
        }

        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-size: 20px;
          color: #D4AF37;
          font-weight: 700;
        }

        .total-amount {
          font-size: 28px;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
        }

        .checkout-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #C9A050 0%, #8B7030 100%);
          border: 2px solid #D4AF37;
          border-radius: 12px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(201, 160, 80, 0.4);
          transition: all 0.3s;
        }

        .checkout-button:hover {
          box-shadow: 0 6px 24px rgba(201, 160, 80, 0.6);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cart-panel {
            width: 100%;
          }

          .cart-button {
            right: 16px;
            top: 80px;
            width: 56px;
            height: 56px;
          }

          .cart-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  )
}
