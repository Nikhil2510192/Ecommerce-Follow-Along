import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginPage from './components/LoginPage.jsx'
import Signup from './components/SignupPage.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
