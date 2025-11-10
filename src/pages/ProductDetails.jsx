import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../api/mockServer'
import { CartContext } from '../context/CartContext'

export default function ProductDetails(){
  const { id } = useParams()
  const [product,setProduct] = useState(null)
  const { addToCart } = useContext(CartContext)
  useEffect(()=>{ fetchProductById(id).then(setProduct) },[id])
  if(!product) return <div className="p-6">Loading...</div>
  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><img src={product.img} alt={product.name} className="w-full h-80 object-cover rounded-lg"/></div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 text-gray-600">{product.weight} • ₹{product.price}</div>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="mt-6 flex items-center gap-3"><button onClick={()=>addToCart(product,1)} className="px-4 py-2 bg-amber-600 text-white rounded shadow">Add to cart</button><Link to="/cart" className="px-4 py-2 border rounded">Go to cart</Link></div>
          <div className="mt-6"><h3 className="font-semibold">Ingredients</h3><ul className="text-sm text-gray-600 list-disc ml-4 mt-2"><li>Premium pulses & spices</li><li>Groundnut oil</li><li>No trans-fats</li></ul></div>
        </div>
      </div>
    </main>
  )
}
