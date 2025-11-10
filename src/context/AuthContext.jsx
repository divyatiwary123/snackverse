import React, { createContext, useState, useEffect } from 'react'
import * as api from '../api/mockServer'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{ const s = api.getSession(); if(s) setUser(s.user); setLoading(false) },[])

  async function signUp(data){ const u = api.signUp(data); setUser(u); return u }
  async function signIn(data){ const { user } = api.signIn(data); setUser(user); return user }
  function signOut(){ api.signOut(); setUser(null) }

  return <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}
