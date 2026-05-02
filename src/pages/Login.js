import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#1e293b',padding:'2rem',borderRadius:'12px',width:'100%',maxWidth:'400px',border:'1px solid #334155'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <h1 style={{color:'#f1f5f9',fontSize:'24px',fontWeight:'700'}}>Best Quality Group</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'8px'}}>Command Center</p>
        </div>
        {error && <div style={{background:'#450a0a',border:'1px solid #dc2626',borderRadius:'8px',padding:'10px 14px',color:'#fca5a5',fontSize:'13px',marginBottom:'1rem'}}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{marginBottom:'1rem'}}>
            <label style={{color:'#94a3b8',fontSize:'13px',display:'block',marginBottom:'6px'}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required style={{width:'100%',padding:'10px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px',boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{color:'#94a3b8',fontSize:'13px',display:'block',marginBottom:'6px'}}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required style={{width:'100%',padding:'10px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px',boxSizing:'border-box'}} />
          </div>
          <button type="submit" disabled={loading} style={{width:'100%',padding:'12px',background: loading ? '#1e40af' : '#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'14px',fontWeight:'600',cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
