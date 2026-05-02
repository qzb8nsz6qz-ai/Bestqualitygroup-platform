import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const initialContacts = [
  { id:1, name:'Todd Campbell', company:'Todd Campbell Custom Homes', role:'Builder', phone:'208-555-0101', email:'todd@toddcampbell.com', line:'Procurement', notes:'Primary Idaho builder contact' },
  { id:2, name:'Vera', company:'Idaho Custom Cabinets', role:'Supplier', phone:'208-555-0102', email:'vera@idahocabinets.com', line:'Procurement', notes:'Cabinet supplier, 6 week lead time' },
  { id:3, name:'Andy', company:'Best Western North Lodge', role:'Client', phone:'208-555-0103', email:'andy@bestwesternnl.com', line:'Painting', notes:'Hotel PIP client, draw request approved' },
  { id:4, name:'Father-in-law', company:'Best Quality Painting', role:'Ops Manager', phone:'208-555-0104', email:'', line:'Painting', notes:'Idaho operations, runs day to day' },
  { id:5, name:'CA Seller', company:'Pizzeria CA', role:'Seller', phone:'310-555-0105', email:'', line:'Advisory', notes:'$300K MCA, open to negotiation' },
]

const lineColors = { 'Painting':'#22c55e', 'Procurement':'#3b82f6', 'Advisory':'#f59e0b' }

export default function Contacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', role:'', phone:'', email:'', line:'Painting', notes:'' })

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  )

  const addContact = () => {
    if (!form.name) return
    setContacts([...contacts, { ...form, id: Date.now() }])
    setForm({ name:'', company:'', role:'', phone:'', email:'', line:'Painting', notes:'' })
    setShowForm(false)
  }

  const deleteContact = (id) => setContacts(contacts.filter(c => c.id !== id))

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0f172a'}}>
      <Sidebar active="contacts" />
      <main style={{flex:1,padding:'2rem',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{color:'#f1f5f9',fontSize:'22px',fontWeight:'700'}}>Contacts</h1>
            <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>Clients, builders, suppliers and partners</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{padding:'10px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>+ New Contact</button>
        </div>

        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search contacts..." style={{width:'100%',padding:'10px 14px',background:'#1e293b',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'14px',marginBottom:'1.5rem',boxSizing:'border-box'}} />

        {showForm && (
          <div style={{background:'#1e293b',borderRadius:'12px',padding:'20px',border:'1px solid #334155',marginBottom:'1.5rem'}}>
            <h3 style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>New Contact</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['Name','name'],['Company','company'],['Role','role'],['Phone','phone'],['Email','email']].map(([label,key]) => (
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
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Notes</label>
                <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box'}} />
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
              <button onClick={addContact} style={{padding:'8px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Save Contact</button>
              <button onClick={()=>setShowForm(false)} style={{padding:'8px 20px',background:'transparent',border:'1px solid #334155',borderRadius:'8px',color:'#64748b',fontSize:'13px',cursor:'pointer'}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {filtered.map(c => (
            <div key={c.id} style={{background:'#1e293b',borderRadius:'12px',padding:'16px 20px',border:'1px solid #334155',display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',color:'#f1f5f9',fontSize:'15px',fontWeight:'700',flexShrink:0}}>
                {c.name[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px'}}>
                  <span style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'600'}}>{c.name}</span>
                  <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: lineColors[c.line]+'22',color: lineColors[c.line]}}>{c.line}</span>
                </div>
                <div style={{color:'#64748b',fontSize:'12px'}}>{c.company} · {c.role}</div>
                <div style={{color:'#64748b',fontSize:'12px',marginTop:'2px'}}>{c.notes}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                {c.phone && <div style={{color:'#94a3b8',fontSize:'12px'}}>{c.phone}</div>}
                {c.email && <div style={{color:'#94a3b8',fontSize:'12px'}}>{c.email}</div>}
              </div>
              <button onClick={()=>deleteContact(c.id)} style={{padding:'6px 12px',background:'transparent',border:'1px solid #334155',borderRadius:'6px',color:'#64748b',fontSize:'12px',cursor:'pointer'}}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
