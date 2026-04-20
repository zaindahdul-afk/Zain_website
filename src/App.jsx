import HeroScene from './components/HeroScene'
import './App.css'

function App() {
  return (
    <>
      <HeroScene />

      <div className="ticks" />

      <section id="next-steps">
        <div id="docs">
          <h2>About</h2>
          <p>Mechanical Engineering student building cool things.</p>
        </div>
        <div id="social">
          <h2>Connect</h2>
          <p>Find me on GitHub, LinkedIn, or reach out by email.</p>
        </div>
      </section>

      <div className="ticks" />
      <section id="spacer" />
    </>
  )
}

export default App
