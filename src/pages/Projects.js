import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'

const statusColors = {
  'Estimate':'#f59e0b','Approved':'#3b82f6','In Progress':'#22c55e','Complete':'#64748b','Active':'#a855f7'
}
const typeColors = {
  'Painting':'#22c55e','Procurement':'#3b82f6','Advisory':'#f59e0b'
}
const stages = ['Estimate','Approved','In Progress','Complete']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState({})
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name:'', client:'', type:'Painting', value:'', status:'Estimate', notes:'' })

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  const addProject = async () => {
    if (!form.name) return
    const { data } = await supabase.from('projects').insert([form]).select()
    if (data) setProjects([data[0], ...projects])
    setForm({ name:'', client:'', type:'Painting', value:'', status:'Estimate', notes:'' })
    setShowForm(false)
  }

  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const updateStatus = async (id, status) => {
    await supabase.from('projects').update({ status }).eq('id', id)
    setProjects(projects.map(p => p.id === id ? { ...p, status } : p))
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  const addComment = (id) => {
    if (!comment.trim()) return
    const time = new Date().toLocaleString()
    setComments({ ...comments, [id]: [...(comments[id] || []), { text: comment, time }] })
    setComment('')
  }

  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter)

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
              {[['Project Name','name'],['Client','client'],['Value','value']].map(([label,key]) => (
                <div key={key}>
                  <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>{label}</label>
                  <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px',boxSizing:'border-box'}} />
                </div>
              ))}
              <div>
                <label style={{color:'#94a3b8',fontSize:'12px',display:'block',marginBottom:'4px'}}>Type</label>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{width:'100%',padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px'}}>
                  <option>Painting</option><option>Procurement</option><option>Advisory</option>
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

        <div style={{display:'grid',gridTemplateColumns: selected ? '1fr 380px' : '1fr',gap:'16px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {loading ? <div style={{color:'#64748b',fontSize:'14px'}}>Loading projects...</div> :
            filtered.map(p => (
              <div key={p.id} onClick={()=>setSelected(selected?.id===p.id ? null : p)} style={{background: selected?.id===p.id ? '#1e3a5f' : '#1e293b',borderRadius:'12px',padding:'16px 20px',border:`1px solid ${selected?.id===p.id ? '#3b82f6' : '#334155'}`,display:'flex',alignItems:'center',gap:'16px',cursor:'pointer',transition:'all 0.15s'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px'}}>
                    <span style={{color:'#f1f5f9',fontSize:'14px',fontWeight:'600'}}>{p.name}</span>
                    <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: typeColors[p.type]+'22',color: typeColors[p.type]}}>{p.type}</span>
                    <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'99px',background: statusColors[p.status]+'22',color: statusColors[p.status]}}>{p.status}</span>
                  </div>
                  <div style={{color:'#64748b',fontSize:'12px'}}>{p.client} · {p.notes}</div>
                </div>
                <div style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'700'}}>{p.value}</div>
                <button onClick={e=>{e.stopPropagation();deleteProject(p.id)}} style={{padding:'6px 12px',background:'transparent',border:'1px solid #334155',borderRadius:'6px',color:'#64748b',fontSize:'12px',cursor:'pointer'}}>Delete</button>
              </div>
            ))}
          </div>

          {selected && (
            <div style={{background:'#1e293b',borderRadius:'12px',border:'1px solid #334155',padding:'20px',height:'fit-content',position:'sticky',top:'0'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <h3 style={{color:'#f1f5f9',fontSize:'15px',fontWeight:'600'}}>{selected.name}</h3>
                <button onClick={()=>setSelected(null)} style={{background:'none',border:'none',color:'#64748b',fontSize:'18px',cursor:'pointer'}}>×</button>
              </div>

              <div style={{marginBottom:'16px'}}>
                <div style={{color:'#94a3b8',fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>Move Stage</div>
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  {stages.map(s => (
                    <button key={s} onClick={()=>updateStatus(selected.id, s)} style={{padding:'8px 12px',borderRadius:'8px',border:'1px solid',borderColor: selected.status===s ? statusColors[s] : '#334155',background: selected.status===s ? statusColors[s]+'22' : 'transparent',color: selected.status===s ? statusColors[s] : '#64748b',fontSize:'13px',cursor:'pointer',textAlign:'left',fontWeight: selected.status===s ? '600' : '400'}}>
                      {selected.status===s ? '● ' : '○ '}{s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{color:'#94a3b8',fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>Comments</div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'10px',maxHeight:'200px',overflowY:'auto'}}>
                  {(comments[selected.id] || []).length === 0 && <div style={{color:'#475569',fontSize:'12px'}}>No comments yet</div>}
                  {(comments[selected.id] || []).map((c,i) => (
                    <div key={i} style={{background:'#0f172a',borderRadius:'8px',padding:'10px',border:'1px solid #334155'}}>
                      <div style={{color:'#f1f5f9',fontSize:'13px'}}>{c.text}</div>
                      <div style={{color:'#475569',fontSize:'11px',marginTop:'4px'}}>{c.time}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'8px'}}>
                  <input value={comment} onChange={e=>setComment(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addComment(selected.id)} placeholder="Add a comment..." style={{flex:1,padding:'8px 12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#f1f5f9',fontSize:'13px'}} />
                  <button onClick={()=>addComment(selected.id)} style={{padding:'8px 14px',background:'#3b82f6',border:'none',borderRadius:'8px',color:'white',fontSize:'13px',cursor:'pointer'}}>Add</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
