import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Trash2, Edit3, Phone, Mail, Globe, Lock, ShieldCheck, X, Send, Sun, Moon, BarChart3, PieChart, LayoutGrid } from "lucide-react";

const App = () => {
  // --- CORE STATES ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [loginCreds, setLoginCreds] = useState({ email: "admin@pro.com", password: "admin123" });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", source: "LinkedIn", notes: "" });

  useEffect(() => { if (isLoggedIn) fetchLeads(); }, [isLoggedIn]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (err) { console.error("Database Connection Error", err); }
  };

  // --- ANALYTICS CALCULATIONS ---
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCreds.password === "admin123") setIsLoggedIn(true);
    else alert("Invalid Access Key!");
  };

  // --- VIEW 1: LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className={`flex items-center justify-center min-h-screen w-full transition-colors duration-500 ${darkMode ? 'bg-[#030508]' : 'bg-slate-100'}`}>
        <div className={`w-full max-w-md p-10 rounded-[3rem] border backdrop-blur-3xl text-center shadow-2xl transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <ShieldCheck className="text-blue-600 mx-auto mb-6" size={48} />
          <h1 className={`text-3xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>CLIENTCONNECT <span className="text-blue-600">PRO</span></h1>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input type="password" placeholder="Access Key (admin123)" className={`w-full p-4 rounded-2xl outline-none border transition-all text-center ${darkMode ? 'bg-black/20 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'}`} onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})} />
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-transform">Unlock CRM</button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DASHBOARD + SIDEBAR ---
  return (
    <div className={`min-h-screen w-full transition-colors duration-700 font-sans ${darkMode ? 'bg-[#030508] text-slate-300' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Decor */}
      {darkMode && <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>}

      <div className="max-w-[1600px] mx-auto px-6 py-10">
        
        {/* HEADER */}
        <header className={`flex justify-between items-center mb-10 p-8 rounded-[2.5rem] border backdrop-blur-2xl transition-all ${darkMode ? 'bg-white/[0.03] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'}`}>
          <div>
            <h1 className={`text-3xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>CLIENTCONNECT <span className="text-blue-600">PRO</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Enterprise Control</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-xl transition-all hover:scale-110 ${darkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl shadow-blue-600/30 uppercase text-xs tracking-widest active:scale-95 transition-all">+ Add Lead</button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT: MAIN PIPELINE --- */}
          <div className="flex-1">
            <div className={`rounded-[3rem] border overflow-hidden shadow-2xl backdrop-blur-xl ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                   <h2 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-800'}`}>Client Pipeline</h2>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                  <input type="text" placeholder="Filter leads..." className={`w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm transition-all ${darkMode ? 'bg-black/40 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'}`} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className={`text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                    <tr><th className="px-8 py-5">Client</th><th className="px-8 py-5">Source</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((l, i) => (
                      <tr key={i} className="hover:bg-blue-600/5 transition-colors group">
                        <td className="px-8 py-6">
                          <p className={`font-black uppercase text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{l.name}</p>
                          <p className="text-[10px] opacity-60 font-bold">{l.email}</p>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><Globe size={12}/> {l.source}</td>
                        <td className="px-8 py-6">
                           <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${l.status === 'converted' ? 'text-green-500 border-green-500/20' : 'text-blue-500 border-blue-500/20'}`}>
                             {l.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right"><Trash2 className="inline cursor-pointer hover:text-red-500 text-slate-600 transition-colors" size={16}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --- RIGHT: ANALYTICS SIDEBAR --- */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className={`p-8 rounded-[2.5rem] border shadow-2xl transition-all ${darkMode ? 'bg-white/[0.03] border-white/10 shadow-black' : 'bg-white border-slate-200 shadow-slate-200'}`}>
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="text-blue-600" size={24} />
                <h2 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-800'}`}>Analytics</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Total Leads", val: stats.total, color: "bg-blue-600" },
                  { label: "New Entries", val: stats.new, color: "bg-orange-500" },
                  { label: "Contacted", val: stats.contacted, color: "bg-yellow-500" },
                  { label: "Converted", val: stats.converted, color: "bg-green-500" }
                ].map((s, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${darkMode ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{s.label}</p>
                      <p className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>{s.val}</p>
                    </div>
                    <div className={`w-1.5 h-10 rounded-full shadow-lg ${s.color}`}></div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-8 p-6 rounded-2xl text-center border ${darkMode ? 'bg-blue-600/10 border-blue-600/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1">Conversion Velocity</p>
                 <p className="text-3xl font-black">{stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%</p>
              </div>
            </div>
            
            <button onClick={() => setIsLoggedIn(false)} className={`w-full p-4 rounded-2xl border font-bold text-xs uppercase tracking-widest transition-all ${darkMode ? 'border-white/5 text-slate-600 hover:text-white' : 'border-slate-200 text-slate-400 hover:text-slate-800'}`}>Terminate Session</button>
          </aside>

        </div>
      </div>

      {/* MODAL POPUP (Preserved from current version) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
           <div className={`w-full max-w-lg rounded-[2.5rem] border shadow-2xl relative p-8 transition-all ${darkMode ? 'bg-[#0f1217] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase tracking-tighter">Register Client</h2>
                <X className="cursor-pointer opacity-50 hover:opacity-100" onClick={() => setIsModalOpen(false)} />
              </div>
              <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); setIsModalOpen(false); }}>
                 <input type="text" placeholder="Client Name" className={`w-full p-4 rounded-xl outline-none border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
                 <input type="email" placeholder="Email" className={`w-full p-4 rounded-xl outline-none border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
                 <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-xs mt-4">Save Entry</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;