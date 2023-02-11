import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/app.css'

//Pages
import Books from './pages/Books'
import Users from './pages/Users'

// Components
import Header from './components/Header'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
