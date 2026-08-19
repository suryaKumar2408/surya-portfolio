import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import SkillsAchievements from './SkillsAchievements'
import Contact from './Contact'

gsap.registerPlugin(ScrollTrigger)

export default function MotionPortfolio() {
  const revealRef = useRef(null)
  const skillsRef = useRef(null)
  const contactTriggerRef = useRef(null)

  const handleContactClick = event => {
    const contactTrigger = contactTriggerRef.current

    if (!contactTrigger) return

    event.preventDefault()

    window.scrollTo({
      top: contactTrigger.end,
      behavior: 'smooth'
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const revealSection = revealRef.current
      const skillsSection = skillsRef.current

      if (!revealSection || !skillsSection) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        const animation = gsap.fromTo(
          skillsSection,
          {
            yPercent: 0,
          },
          {
            yPercent: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: revealSection,
              start: 'top top',
              end: '+=100%',
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        )

        contactTriggerRef.current = animation.scrollTrigger

        return () => {
          contactTriggerRef.current = null
          animation.kill()
        }
      })

      mm.add('(max-width: 768px)', () => {
        const animation = gsap.fromTo(
          skillsSection,
          {
            yPercent: 0,
          },
          {
            yPercent: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: revealSection,
              start: 'top top',
              end: '+=100%',
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        )

        contactTriggerRef.current = animation.scrollTrigger

        return () => {
          contactTriggerRef.current = null
          animation.kill()
        }
      })

      ScrollTrigger.refresh()

      return () => {
        mm.revert()
      }
    }, revealRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="motion-portfolio">

      {/* HERO */}
      <Hero onContactClick={handleContactClick} />

      {/* ABOUT */}
      <About />

      {/* PROJECTS */}
      <Projects />


      {/* =====================================
          SKILLS → CONTACT REVEAL
      ===================================== */}

      <section
        ref={revealRef}
        className="skills-contact-reveal"
      >

        {/* =================================
            CONTACT — BEHIND SKILLS
        ================================= */}

        <div className="contact-behind">

          <Contact />

        </div>


        {/* =================================
            SKILLS — TOP / PINNED LAYER
        ================================= */}

        <div
          ref={skillsRef}
          className="skills-cover"
        >

          <SkillsAchievements />

        </div>

      </section>


      {/* FOOTER */}
      <footer className="motion-footer">

        <span>
          © 2026 SURYA KUMAR
        </span>

        <span>
          BUILT WITH CURIOSITY
        </span>

      </footer>


      <style>{`

        /* =====================================
           REVEAL CONTAINER
        ===================================== */

        .skills-contact-reveal {
          position: relative;

          width: 100%;
          height: 100vh;

          margin: 0;
          padding: 0;

          overflow: visible;

          isolation: isolate;
        }


        /* =====================================
           CONTACT — BEHIND
        ===================================== */

        .contact-behind {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100vh;

          z-index: 1;

          overflow: hidden;

          pointer-events: auto;
        }


        .contact-behind .contact-section {
          position: relative;

          width: 100%;
          height: 100vh;
          min-height: 100vh;

          margin: 0;

          box-sizing: border-box;

          z-index: 1;
        }


        /* =====================================
           SKILLS — TOP LAYER
        ===================================== */

        .skills-cover {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 100vh;

          z-index: 2;

          will-change: transform;
        }


        /* =====================================
           SKILLS CARD
        ===================================== */

        .skills-cover .skills-achievements-section {
          position: relative;

          width: 100%;
          height: 100vh;
          min-height: 100vh;

          margin: 0;

          box-sizing: border-box;

          background: #0d171d;

          border-bottom-left-radius: 45px;
          border-bottom-right-radius: 45px;

          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.38);

          z-index: 2;

          overflow: hidden;
        }


        /* =====================================
           CONTACT CARD SHOULD NOT FLOAT ABOVE
           SKILLS
        ===================================== */

        .contact-behind {
          z-index: 1;
        }

        .skills-cover {
          z-index: 2;
        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 768px) {

          .skills-contact-reveal {
            height: 100vh;
          }

          .skills-cover {
            height: 100vh;
          }

          .contact-behind {
            height: 100vh;
          }

          .contact-behind .contact-section {
            height: 100vh;
            min-height: 100vh;
          }

          .skills-cover .skills-achievements-section {
            height: 100vh;
            min-height: 100vh;

            border-bottom-left-radius: 28px;
            border-bottom-right-radius: 28px;
          }

        }

      `}</style>

    </main>
  )
}
