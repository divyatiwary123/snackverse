import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

// We'll dynamically generate a QR code using an external API (no extra package needed)
export default function Cart() {
  const { items, updateQty, removeFromCart, total, clearCart } = useContext(CartContext)
  const [showQR, setShowQR] = useState(false)
  const navigate = useNavigate()

  if (items.length === 0)
    return (
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-3 text-gray-600">Add some snacks to get started.</p>
        <div className="mt-4">
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-amber-600 text-white rounded"
          >
            Shop snacks
          </button>
        </div>
      </main>
    )

  const handleCheckout = () => {
    const upiId = "yourupiid@okicici" // Replace with your real UPI ID
    const name = "SnackVerse"
    const amount = total
    const note = "SnackVerse Order Payment"

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`

    // Detect if device is mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isMobile) {
      // 🚀 Redirect directly to UPI app
      window.location.href = upiLink
    } else {
      // 💻 Show QR Code for desktop users
      setShowQR(upiLink)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
            <img src={item.img} className="w-20 h-20 rounded object-cover" alt={item.name} />
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">{item.weight}</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.qty}
                min={1}
                onChange={e => updateQty(item.id, Number(e.target.value) || 1)}
                className="w-16 p-1 border rounded text-center"
              />
              <div className="font-semibold">₹{item.price * item.qty}</div>
              <button onClick={() => removeFromCart(item.id)} className="text-sm text-rose-500">
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Total: ₹{total}</div>
          <div className="flex gap-2">
            <button onClick={clearCart} className="px-4 py-2 border rounded">
              Clear
            </button>
            <button onClick={handleCheckout} className="px-4 py-2 bg-amber-600 text-white rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-3">Scan to Pay with UPI</h2>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                showQR
              )}`}
              alt="UPI QR"
              className="mx-auto"
            />
            <p className="text-gray-500 mt-3 text-sm">Scan using GPay, PhonePe, Paytm, etc.</p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
