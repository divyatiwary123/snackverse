import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../api/mockServer'

export default function Products(){
  const [products,setProducts] = useState([])
  useEffect(()=>{ fetchProducts().then(setProducts) },[])
  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Products</h1><div className="text-sm text-gray-500">Showing {products.length} items</div></div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">{products.map(p=> <ProductCard key={p.id} product={p}/> )}</div>
    </main>
  )
}
