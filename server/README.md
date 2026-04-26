# ClientConnect Pro – Mini CRM System

## 📌 Project Overview

ClientConnect Pro is a full-stack CRM (Customer Relationship Management) system built using the MERN stack. It allows users to manage client leads efficiently with features like adding, updating, deleting, and tracking lead status.

---

## 🚀 Features

* Add new leads (Name, Email, Phone, Source, Notes)
* View all leads in a structured table
* Update lead status (New, Contacted, Converted)
* Edit and delete leads
* Search functionality
* Dark mode toggle
* Simple admin login system

---

## 🛠️ Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: MongoDB
* API: REST APIs using Axios

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/naushinalam1105/FUTURE_FS_02.git
cd FUTURE_FS_02
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGO_URI=mongodb://naushinalam_db_user:admin1234@ac-ybukap0-shard-00-00.1vxhohe.mongodb.net:27017,ac-ybukap0-shard-00-01.1vxhohe.mongodb.net:27017,ac-ybukap0-shard-00-02.1vxhohe.mongodb.net:27017/?ssl=true&replicaSet=atlas-eifs3d-shard-0&authSource=admin&appName=Cluster0
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

Open new terminal:

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Local URLs

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

## 📦 Project Structure

```
client/ → React frontend  
server/ → Express backend  
models/ → MongoDB schemas  
routes/ → API routes  
```

---

## 💡 Real-World Use

This system can be used by small businesses or freelancers to manage client interactions and track leads effectively.

---

## 👩‍💻 Author

Naushin
