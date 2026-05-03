import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'

const lineColors = { 'Painting':'#22c55e','Procurement':'#3b82f6','Advisory':'#f59e0b' }

export default function Communications() {
  const [comms, setComms] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ contact_name:'', role:'', message:'', line:'Painting', tags:'' })

  useEffect(() => { fetchComms() }, [])

  const fetchComms = async () => {
    setLoading(true)
    const { data } = await supabase.from('communications').select('*').order('created_at', { ascending: false })
    if (data) setComms(data)
    setLoading(false)
  }

  const addComm = async () => {
    if (!form.contact_name || !form.message) return
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()) : []
    const { data } = await supabase.from('communications').insert([{ ...form, tags }]).select()
    if (data) setComms([data[0], ...comms])
    setForm({ contact_name:'', role:'', message:'', line:'Painting', tags:'' })
    setShowForm(false)
  }

  const deleteComm = async (id) => {
    await supabase.from('communications').delete().eq('id', id)
    setComms(comms.filter(c => c.id !== id))
  }

  const filtered = comms.filter(c => {
    const matchLine = filter === 'All' || c.line === filter
    const matchSearch = !search || c.contact_name.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase())
    return matchLine && matchSearch
  })

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0f172a'}}>
      <Sidebar active="communications" />
      <main style={{flex:1,padding:'2rem',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{color:'#f1f5f9',fontSize:'22px',fontWeight:'700'}}>Communications</h1>
            <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>All client and partner messages across every business line</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{padding:'10px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>+ Log Message</button>
        </div>
        <div style={{display:'flex',gap:'8px',marginBottom:'1rem'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search messages..." style={{flex:1,padding:'10px 14px',background:'#1e293b',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px',boxSizing:'border-box'}} />
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:'10px 14px',background:'#1e293b',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px'}}>
            <option>All</option><option>Painting</option><option>Procurement</option><option>Advisory</option>
          </select>
        </div>
        {showForm && (
          <div style={{background:'#1e293b',borderRadius:'12px',padding:'20px',border:'1px solid #334155',marginBottom:'1.5rem'}}>
            <h3 style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>Log Communication</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['Contact Name','contact_name'],['Role / Company','role'],['Tags (comma separated)','tags']].map(([label,key]) => (
                <div key={key}>
                  <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>{label}</label>
                  <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box'}} />
                </div>
              ))}
              <div>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Business Line</label>
                <select value={form.line} onChange={e=>setForm({...form,line:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px'}}>
                  <option>Painting</option><option>Procurement</option><option>Advisory</option>
                </select>
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Message / Summary</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={3} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box',resize:'vertical'}} />
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
              <button onClick={addComm} style={{padding:'8px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Save</button>
              <button onClick={()=>setShowForm(false)} style={{padding:'8px 20px',background:'transparent',border:'1px solid #334155',borderRadius:'8px',color:'#64748b',fontSize:'13px',cursor:'pointer'}}>Cancel</button>
            </div>
          </div>
        )}
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {loading ? <div style={{color:'#64748b',fontSize:'14px'}}>Loading communications...</div> :
          filtered.length === 0 ? <div style={{color:'#64748b',fontSize:'14px'}}>No messages yet. Log your first communication above.</div> :
          filtered.map(c => (
            <div key={c.id} style={{background:'#1e293b',borderRadius:'12px',padding:'16px 20px',border:'1px solid #334155'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',color:'#f1f5f9',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{c.contact_name[0]}</div>
                  <div>
                    <div style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'600'}}>{c.contact_name} <span style={{color:'#64748b',fontWeight:'400',fontSize:'12px'}}>· {c.role}</span></div>
                    <div style={{color:'#64748b',fontSize:'11px'}}>{new Date(c.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: lineColors[c.line]+'22',color: lineColors[c.line]}}>{c.line}</span>
                  <button onClick={()=>deleteComm(c.id)} style={{padding:'4px 10px',background:'transparent',border:'1px solid #334155',borderRadius:'6px',color:'#64748b',fontSize:'11px',cursor:'pointer'}}>Delete</button>
                </div>
              </div>
              <div style={{color:'#94a3b8',fontSize:'13px',marginBottom:'10px',paddingLeft:'46px'}}>{c.message}</div>
              <div style={{display:'flex',gap:'6px',paddingLeft:'46px',flexWrap:'wrap'}}>
                {(c.tags || []).map((t,i) => <span key={i} style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background:'#334155',color:'#94a3b8'}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
