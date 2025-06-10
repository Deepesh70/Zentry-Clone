import React from 'react'
import Hero from './components/Hero'

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Hero />
      <section className="z-0 min-h-screen bg-blue-500"/>
    </main>
  )
}

export default App