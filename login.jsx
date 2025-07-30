// pages/login.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) window.location.href = '/admin'
    else alert('Login failed')
  }
  return (
    <div className="p-4">
      <h1 className="text-xl">Admin Login</h1>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  )
}
