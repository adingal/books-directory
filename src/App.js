import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './assets/css/app.css'
import 'react-toastify/dist/ReactToastify.css'

//Pages
import Books from './pages/Books'
import EditBook from './pages/EditBook'
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
              <Route path="/" element={<Books />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books/edit/:id" element={<EditBook />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Layout>
        </Router>
        <Loader />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
