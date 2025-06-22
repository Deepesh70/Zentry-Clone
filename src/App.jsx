import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Feature from './components/Feature'
const App = () => {
  return (
      <main className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Feature />
      </main>
  )
}

export default App;