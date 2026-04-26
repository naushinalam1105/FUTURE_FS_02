import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, Plus, Trash2, Edit3, Phone, Mail, Globe, 
  Lock, ShieldCheck, X, Send, Sun, Moon, BarChart3, 
  PieChart, LayoutGrid, CheckCircle2, MessageSquare 
} from "lucide-react";

const App = () => {
  // --- STATES ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null); 
  
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ 
    name: "", email: "", phone: "", source: "LinkedIn", status: "new", notes: "" 
  });

  // --- API CALLS ---
  useEffect(() => { 
    if (isLoggedIn) fetchLeads(); 
  }, [isLoggedIn]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://future-fs-02-v64z.onrender.com/api/leads");
      setLeads(res.data);
    } catch (err) { 
      console.error("Fetch error", err); 
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://future-fs-02-v64z.onrender.com/api/leads", formData);
      setIsAddModalOpen(false);
      fetchLeads();
      setFormData({ name: "", email: "", phone: "", source: "LinkedIn", status: "new", notes: "" });
    } catch (err) { 
      alert("Error adding lead."); 
    }
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    if (!editingLead?._id) return;

    try {
      // Sending specific data to the exact ID URL
      await axios.put(`https://future-fs-02-v64z.onrender.com/api/leads/${editingLead._id}`, {
        name: editingLead.name,
        email: editingLead.email,
        status: editingLead.status,
        notes: editingLead.notes,
        source: editingLead.source
      });

      setEditingLead(null); 
      fetchLeads(); 
    } catch (err) { 
      console.error("Update error:", err);
      alert("Update failed. Make sure your Backend PUT route matches the URL structure."); 
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Permanent delete this record?")) {
      try {
        await axios.delete(`https://future-fs-02-v64z.onrender.com/api/leads/${id}`);
        fetchLeads();
      } catch (err) { 
        alert("Delete failed"); 
      }
    }
  };

  // --- STATS ---
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  // --- AUTH VIEW ---
  if (!isLoggedIn) {
    return (
      <div className={`flex items-center justify-center min-h-screen w-full transition-all duration-500 ${darkMode ? 'bg-[#030508]' : 'bg-slate-100'}`}>
        <div className={`w-full max-w-md p-10 rounded-[3rem] border backdrop-blur-3xl shadow-2xl text-center transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/40">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className={`text-3xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>CLIENTCONNECT <span className="text-blue-600">PRO</span></h1>
          <form onSubmit={(e) => { e.preventDefault(); if(loginCreds.password === "admin123") setIsLoggedIn(true); else alert("Wrong Key!"); }} className="mt-8 space-y-4">
            <input type="password" placeholder="Access Key (admin123)" className={`w-full p-4 rounded-2xl text-center outline-none border transition-all ${darkMode ? 'bg-black/20 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900'}`} onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})} />
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg hover:bg-blue-500 transition-all">Unlock System</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${darkMode ? 'bg-[#030508] text-slate-300' : 'bg-slate-50 text-slate-900'}`}>
      
      {darkMode && <div className="fixed inset-0 -z-10"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/5 rounded-full blur-[140px]"></div></div>}

      <div className="max-w-[1600px] mx-auto px-6 py-10">
        
        <header className={`flex justify-between items-center mb-10 p-8 rounded-[2.5rem] border backdrop-blur-2xl transition-all ${darkMode ? 'bg-white/[0.03] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'}`}>
          <div>
            <h1 className={`text-3xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>CLIENTCONNECT <span className="text-blue-600">PRO</span></h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Command Center v3.0</p>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-xl transition-all hover:rotate-12 ${darkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl shadow-blue-600/30 uppercase text-xs tracking-widest hover:bg-blue-500 transition-all">+ Add Lead</button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1">
            <div className={`rounded-[3rem] border overflow-hidden shadow-2xl backdrop-blur-xl ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  <div className="w-1 h-5 bg-blue-600 rounded-full"></div> Pipeline
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                  <input type="text" placeholder="Search..." className={`w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <table className="w-full text-left">
                <thead className={`text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                  <tr>
                    <th className="px-8 py-5">Client Identity & Notes</th>
                    <th className="px-8 py-5">Source</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((l, i) => (
                    <tr key={i} className="hover:bg-blue-600/5 transition-colors group">
                      <td className="px-8 py-7">
                        <p className={`font-black uppercase text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{l.name}</p>
                        <p className="text-[10px] font-bold opacity-50 flex items-center gap-1 mt-1"><Mail size={12}/>{l.email}</p>
                        {l.notes && (
                          <div className="mt-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[11px] italic text-blue-400 flex gap-2">
                            <MessageSquare size={12} className="shrink-0 mt-0.5" />
                            <span>{l.notes}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-7 text-[10px] font-black text-blue-500 uppercase tracking-widest"><Globe className="inline mr-1" size={12}/> {l.source}</td>
                      <td className="px-8 py-7">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${l.status === 'converted' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-blue-500 border-blue-500/20 bg-blue-500/5'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-8 py-7 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingLead(l)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={14}/></button>
                          <button onClick={() => deleteLead(l._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <div className={`p-8 rounded-[2.5rem] border shadow-2xl ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200'}`}>
              <h2 className="text-xs font-black uppercase tracking-widest mb-8 text-blue-600">Analytics</h2>
              <div className="space-y-4">
                {[
                  { label: "Total Leads", val: stats.total, color: "bg-blue-600" },
                  { label: "New", val: stats.new, color: "bg-orange-500" },
                  { label: "Contacted", val: stats.contacted, color: "bg-yellow-500" },
                  { label: "Converted", val: stats.converted, color: "bg-green-500" }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase">{s.label}</p>
                      <p className="text-2xl font-black">{s.val}</p>
                    </div>
                    <div className={`w-1 h-8 rounded-full ${s.color}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* --- ADD MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
          <div className={`w-full max-w-lg rounded-[2.5rem] border p-8 shadow-2xl relative ${darkMode ? 'bg-[#0f1217] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black uppercase italic">New Client</h2><X className="cursor-pointer" onClick={() => setIsAddModalOpen(false)} /></div>
            <form className="space-y-4" onSubmit={handleAddLead}>
              <input type="text" placeholder="Name" required className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email" required className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <textarea placeholder="Notes..." className={`w-full p-4 rounded-xl border outline-none h-24 resize-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg uppercase text-xs tracking-widest mt-4">Save To Cloud</button>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editingLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
          <div className={`w-full max-w-lg rounded-[2.5rem] border p-8 shadow-2xl relative ${darkMode ? 'bg-[#0f1217] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black uppercase italic">Modify Data</h2><X className="cursor-pointer" onClick={() => setEditingLead(null)} /></div>
            <form className="space-y-4" onSubmit={handleUpdateLead}>
              <input type="text" value={editingLead.name} className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setEditingLead({...editingLead, name: e.target.value})} />
              <select value={editingLead.status} className={`w-full p-4 rounded-xl border outline-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setEditingLead({...editingLead, status: e.target.value})}>
                <option value="new">New</option><option value="contacted">Contacted</option><option value="converted">Converted</option>
              </select>
              <textarea value={editingLead.notes} className={`w-full p-4 rounded-xl border outline-none h-24 resize-none ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} onChange={(e) => setEditingLead({...editingLead, notes: e.target.value})} />
              <button className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-lg uppercase text-xs tracking-widest mt-4">Commit Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;