import HeroScene from './components/HeroScene'
import './App.css'

const MARQUEE_ITEMS = [
  'Built Different',
  'Mechanical Engineering',
  'UC Berkeley',
  'Innovation',
  'Design',
  'Analysis',
  'Engineering',
]

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-outer" aria-hidden>
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <HeroScene />

      <div className="ticks" />

      <Marquee />

      <div className="ticks" />

      {/* Education */}
      <section id="education" className="portfolio-section">
        <h2>Education</h2>
        <div className="edu-block">
          <div className="edu-meta">
            <strong>University of California, Berkeley</strong>
            <span>B.S. Mechanical Engineering</span>
          </div>
          <ul className="portfolio-list">
            <li>3.7 GPA</li>
            <li>Relevant Courses: Multivariable Calculus, Physics, Engineering 3D Model and Design, Python for Engineers</li>
            <li>Phi Kappa Psi</li>
            <li>Professional Development: Wind Turbine</li>
          </ul>
        </div>
      </section>

      <div className="ticks" />

      {/* Engineering Internship */}
      <section id="experience" className="portfolio-section">
        <h2>Engineering Internship</h2>
        <div className="exp-block">
          <div className="exp-meta">
            <strong>[Company Name]</strong>
            <span>Engineering Intern · [Start] – [End]</span>
          </div>
          <ul className="portfolio-list">
            <li>Supported mechanical design reviews and prototype development cycles</li>
            <li>Performed dimensional inspection and quality control measurements</li>
            <li>Prepared technical documentation and engineering reports</li>
            <li>Collaborated with cross-functional teams throughout the product development lifecycle</li>
          </ul>
        </div>
      </section>

      <div className="ticks" />

      {/* Contact */}
      <section id="contact" className="portfolio-section contact-section">
        <h2>Get in Touch</h2>
        <p>
          <a href="mailto:zaindahdul@berkeley.edu">zaindahdul@berkeley.edu</a>
        </p>
      </section>

      <div className="ticks" />
      <section id="spacer" />
    </>
  )
}

export default App
