import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroScene.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene() {
  const containerRef   = useRef(null)
  const bgRef          = useRef(null)
  const wideImgRef     = useRef(null)
  const closeupRef     = useRef(null)
  const sketchRef      = useRef(null)
  const blueprintRef   = useRef(null)
  const pencilRef      = useRef(null)
  const scrollCueRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline scrubbed to the full 600vh scroll container.
      // Total = 12 "units" → each unit ≈ 50vh of scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 2,
        },
      })

      // ── Stage 1: Atmospheric drift on wide shot (0 → 1.5) ──
      tl.to(wideImgRef.current, {
        scale: 1.06,
        duration: 1.5,
        ease: 'none',
      }, 0)

      tl.to(scrollCueRef.current, {
        opacity: 0,
        duration: 0.8,
      }, 0)

      // ── Stage 2: Camera dolly — zoom to satellite (1.5 → 4.5) ──
      tl.to(wideImgRef.current, {
        scale: 8,
        duration: 3,
        ease: 'power2.inOut',
      }, 1.5)

      // Close-up cross-fades in near the end of zoom
      tl.to(closeupRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: 'power1.inOut',
      }, 3.7)

      // Wide fades out once close-up is visible
      tl.to(wideImgRef.current, {
        opacity: 0,
        duration: 0.4,
      }, 4.1)

      // ── Stage 3: Hold close-up (4.5 → 5.5) — no animation ──

      // ── Stage 4: Photo → Sketch dissolve (5.5 → 7.5) ──
      tl.to(bgRef.current, {
        backgroundColor: '#e3d8c2',
        duration: 2,
        ease: 'power1.inOut',
      }, 5.5)

      tl.to(closeupRef.current, {
        opacity: 0,
        duration: 1.8,
        ease: 'power1.in',
      }, 5.5)

      tl.to(sketchRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power1.out',
      }, 5.7)

      // ── Stage 5: Blueprint drawing — left-to-right reveal (7.5 → 10.5) ──
      tl.to(sketchRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'none',
      }, 7.8)

      // The clip-path sweeps from inset(0 100% 0 0) → inset(0 0% 0 0)
      tl.fromTo(blueprintRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 3, ease: 'power1.inOut' },
        7.5
      )

      // Pencil-line travels from left to right ahead of the reveal
      tl.fromTo(pencilRef.current,
        { x: '0vw', opacity: 0.9 },
        { x: '100vw', opacity: 0, duration: 3, ease: 'power1.inOut' },
        7.5
      )

      // ── Stage 6: Final blueprint state (10.5 → 12) — hold ──

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="hs-container">
      <div className="hs-sticky">

        {/* ── Background color (black → parchment) ── */}
        <div ref={bgRef} className="hs-bg" />

        {/* ── Stage 1–2: Wide orbital (image_0) ── */}
        <div className="hs-layer">
          <img
            ref={wideImgRef}
            src="/images/image_0.png"
            alt=""
            className="hs-img-wide"
            draggable={false}
          />
        </div>

        {/* ── Stage 3: Close-up satellite (image_3) ── */}
        <div ref={closeupRef} className="hs-layer hs-fade-layer">
          <img
            src="/images/image_3.png"
            alt=""
            className="hs-img-cover"
            draggable={false}
          />
        </div>

        {/* ── Stage 4: Sepia perspective sketch (image_1) ── */}
        <div ref={sketchRef} className="hs-layer hs-fade-layer">
          <img
            src="/images/image_1.png"
            alt=""
            className="hs-img-contain"
            draggable={false}
          />
        </div>

        {/* ── Stage 5–6: Full engineering blueprint (image_2) ── */}
        <div ref={blueprintRef} className="hs-layer hs-blueprint-layer">
          <img
            src="/images/image_2.png"
            alt=""
            className="hs-img-contain"
            draggable={false}
          />
        </div>

        {/* ── Pencil / drawing-line effect ── */}
        <div ref={pencilRef} className="hs-pencil-line" />

        {/* ── Text overlay ── */}
        <div className="hs-text">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          >
            Zain Dahdul
          </motion.h1>

          <motion.p
            className="hs-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1, ease: 'easeOut' }}
          >
            Mechanical Engineering
          </motion.p>

          <motion.p
            className="hs-university"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            University of California, Berkeley
          </motion.p>

          <motion.div
            className="hs-cta-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <button
              className="hs-cta"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* ── Scroll cue ── */}
        <div ref={scrollCueRef} className="hs-scroll-cue">
          <span>scroll to explore</span>
          <div className="hs-chevron" />
        </div>

      </div>
    </div>
  )
}
