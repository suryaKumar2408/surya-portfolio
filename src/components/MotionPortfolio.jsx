import { useLayoutEffect, useRef, useState } from 'react'
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
  const contactActiveRef = useRef(false)
  const [contactActive, setContactActive] = useState(false)

  const handleContactClick = event => {
    const contactTrigger = contactTriggerRef.current

    if (contactTrigger) {
      event.preventDefault()
      window.scrollTo({
        top: contactTrigger.end,
        behavior: 'smooth'
      })
      return
    }

    const contactEl = document.getElementById('contact')
    if (contactEl) {
      event.preventDefault()
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
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
              onUpdate: self => {
                const progress = self.progress
                const shouldBeActive = contactActiveRef.current
                  ? progress > 0.02
                  : progress > 0.12

                if (shouldBeActive !== contactActiveRef.current) {
                  contactActiveRef.current = shouldBeActive
                  setContactActive(shouldBeActive)
                }
              },
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
        contactTriggerRef.current = null
        contactActiveRef.current = true
        setContactActive(true)
        gsap.set(skillsSection, { yPercent: 0, clearProps: 'transform' })

        return () => {}
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

          <Contact active={contactActive} />

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

          /* On mobile we drop the absolute/pinned layout entirely
             and flow the two sections naturally.
             DOM order is: contact-behind → skills-cover.
             We use flex + order so Skills appears FIRST visually,
             then Contact below it — matching scroll intent. */

          .skills-contact-reveal {
            height: auto;
            min-height: auto;
            overflow: visible;
            display: flex;
            flex-direction: column;
          }

          .skills-cover {
            order: 1;
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            height: auto;
            z-index: 2;
            transform: none !important;
          }

          .skills-cover .skills-achievements-section {
            height: auto;
            min-height: auto;

            border-bottom-left-radius: 28px;
            border-bottom-right-radius: 28px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: visible;
          }

          .contact-behind {
            order: 2;
            position: relative;
            inset: auto;
            width: 100%;
            height: auto;
            z-index: 1;
            overflow: visible;
          }

          .contact-behind .contact-section {
            height: auto;
            min-height: auto;
            overflow: visible;
          }

        }

      `}</style>

    </main>
  )
}