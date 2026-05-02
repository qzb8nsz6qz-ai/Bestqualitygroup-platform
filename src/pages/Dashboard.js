import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const metrics = [
  { label: 'Active Jobs', value: '7', sub: 'Painting — Idaho' },
  { label: 'Open Estimates', value: '4', sub: 'Pending response' },
  { label: 'Procurement Deals', value: '3', sub: 'In pipeline' },
  { label: 'Advisory Deals', value: '2', sub: 'Active engagements' },
]

const activity = [
  { dot: '#22c55e', text: 'Johnson Residence — exterior complete, final invoice sent', time: 'Today 9:14 AM · Painting' },
  { dot: '#f59e0b', text: 'White Swan Project — estimate sent, awaiting approval', time: 'Yesterday 4:30 PM · Procurement' },
  { dot: '#3b82f6', text: 'Pizzeria CA — MCA negotiation initiated, seller engaged', time: 'Yesterday 2:00 PM · M&A Advisory' },
  { dot: '#22c55e', text: 'Best Western North Lodge — PIP invoice approved', time: '2 days ago · Painting' },
  { dot: '#f59e0b', text: 'Todd Campbell — cabinet order confirmed with Vera', time: '3 days ago · Procurement' },
]

export default function Dashboard() {
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0f172a'}}>
      <Sidebar active="dashboard" />
      <main style={{flex:1,padding:'2rem',overflowY:'auto'}}>
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{color:'#f1f5f9',fontSize:'22px',fontWeight:'700'}}>Good morning, David</h1>
          <p style={{color:'#64748b',fontSize:'14px',marginTop:'4px'}}>Here's what's happening across Best Quality Group</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'2rem'}}>
          {metrics.map((m,i) => (
            <div key={i} style={{background:'#1e293b',borderRadius:'12px',padding:'20px',border:'1px solid #334155'}}>
              <div style={{color:'#64748b',fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>{m.label}</div>
              <div style={{color:'#f1f5f9',fontSize:'28px',fontWeight:'700'}}>{m.value}</div>
              <div style={{color:'#64748b',fontSize:'12px',marginTop:'4px'}}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#1e293b',borderRadius:'12px',padding:'20px',border:'1px solid #334155'}}>
          <h2 style={{color:'#94a3b8',fontSize:'12px',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'16px'}}>Recent Activity</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {activity.map((a,i) => (
              <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px',background:'#0f172a',borderRadius:'8px',border:'1px solid #334155'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:a.dot,marginTop:'4px',flexShrink:0}}></div>
                <div>
                  <div style={{color:'#f1f5f9',fontSize:'13px'}}>{a.text}</div>
                  <div style={{color:'#64748b',fontSize:'11px',marginTop:'3px'}}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
