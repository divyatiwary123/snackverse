import React, { createContext, useState } from 'react'
export const CartContext = createContext()

export function CartProvider({ children }){
  const [items,setItems] = useState([])
  function addToCart(product, qty=1){
    setItems(prev=>{ const f=prev.find(p=>p.id===product.id); if(f) return prev.map(p=>p.id===product.id?{...p,qty:p.qty+qty}:p); return [...prev,{...product,qty}] })
  }
  function updateQty(id, qty){ setItems(prev=>prev.map(p=>p.id===id?{...p,qty}:p)) }
  function removeFromCart(id){ setItems(prev=>prev.filter(p=>p.id!==id)) }
  function clearCart(){ setItems([]) }
  const total = items.reduce((s,p)=>s + p.price * p.qty, 0)
  return <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, total }}>{children}</CartContext.Provider>
}
