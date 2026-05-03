import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'

const lineColors = { 'Painting':'#22c55e', 'Procurement':'#3b82f6', 'Advisory':'#f59e0b' }

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name:'', company:'', role:'', phone:'', email:'', line:'Painting', notes:'' })

  useEffect(() => { fetchContacts() }, [])

  const fetchContacts = async () => {
    setLoading(true)
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    if (data) setContacts(data)
    setLoading(false)
  }

  const addContact = async () => {
    if (!form.name) return
    const { data } = await supabase.from('contacts').insert([form]).select()
    if (data) setContacts([data[0], ...contacts])
    setForm({ name:'', company:'', role:'', phone:'', email:'', line:'Painting', notes:'' })
    setShowForm(false)
  }

  const deleteContact = async (id) => {
    await supabase.from('contacts').delete().eq('id', id)
    setContacts(contacts.filter(c => c.id !== id))
  }

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  )

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
            <h3 style={{color:'#f1f5f9',fontSize:'15

