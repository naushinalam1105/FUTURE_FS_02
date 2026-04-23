import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: ""
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://future-fs-02-iwlq.onrender.com/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLead = async () => {
    try {
      await axios.post("https://future-fs-02-iwlq.onrender.com/api/leads/add", form);
      setForm({ name: "", email: "", phone: "", source: "", notes: "" });
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`https://future-fs-02-iwlq.onrender.com/api/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://future-fs-02-iwlq.onrender.com/api/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const updateLead = async () => {
    try {
      await axios.put(
        `https://future-fs-02-iwlq.onrender.com/api/leads/${editingId}`,
        form
      );
      setForm({ name: "", email: "", phone: "", source: "", notes: "" });
      setEditingId(null);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong credentials");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Admin Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        background: darkMode
          ? "#1e1e1e"
          : "linear-gradient(135deg, #f4f6f8 60%, #e3f2fd 100%)",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontWeight: "700",
          fontSize: "32px",
          letterSpacing: "1px",
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "Arial",
          color: darkMode ? "#ffffff" : "#000000"
        }}
      >
        ClientConnect Pro: Mini CRM Dashboard 📊
      </h1>

      {/* TOP BUTTONS */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <button
        onClick={() => setIsLoggedIn(false)}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>

      {/* DASHBOARD */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle(darkMode)}>
          Total Leads: {leads.length}
        </div>

        <div style={cardStyle(darkMode)}>
          Converted: {leads.filter(l => l.status === "converted").length}
        </div>

        <div style={cardStyle(darkMode)}>
          Contacted: {leads.filter(l => l.status === "contacted").length}
        </div>
      </div>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add New Lead</h3>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <br /><br />

        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <br /><br />

        <input name="source" placeholder="Source" value={form.source} onChange={handleChange} />
        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <br /><br />

        <button onClick={editingId ? updateLead : addLead}>
          {editingId ? "Update Lead" : "Add Lead"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      {/* TABLE */}
      <table style={tableStyle(darkMode)}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads
            .filter(l =>
              l.name.toLowerCase().includes(search.toLowerCase()) ||
              l.email.toLowerCase().includes(search.toLowerCase())
            )
            .map(lead => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.source}</td>
                <td>{lead.notes}</td>

                <td>
                  <div>{lead.status}</div>

                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="converted">converted</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => {
                      setForm(lead);
                      setEditingId(lead._id);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteLead(lead._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

/* SMALL HELPERS */
const cardStyle = (darkMode) => ({
  background: darkMode ? "#333" : "white",
  padding: "10px",
  borderRadius: "8px"
});

const tableStyle = (darkMode) => ({
  width: "100%",
  background: darkMode ? "#2c2c2c" : "white",
  color: darkMode ? "white" : "black",
  borderCollapse: "collapse"
});

export default App;