import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
const App = () => {
  return (
      <main className="min-h-screen bg-gray-100 overflow-x-hidden bg-zinc-600">
        <Navbar />
        <Hero />
        <About />
       
      </main>
  )
}

export default App;