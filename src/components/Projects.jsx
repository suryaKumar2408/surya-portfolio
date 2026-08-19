import {
  FiExternalLink,
  FiGithub,
  FiArrowRight
} from 'react-icons/fi'

import { OverlaySection } from './SectionReveal'
import ScrollStack, {
  ScrollStackItem
} from './ScrollStack'

import './Projects.css'


const projects = [
  {
    num: '01',
    title: 'BrainHire',
    subtitle: 'AI Interview Prep Platform',
    desc: 'Built an AI interview engine using Gemini API to generate role-specific questions and personalized study recommendations. Developed ATS-friendly PDF generation using Puppeteer for rendering A4 resumes from dynamic templates. Architected JWT-secured dashboards with persistent interview history and progress tracking using MongoDB.',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Gemini API',
      'Puppeteer'
    ],
    live: 'https://brain-hire.vercel.app/',
    github: 'https://github.com/suryaKumar2408/BrainHire'
  },

  {
    num: '02',
    title: 'Linklytics',
    subtitle: 'URL Shortener Engine',
    desc: 'Developed URL shortening services handling 1000+ redirects with low-latency responses using Redis caching. Built click analytics services using Spring Data JPA and PostgreSQL capturing device and location metadata. Implemented Spring Security authentication and containerized deployment using Docker.',
    tech: [
      'Spring Boot',
      'React.js',
      'Redis',
      'PostgreSQL',
      'Docker',
      'JWT'
    ],
    live: 'https://linkltics.vercel.app/',
    github: 'https://github.com/suryaKumar2408/linkltics'
  },

  {
    num: '03',
    title: 'Mail Craft',
    subtitle: 'AI Email Automation Platform',
    desc: 'Created an email assistant integrating Gemini AI to automate contextual drafting and reply generation with tone choices. Built using a decoupled Spring Boot backend with WebClient async pipelines and a responsive Material UI frontend.',
    tech: [
      'Spring Boot',
      'React.js',
      'Gemini API',
      'PostgreSQL',
      'WebClient',
      'Material UI'
    ],
    live: 'https://email-reply-8jtc.vercel.app/',
    github: 'https://github.com/suryaKumar2408/Email-Reply'
  },

  {
    num: '04',
    title: 'Chatly',
    subtitle: 'Real-Time Messaging App',
    desc: 'Engineered a full-stack real-time chat application utilizing WebSockets for instant message delivery and synchronization. Developed a decoupled architecture with a Java/Spring Boot backend for message broker capabilities and a highly interactive, responsive frontend deployed on Vercel.',
    tech: [
      'Spring Boot',
      'React.js',
      'WebSocket',
      'Docker',
      'CSS3',
      'Vercel'
    ],
    live: 'https://chat-app-pink-nine-28.vercel.app/',
    github: 'https://github.com/suryaKumar2408/chatApp'
  }
]


export default function Projects() {
  return (
    <OverlaySection
      id="projects"
      className="projects-section"
    >

      <div className="projects-scene">

        {/* =========================================
            LEFT PROJECT HEADING
            ========================================= */}

        <div className="projects-heading-column">

          <div className="works-header">

            <div className="works-header-bg">
              SELECTED
            </div>

            <h2 className="works-header-fg">
              Works
            </h2>

            <div className="works-header-line" />

          </div>

        </div>


        {/* =========================================
            RIGHT PROJECT STACK
            ========================================= */}

        <div className="projects-stack-column">

          <ScrollStack
            itemDistance={100}
            itemScale={0.04}
            itemStackDistance={35}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.86}
            scaleDuration={0.5}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >

            {projects.map((project) => (

              <ScrollStackItem
                key={project.title}
                itemClassName="project-stack-item"
              >

                <div className="project-stack-card">

                  {/* NUMBER */}

                  <span className="work-num">
                    {project.num}
                  </span>


                  {/* HEADER */}

                  <div className="work-card-header">

                    <div>

                      <h3 className="work-title">
                        {project.title}
                      </h3>

                      <div className="work-subtitle">
                        {project.subtitle}
                      </div>

                    </div>


                    <div className="work-links">

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Source"
                        aria-label={`${project.title} GitHub`}
                      >
                        <FiGithub />
                      </a>


                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        aria-label={`${project.title} live demo`}
                      >
                        <FiExternalLink />
                      </a>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="work-desc">
                    {project.desc}
                  </p>


                  {/* TECHNOLOGIES */}

                  <div className="work-tech">

                    {project.tech.map((tech) => (

                      <span
                        className="work-tag"
                        key={tech}
                      >
                        {tech}
                      </span>

                    ))}

                  </div>


                  {/* ACTION */}

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-action"
                  >

                    Live Demo

                    <FiArrowRight
                      className="work-action-icon"
                      style={{
                        marginLeft: 4
                      }}
                    />

                  </a>

                </div>

              </ScrollStackItem>

            ))}

          </ScrollStack>

        </div>

      </div>

    </OverlaySection>
  )
}