import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
const App = () => {
  return (
      <main className="min-h-screen overflow-x-hidden bg-blue-50">
        <Navbar />
        <Hero />
        <About />
       
      </main>
  )
}

export default App;