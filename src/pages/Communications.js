import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const initialComms = [
  { id:1, name:'Todd Campbell', role:'Builder — Todd Campbell Custom Homes', msg:'Confirmed cabinet specs for Johnson. Vera will send invoice by Friday.', time:'Today 9:45 AM', line:'Procurement', tags:['Johnson Residence','Cabinets'] },
  { id:2, name:'Father-in-law', role:'Ops — Idaho', msg:'Johnson exterior done. Final walkthrough with client tomorrow morning.', time:'Today 8:30 AM', line:'Painting', tags:['Johnson Residence'] },
  { id:3, name:'Andy', role:'Hotel PIP Client', msg:'Draw request approved by lender. Wire coming Thursday.', time:'Yesterday 3:15 PM', line:'Painting', tags:['Best Western','PIP','Invoice'] },
  { id:4, name:'CA Seller', role:'Advisory — Pizzeria CA', msg:'Confirmed $300K MCA with Greenbox. Open to negotiation.', time:'Yesterday 2:00 PM', line:'Advisory', tags:['Pizzeria CA','MCA'] },
  { id:5, name:'Vera', role:'Idaho Custom Cabinets', msg:'White Swan cabinet quote ready. Lead time is 6 weeks from deposit.', time:'2 days ago', line:'Procurement', tags:['White Swan','Cabinets'] },
]

const lineColors = { 'Painting':'#22c55e','Procurement':'#3b82f6','Advisory':'#f59e0b' }

export default function Communications() {
  const [comms, setComms] = useState(initialComms)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', role:'', msg:'', time:'', line:'Painting', tags:'' })

  const filtered = comms.filter(c => {
    const matchLine = filter === 'All' || c.line === filter
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.msg.toLowerCase().includes(search.toLowerCase())
    return matchLine && matchSearch
  })

  const addComm = () => {
    if (!form.name || !form.msg) return
    const now = new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})
    setComms([{ ...form, id:Date.now(), time: now, tags: form.tags ? form.tags.split(',').map(t=>t.trim()) : [] }, ...comms])
    setForm({ name:'', role:'', msg:'', time:'', line:'Painting', tags:'' })
    setShowForm(false)
  }

  const deleteComm = (id) => setComms(comms.filter(c => c.id !== id))

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
              {[['Contact Name','name'],['Role / Company','role'],['Tags (comma separated)','tags']].map(([label,key]) => (
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
                <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={3} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box',resize:'vertical'}} />
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
              <button onClick={addComm} style={{padding:'8px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Save</button>
              <button onClick={()=>setShowForm(false)} style={{padding:'8px 20px',background:'transparent',border:'1px solid #334155',borderRadius:'8px',color:'#64748b',fontSize:'13px',cursor:'pointer'}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {filtered.map(c => (
            <div key={c.id} style={{background:'#1e293b',borderRadius:'12px',padding:'16px 20px',border:'1px solid #334155'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',color:'#f1f5f9',fontSize:'13px',fontWeight:'700',flexShrink:0}}>{c.name[0]}</div>
                  <div>
                    <div style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'600'}}>{c.name} <span style={{color:'#64748b',fontWeight:'400',fontSize:'12px'}}>· {c.role}</span></div>
                    <div style={{color:'#64748b',fontSize:'11px'}}>{c.time}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: lineColors[c.line]+'22',color: lineColors[c.line]}}>{c.line}</span>
                  <button onClick={()=>deleteComm(c.id)} style={{padding:'4px 10px',background:'transparent',border:'1px solid #334155',borderRadius:'6px',color:'#64748b',fontSize:'11px',cursor:'pointer'}}>Delete</button>
                </div>
              </div>
              <div style={{color:'#94a3b8',fontSize:'13px',marginBottom:'10px',paddingLeft:'46px'}}>{c.msg}</div>
              <div style={{display:'flex',gap:'6px',paddingLeft:'46px',flexWrap:'wrap'}}>
                {c.tags.map((t,i) => <span key={i} style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background:'#334155',color:'#94a3b8'}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
