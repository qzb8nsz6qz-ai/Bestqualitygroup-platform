import React from 'react'

const nav = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'contacts', label: 'Contacts', path: '/contacts' },
  { id: 'communications', label: 'Communications', path: '/communications' },
]

export default function Sidebar({ active }) {
  return (
    <div style={{width:'220px',background:'#1e293b',borderRight:'1px solid #334155',padding:'1.5rem 1rem',display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{marginBottom:'2rem',paddingLeft:'8px'}}>
        <div style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'700'}}>Best Quality Group</div>
        <div style={{color:'#64748b',fontSize:'11px',marginTop:'2px'}}>Command Center</div>
      </div>
      <nav style={{display:'flex',flexDirection:'column',gap:'4px'}}>
        {nav.map(n => (
          <a key={n.id} href={n.path} style={{padding:'10px 12px',borderRadius:'8px',color: active===n.id ? '#f1f5f9' : '#64748b',background: active===n.id ? '#334155' : 'transparent',textDecoration:'none',fontSize:'14px',fontWeight: active===n.id ? '600' : '400',transition:'all 0.15s'}}>
            {n.label}
          </a>
        ))}
      </nav>
      <div style={{marginTop:'auto',padding:'12px',background:'#0f172a',borderRadius:'8px',border:'1px solid #334155'}}>
        <div style={{color:'#94a3b8',fontSize:'12px'}}>Logged in as</div>
        <div style={{color:'#f1f5f9',fontSize:'13px',fontWeight:'600',marginTop:'2px'}}>David</div>
        <div style={{color:'#64748b',fontSize:'11px'}}>Owner</div>
      </div>
    </div>
  )
}
