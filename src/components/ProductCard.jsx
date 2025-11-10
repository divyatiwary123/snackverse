import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function ProductCard({ product }){
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition cursor-pointer" onClick={()=>navigate(`/product/${product.id}`)}>
      <div className="w-full h-36 overflow-hidden rounded-lg"><img src={product.img} alt={product.name} className="w-full h-full object-cover"/></div>
      <div className="mt-2"><div className="font-semibold">{product.name}</div><div className="text-sm text-gray-500">{product.weight}</div>
      <div className="mt-2 flex items-center justify-between"><div className="text-lg font-bold">₹{product.price}</div><div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{product.tags?.[0]}</div></div></div>
    </div>
  )
}
