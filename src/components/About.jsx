import { motion } from 'framer-motion'
import { OverlaySection } from './SectionReveal'
import './about.css'
import DecayCard from './DecayCard'

const pankhBullets = [
  'Engineered production-grade full-stack features using React.js, Next.js and Spring Boot, reducing average page load time by 30% through lazy loading and code splitting.',
  'Designed RESTful microservices using Node.js and Spring Boot for authentication, analytics and data processing workloads.',
  'Implemented JWT/OAuth2 authentication and role-based access control systems ensuring secure application access.',
  'Collaborated in Agile sprints delivering production features through code reviews and iterative development.'
]

const gdgBullets = [
  'Led a 15-member engineering team building student-focused platforms used by 1000+ university students.',
  'Built scalable full-stack applications using React.js, Express.js and MongoDB with CI/CD deployment workflows.'
]

export default function About() {
  return (
    <OverlaySection id="about">

      <div className="about-grid">

        {/* LEFT COLUMN */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >

          <div className="section-label-minimal">
            About Me
          </div>

          {/* DECAY CARD */}
          <div className="about-decay-card">
            <DecayCard
              width={440}
              height={560}
              image="/images/myPhoto.png"
              baseFrequency={0.015}
              numOctaves={5}
              seed={4}
              maxDisplacement={400}
              movementBound={50}
            >
            </DecayCard>
          </div>

          {/* STATS */}
          <div className="about-stats">

            <div className="stat-box">
              <span className="stat-num">
                04+
              </span>

              <span className="stat-label">
                Projects Built
              </span>
            </div>

            <div className="stat-box">
              <span className="stat-num">
                02
              </span>

              <span className="stat-label">
                Industry Roles
              </span>
            </div>

          </div>

        </motion.div>


        {/* RIGHT COLUMN */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
        >

          {/* ABOUT DESCRIPTION */}
          <div className="about-desc-large">
            I am a Bachelor of Technology in Information Technology student
            at <strong>Ajay Kumar Garg Engineering College (2023 - 2027)</strong>
            with a current CGPA of <strong>8.1/10</strong>.

            <br />

            My passion lies in architecting REST APIs, designing clean
            component architectures, and building production-ready
            deployment pipelines.
          </div>


          {/* EXPERIENCE */}
          <div className="experience-block">

            <h4 className="experience-title">
              Experience
            </h4>

            <div className="experience-list">

              {/* PANKH AI */}
              <div className="experience-item">

                <div className="exp-left">

                  <span className="exp-period">
                    June 2026 – August 2026
                  </span>

                  <span className="exp-org">
                    SAMVARG SOLUTIONS
                  </span>

                </div>

                <div className="exp-right">

                  <span className="exp-role">
                    Software Developer Intern
                  </span>

                  <ul className="exp-bullets">
                    {pankhBullets.map((bullet, i) => (
                      <li key={i}>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                </div>

              </div>


              {/* GDG */}
              <div className="experience-item">

                <div className="exp-left">

                  <span className="exp-period">
                    Oct 2024 – Present
                  </span>

                  <span className="exp-org">
                    Google Developer Group, AKGEC
                  </span>

                </div>

                <div className="exp-right">

                  <span className="exp-role">
                    Full Stack Developer (Technical Lead)
                  </span>

                  <ul className="exp-bullets">
                    {gdgBullets.map((bullet, i) => (
                      <li key={i}>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </OverlaySection>
  )
}