import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginPage from './components/LoginPage.jsx'
import Signup from './components/SignupPage.jsx'
import HomePage from './Homepage/HomePage.jsx'
import AddProduct from './addProducts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  )
}

export default App
