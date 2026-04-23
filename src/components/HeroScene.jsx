import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroScene.css'

function gearPath(teeth, outer, inner) {
  const tf = 0.44
  let d = ''
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * 2 * Math.PI - Math.PI / 2
    const a1 = ((i + 1) / teeth) * 2 * Math.PI - Math.PI / 2
    const span = a1 - a0
    const ts = a0 + span * (0.5 - tf / 2)
    const te = a0 + span * (0.5 + tf / 2)
    const pts = [
      [inner * Math.cos(ts), inner * Math.sin(ts)],
      [outer * Math.cos(ts), outer * Math.sin(ts)],
      [outer * Math.cos(te), outer * Math.sin(te)],
      [inner * Math.cos(te), inner * Math.sin(te)],
    ]
    d += `${i === 0 ? 'M' : 'L'}${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
    d += `L${pts[1][0].toFixed(1)},${pts[1][1].toFixed(1)}`
    d += `L${pts[2][0].toFixed(1)},${pts[2][1].toFixed(1)}`
    d += `L${pts[3][0].toFixed(1)},${pts[3][1].toFixed(1)}`
  }
  return d + 'Z'
}

function Gear({ cx, cy, teeth, outer, inner, hole, rot, dim = 1 }) {
  const d = gearPath(teeth, outer, inner)
  const spokes = [0, 1, 2].map(i => (i * 120 * Math.PI) / 180)
  return (
    <g transform={`translate(${cx},${cy})`} opacity={dim}>
      <motion.g className="gear-rot" style={{ rotate: rot }}>
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" />
        <circle r={inner * 0.82} fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.45" />
        {spokes.map((a, i) => (
          <line key={i} x1={0} y1={0}
            x2={(inner * 0.76) * Math.cos(a)} y2={(inner * 0.76) * Math.sin(a)}
            stroke="var(--accent)" strokeWidth="1" opacity="0.55" />
        ))}
        <circle r={hole} fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
      </motion.g>
    </g>
  )
}

export default function HeroScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Helicopter: simulate Y-axis spin via scaleX cycling 1 → 0 → -1 → 0 → 1
  const heliScaleX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.38, 0.5],
    [1, 0, -1, 0, 1]
  )
  const heliScale = useTransform(scrollYProgress, [0, 0.25, 0.7], [1, 1.06, 0.9])
  const heliY = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Gears — large(24t/r65) meshes with medium(16t/r44) and small(12t/r33)
  // ratios: 24/16 = 1.5×, 24/12 = 2×; opposite direction
  const rotL = useTransform(scrollYProgress, [0, 1], [0, 600])
  const rotM = useTransform(scrollYProgress, [0, 1], [0, -900])
  const rotS = useTransform(scrollYProgress, [0, 1], [0, -1200])

  const annotOpacity = useTransform(scrollYProgress, [0.14, 0.38], [0, 0.8])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.14], [28, 0])
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  // Gears fade in as we scroll towards them
  const gearOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1])

  return (
    <div ref={ref} className="hs-container">
      <div className="hs-sticky">
        <div className="hs-grid" />

        <svg
          className="hs-svg"
          viewBox="-460 -290 920 580"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Helicopter (centered near SVG origin) ── */}
          <motion.g style={{ y: heliY }}>
            <motion.g className="heli-transform" style={{ scaleX: heliScaleX, scale: heliScale }}>
              {/* Rotor hub */}
              <circle cx={0} cy={-92} r={7} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              {/* Main rotor blades — auto-spin via CSS */}
              <g className="hs-rotor" transform="translate(0,-92)">
                <line x1={-178} y1={0} x2={178} y2={0} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1={-14} y1={0} x2={14} y2={0} stroke="var(--accent)" strokeWidth="4" />
              </g>
              {/* Rotor mast */}
              <line x1={0} y1={-85} x2={0} y2={-56} stroke="var(--accent)" strokeWidth="2" />
              {/* Fuselage */}
              <path
                d="M-92,-14 Q-102,24 -74,38 L64,38 Q100,38 110,14 L110,-14 Q74,-62 -14,-64 Z"
                fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round"
              />
              {/* Cockpit glass — dashed */}
              <path
                d="M-14,-64 Q38,-72 84,-40 L110,-14 Q74,-62 -14,-64 Z"
                fill="none" stroke="var(--accent)" strokeWidth="1.1"
                strokeDasharray="5,3" opacity="0.62"
              />
              {/* Engine compartment box */}
              <rect x={20} y={-30} width={34} height={17} rx={3}
                fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
              {/* Exhaust detail */}
              <line x1={54} y1={-22} x2={68} y2={-22} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              {/* Door window */}
              <rect x={-60} y={-8} width={24} height={18} rx={4}
                fill="none" stroke="var(--accent)" strokeWidth="0.9" opacity="0.5" />
              {/* Tail boom */}
              <path d="M-74,16 L-208,-7 L-208,7 L-74,32"
                fill="none" stroke="var(--accent)" strokeWidth="1.8" />
              {/* Tail fin */}
              <path d="M-208,-7 L-232,-50 L-214,-7"
                fill="none" stroke="var(--accent)" strokeWidth="1.8" />
              {/* Tail rotor hub */}
              <circle cx={-219} cy={-29} r={5} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              {/* Tail rotor — auto-spin */}
              <g className="hs-tail-rotor" transform="translate(-219,-29)">
                <line x1={0} y1={-26} x2={0} y2={26} stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              {/* Skid struts */}
              <line x1={-46} y1={38} x2={-62} y2={62} stroke="var(--accent)" strokeWidth="1.5" />
              <line x1={54} y1={38} x2={60} y2={62} stroke="var(--accent)" strokeWidth="1.5" />
              {/* Skids */}
              <line x1={-92} y1={62} x2={82} y2={62} stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
              <line x1={-100} y1={70} x2={88} y2={70} stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
            </motion.g>
          </motion.g>

          {/* ── CAD annotation lines (separate from scaleX group) ── */}
          <motion.g style={{ opacity: annotOpacity }} fontFamily="'Courier New',monospace">
            {/* Rotor span */}
            <line x1={-370} y1={-92} x2={-248} y2={-92} stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="3,3" />
            <line x1={-370} y1={-98} x2={-370} y2={-86} stroke="var(--accent)" strokeWidth="0.8" />
            <text x={-440} y={-89} fill="var(--accent)" fontSize="9">MAIN ROTOR</text>
            <text x={-428} y={-78} fill="var(--accent)" fontSize="9">∅ 11.2 m</text>
            {/* Fuselage length */}
            <line x1={330} y1={14} x2={430} y2={14} stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="3,3" />
            <line x1={430} y1={8} x2={430} y2={20} stroke="var(--accent)" strokeWidth="0.8" />
            <text x={334} y={6} fill="var(--accent)" fontSize="9">FUSELAGE</text>
            <text x={334} y={18} fill="var(--accent)" fontSize="9">8.76 m</text>
            {/* Height span */}
            <line x1={-446} y1={-92} x2={-446} y2={70} stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2,3" opacity="0.6" />
            <line x1={-454} y1={-92} x2={-438} y2={-92} stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
            <line x1={-454} y1={70} x2={-438} y2={70} stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
            <text x={-455} y={-10} fill="var(--accent)" fontSize="9"
              transform="rotate(-90,-455,-10)">H 2.71 m</text>
            {/* Center cross-hair */}
            <line x1={-12} y1={-250} x2={-12} y2={250} stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="1,6" opacity="0.25" />
            <line x1={-460} y1={3} x2={460} y2={3} stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="1,6" opacity="0.25" />
          </motion.g>

          {/* ── Gears ── */}
          <motion.g style={{ opacity: gearOpacity }}>
            {/* Large: 24 teeth, r=65. Placed at center */}
            <Gear cx={0}   cy={205} teeth={24} outer={65} inner={55} hole={9}  rot={rotL} />
            {/* Medium: 16 teeth, r=44. Mesh dist = 65+44=109 → place at x=109 */}
            <Gear cx={109} cy={205} teeth={16} outer={44} inner={37} hole={6}  rot={rotM} dim={0.78} />
            {/* Small: 12 teeth, r=33. Mesh dist = 65+33=98 → place at x=-98 */}
            <Gear cx={-98} cy={205} teeth={12} outer={33} inner={28} hole={5}  rot={rotS} dim={0.65} />
            {/* Axle connecting line */}
            <line x1={-98} y1={205} x2={109} y2={205}
              stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="5,4" opacity="0.18" />
          </motion.g>
        </svg>

        {/* ── Text overlay ── */}
        <div className="hs-text">
          <motion.h1 style={{ opacity: titleOpacity, y: titleY }}>
            Zain Dahdul
          </motion.h1>
          <motion.p className="hs-subtitle" style={{ opacity: subtitleOpacity }}>
            Mechanical Engineering
          </motion.p>
          <motion.p className="hs-university" style={{ opacity: subtitleOpacity }}>
            University of California, Berkeley
          </motion.p>
          <motion.div className="hs-cta-wrap" style={{ opacity: subtitleOpacity }}>
            <button
              className="hs-cta"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* ── Scroll cue ── */}
        <motion.div className="hs-scroll-cue" style={{ opacity: hintOpacity }}>
          <span>scroll to explore</span>
          <div className="hs-chevron" />
        </motion.div>
      </div>
    </div>
  )
}
