import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../api/mockServer'

export default function Home(){
  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6">
      <section className="bg-amber-50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">SnackVerse | Where every bite tells a story — Snacks with a cleaner ingredient story</h1>
          <p className="mt-3 text-gray-700">Groundnut oil, no trans-fats, classic Indian flavours reimagined.</p>
          <div className="mt-4 flex gap-3"><Link to="/products" className="px-4 py-2 bg-amber-600 text-white rounded shadow">Shop products</Link><Link to="/about" className="px-4 py-2 border rounded">Learn more</Link></div>
        </div>
        <div className="w-full md:w-1/3"><img src={PRODUCTS[0].img} alt="featured" className="rounded-xl shadow-md object-cover w-full h-40 md:h-48"/></div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Popular snacks</h2><Link to="/products" className="text-sm text-amber-600">View all</Link></div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{PRODUCTS.map(p=> <ProductCard key={p.id} product={p}/> )}</div>
      </section>
    </main>
  )
}
