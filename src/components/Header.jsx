import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

export default function Header(){
  const { items } = useContext(CartContext)
  const { user, signOut } = useContext(AuthContext)
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const count = items.reduce((s,p)=>s + p.qty, 0)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={()=>setOpen(!open)} className="p-2 md:hidden rounded-md hover:bg-gray-100">☰</button>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold">LT</div>
              <div><div className="font-semibold">SnackVerse | Where every bite tells a story</div><div className="text-xs text-gray-500 -mt-0.5">Healthy snacks</div></div>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/products" className="hover:text-amber-600">Products</Link>
            <Link to="/about" className="hover:text-amber-600">About</Link>
            <Link to="/contact" className="hover:text-amber-600">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative flex items-center gap-2 border px-3 py-1 rounded-full hover:shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="text-sm font-medium">Cart</div>
              {count>0 && <div className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{count}</div>}
            </Link>

            {user ? (
              <div className="flex items-center gap-2"><div className="text-sm">Hi, {user.name}</div><button onClick={()=>{ signOut(); navigate('/') }} className="px-3 py-1 border rounded">Sign out</button></div>
            ) : (
              <div className="hidden md:flex gap-2"><Link to="/signin" className="px-3 py-1">Sign in</Link><Link to="/signup" className="px-3 py-1 bg-amber-600 text-white rounded">Sign up</Link></div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 flex flex-col gap-2">
            <Link to="/products" onClick={()=>setOpen(false)}>Products</Link>
            <Link to="/about" onClick={()=>setOpen(false)}>About</Link>
            <Link to="/contact" onClick={()=>setOpen(false)}>Contact</Link>
            {!user && <div className="flex gap-2 mt-2"><Link to="/signin" onClick={()=>setOpen(false)} className="px-3 py-2 border rounded">Sign in</Link><Link to="/signup" onClick={()=>setOpen(false)} className="px-3 py-2 bg-amber-600 text-white rounded">Sign up</Link></div>}
          </div>
        </div>
      )}
    </header>
  )
}
