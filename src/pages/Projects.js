import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const initialProjects = [
  { id:1, name:'Johnson Residence', client:'Todd Campbell Custom Homes', type:'Painting', value:'$5,600', status:'In Progress', notes:'Exterior cedar siding day 3/5' },
  { id:2, name:'White Swan Project', client:'Todd Campbell Custom Homes', type:'Procurement', value:'$24,600', status:'Estimate', notes:'Cabinets and doors, awaiting approval' },
  { id:3, name:'Best Western North Lodge', client:'Andy', type:'Painting', value:'$48,000', status:'Approved', notes:'PIP full hotel interior' },
  { id:4, name:'Pizzeria CA', client:'CA Seller', type:'Advisory', value:'$75,000', status:'Active', notes:'MCA negotiation in progress' },
  { id:5, name:'Meridian New Build', client:'Sun Valley Builders', type:'Painting', value:'$18,000', status:'In Progress', notes:'Full interior new construction day 7/14' },
]

const statusColors = {
  'Estimate':'#f59e0b','Approved':'#3b82f6','In Progress':'#22c55e','Active':'#a855f7','Complete':'#64748b'
}

const typeColors = {
  'Painting':'#22c55e','Procurement':'#3b82f6','Advisory':'#f59e0b'
}

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects)
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', client:'', type:'Painting', value:'', status:'Estimate', notes:'' })

  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter)

  const addProject = () => {
    if (!form.name) return
    setProjects([...projects, { ...form, id: Date.now() }])
    setForm({ name:'', client:'', type:'Painting', value:'', status:'Estimate', notes:'' })
    setShowForm(false)
  }

  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id))

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0f172a'}}>
      <Sidebar active="projects" />
      <main style={{flex:1,padding:'2rem',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <div>
            <h1 style={{color:'#f1f5f9',fontSize:'22px',fontWeight:'700'}}>Projects</h1>
            <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>All active deals across every business line</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{padding:'10px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>+ New Project</button>
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'1.5rem'}}>
          {['All','Painting','Procurement','Advisory'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{padding:'6px 16px',borderRadius:'99px',border:'1px solid',borderColor: filter===f ? '#3b82f6' : '#334155',background: filter===f ? '#3b82f6' : 'transparent',color: filter===f ? 'white' : '#64748b',fontSize:'13px',cursor:'pointer'}}>{f}</button>
          ))}
        </div>

        {showForm && (
          <div style={{background:'#1e293b',borderRadius:'12px',padding:'20px',border:'1px solid #334155',marginBottom:'1.5rem'}}>
            <h3 style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'600',marginBottom:'16px'}}>New Project</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['Project Name','name','text'],['Client','client','text'],['Value','value','text']].map(([label,key,type]) => (
                <div key={key}>
                  <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>{label}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box'}} />
                </div>
              ))}
              <div>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Type</label>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px'}}>
                  <option>Painting</option><option>Procurement</option><option>Advisory</option>
                </select>
              </div>
              <div>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px'}}>
                  <option>Estimate</option><option>Approved</option><option>In Progress</option><option>Active</option><option>Complete</option>
                </select>
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Notes</label>
                <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box'}} />
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
              <button onClick={addProject} style={{padding:'8px 20px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Save Project</button>
              <button onClick={()=>setShowForm(false)} style={{padding:'8px 20px',background:'transparent',border:'1px solid #334155',borderRadius:'8px',color:'#64748b',fontSize:'13px',cursor:'pointer'}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {filtered.map(p => (
            <div key={p.id} style={{background:'#1e293b',borderRadius:'12px',padding:'16px 20px',border:'1px solid #334155',display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px'}}>
                  <span style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'600'}}>{p.name}</span>
                  <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: typeColors[p.type]+'22',color: typeColors[p.type]}}>{p.type}</span>
                  <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: statusColors[p.status]+'22',color: statusColors[p.status]}}>{p.status}</span>
                </div>
                <div style={{color:'#64748b',fontSize:'12px'}}>{p.client} · {p.notes}</div>
              </div>
              <div style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'700',minWidth:'80px',textAlign:'right'}}>{p.value}</div>
              <button onClick={()=>deleteProject(p.id)} style={{padding:'6px 12px',background:'transparent',border:'1px solid #334155',borderRadius:'6px',color:'#64748b',fontSize:'12px',cursor:'pointer'}}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
