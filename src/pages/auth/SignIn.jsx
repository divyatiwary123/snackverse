import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function SignIn(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(null)
  const { signIn } = useContext(AuthContext); const navigate = useNavigate()
  async function submit(e){ e.preventDefault(); setError(null); try{ await signIn({ email,password }); navigate('/') }catch(err){ setError(err.message) } }
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 bg-white p-4 rounded shadow">
        {error && <div className="text-rose-500">{error}</div>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded"/>
        <button className="px-4 py-2 bg-amber-600 text-white rounded">Sign in</button>
        <div className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-amber-600">Sign up</Link></div>
      </form>
    </main>
  )
}
