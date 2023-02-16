import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/app.css'

//Pages
import Books from './pages/Books'
import Users from './pages/Users'
import Login from './pages/Login'
import AddUser from './pages/AddUser'

// Components
import Header from './components/Header'
import Layout from './components/Layout'

// Context
import { UserProvider } from './context/UserContext'
import Loader from './components/Loader'

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/books" element={<Books />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Layout>
        </Router>
        <Loader />
      </UserProvider>
    </>
  )
}

export default App
