import { useEffect, useRef, useState } from 'react'
import { FiArrowDownRight } from 'react-icons/fi'
import Spline from '@splinetool/react-spline'
import GradientWaves from './GradientWaves'
import StrokeText from './StrokeText'
import CardNav from './CardNav'

const HOVER_TITLES = [
  'Software Developer',
  'MERN Developer',
  'Problem Solver',
  'Java Developer'
]

const TITLE_INTERVAL_MS = 2000

export default function Hero({ onContactClick }) {

  /* =========================================================
     3D NAME HOVER EFFECT
     ========================================================= */

  const [isNameHovered, setIsNameHovered] = useState(false)
  const [activeTitleIndex, setActiveTitleIndex] = useState(-1)
  const [flipKey, setFlipKey] = useState(0)

  const titleTimerRef = useRef(null)

  const startTitleCycle = () => {
    if (titleTimerRef.current) return

    setIsNameHovered(true)
    setActiveTitleIndex(0)
    setFlipKey(prev => prev + 1)

    titleTimerRef.current = window.setInterval(() => {
      setActiveTitleIndex(prev => {
        const next = (prev + 1) % HOVER_TITLES.length

        setFlipKey(value => value + 1)

        return next
      })
    }, TITLE_INTERVAL_MS)
  }

  const stopTitleCycle = () => {
    if (titleTimerRef.current) {
      window.clearInterval(titleTimerRef.current)
      titleTimerRef.current = null
    }

    setIsNameHovered(false)
    setActiveTitleIndex(-1)
  }

  useEffect(() => {
    return () => {
      if (titleTimerRef.current) {
        window.clearInterval(titleTimerRef.current)
      }
    }
  }, [])

  const activeTitle =
    activeTitleIndex >= 0
      ? HOVER_TITLES[activeTitleIndex]
      : ''

  /* =========================================================
     EXISTING NAVIGATION
     ========================================================= */

  const navItems = [
    {
      label: 'About',
      bgColor: '#101c22',
      textColor: '#f8f1e7',
      links: [
        {
          label: 'About Me',
          href: '#about',
          ariaLabel: 'About Me'
        },
        {
          label: 'Experience',
          href: '#about',
          ariaLabel: 'Experience'
        }
      ]
    },

    {
      label: 'Projects',
      bgColor: '#162832',
      textColor: '#f8f1e7',
      links: [
        {
          label: 'Selected Projects',
          href: '#projects',
          ariaLabel: 'Selected Projects'
        },
        {
          label: 'Skills',
          href: '#skills',
          ariaLabel: 'Skills'
        }
      ]
    },

    {
      label: 'Contact',
      bgColor: '#12313a',
      textColor: '#f8f1e7',
      links: [
        {
          label: 'Get in touch',
          href: '#contact',
          ariaLabel: 'Get in touch'
        },
        {
          label: 'Contact',
          href: '#contact',
          ariaLabel: 'Contact'
        }
      ]
    }
  ]

  /* =========================================================
     DEFAULT NAME
     ========================================================= */

  const renderDefaultName = () => (
    <>
      <div className="name-surya">

        <StrokeText
          text="Surya"
          strokeColor="#F8F1E7"
          fillColor="#F8F1E7"
          strokeWidth={1.4}
          drawDuration={1.4}
          fillDelay={0.15}
          stagger={0.05}
          ease="power2.out"
          trigger="mount"
          fillMode="wipe"
          fontSize={128}
          fontWeight={800}
          letterSpacing={-5}
        />

      </div>

      <div className="name-kumar">

        <StrokeText
          text="Kumar"
          strokeColor="#FFA34D"
          fillColor="#FFA34D"
          strokeWidth={1.4}
          drawDuration={1.4}
          fillDelay={0.2}
          stagger={0.05}
          ease="power2.out"
          trigger="mount"
          fillMode="wipe"
          fontSize={128}
          fontWeight={500}
          letterSpacing={-5}
        />

      </div>
    </>
  )

  return (
    <section
      className="motion-hero"
      id="hero"
    >

      {/* ================================
          CARD NAV
      ================================= */}

      <CardNav
        items={navItems}
        baseColor="#0d151a"
        menuColor="#f8f1e7"
        buttonBgColor="#7de3ed"
        buttonTextColor="#0b151a"
        buttonText="Contact Me"
        buttonHref="#contact"
        onButtonClick={onContactClick}
        ease="power3.out"
      />

      {/* ================================
          BACKGROUND
      ================================= */}

      <div className="gradient-background">

        <GradientWaves
          horizonColor="#0b151a"
          waveColor="#163b4a"
          crestColor="#7de3ed"
          speed={0.25}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={0.8}
          opacity={0.8}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.03}
        />

      </div>

      {/* ================================
          HERO CONTENT
      ================================= */}

      <div className="hero-copy">

        <p className="eyebrow">
          ✦ Full-stack developer / India
        </p>

        {/* NAME */}

        <div
          className="name-stack name-stack-hover-zone"
          onMouseEnter={startTitleCycle}
          onMouseLeave={stopTitleCycle}
        >

          <div
            className={`name-flip-stage ${
              isNameHovered ? 'is-hovered' : ''
            }`}
          >

            <div className="name-flip-inner">

              {/* FRONT — SURYA KUMAR */}

              <div className="name-face name-face-front">
                {renderDefaultName()}
              </div>

              {/* BACK — JOB TITLE */}

              <div className="name-face name-face-back">

                <div
                  key={flipKey}
                  className="name-role-text name-role-text-flip"
                >
                  {activeTitle}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}

        <p className="hero-description">
          I shape ambitious ideas into tactile, high-performing products —
          from considered interfaces to reliable systems.
        </p>

        {/* BUTTONS */}

        <div className="hero-cta-row">

          <a
            href="#projects"
            className="round-link"
          >
            Explore work
            <FiArrowDownRight />
          </a>

          <a
            href="/surya_kumar_full_stack_developer.pdf"
            download="Surya_Kumar_Full_Stack_Developer.pdf"
            className="resume-link"
          >
            Resume
            <FiArrowDownRight />
          </a>

        </div>

      </div>

      {/* ================================
          SPLINE ROBOT
      ================================= */}

      <div
        className="spline-character"
        aria-label="Interactive 3D character"
      >

        <Spline
          scene="https://prod.spline.design/5ad7d3OP74oIRv7v/scene.splinecode"
        />

      </div>

    </section>
  )
}