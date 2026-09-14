const skillGroups = [
  {
    title: 'Frontend Development',
    skills: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'JavaScript',
      'HTML5',
      'CSS3'
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Spring Security',
      'REST APIs',
      'Microservices',
      'JWT/OAuth2',
      'MongoDB',
      'PostgreSQL',
      'SQL'
    ]
  },
  {
    title: 'Languages & AI Integration',
    skills: [
      'Java',
      'JavaScript',
      'C++',
      'Python',
      'Gemini API'
    ]
  },
  {
    title: 'Tools & DevOps Platforms',
    skills: [
      'Linux',
      'Git',
      'GitHub',
      'Docker',
      'Postman',
      'Vercel',
      'Render'
    ]
  },
  {
    title: 'Relevant Coursework',
    skills: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming'
    ]
  }
]

const achievements = [
  {
    title: '3rd Rank at Epoch of Cognition Hackathon',
    description:
      'Secured 3rd rank among 50+ competing teams (Team Cosine/Conatus, AKGEC).',
    symbol: '✦'
  },
  {
    title: 'National Finalist at Prometeo DevQuest',
    description:
      "Selected as a national finalist at IIT Jodhpur's premier hackathon DevQuest.",
    symbol: '◈'
  },
  {
    title: 'Technical Lead at GDG AKGEC',
    description:
      'Chosen to lead the core full-stack platform development for a developer community of 1,000+ members.',
    symbol: '★'
  }
]

export default function SkillsAchievements() {
  return (
    <section
      id="skills"
      className="skills-achievements-section"
    >

      <div className="skills-achievements-container">

        {/* LEFT */}

        <div className="skills-intro">

          <div className="skills-big-title">

            <span className="archive-word digital-word">
              Digital
            </span>

            <span className="archive-word archive-word-main">
              Archive
            </span>

          </div>

          <p className="skills-description">
            A record of technical capabilities, database systems,
            frameworks, and honors earned through hackathons and
            community contributions.
          </p>

        </div>


        {/* MIDDLE — SKILLS */}

        <div className="skills-column">

          <div className="section-mini-heading">
            TECHNICAL SKILLS
          </div>

          <div className="heading-line" />

          <div className="skills-list">

            {skillGroups.map((group) => (

              <div
                className="skill-group"
                key={group.title}
              >

                <h3>
                  {group.title}
                </h3>

                <div className="skill-pills">

                  {group.skills.map((skill) => (

                    <span
                      className="skill-pill"
                      key={skill}
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* RIGHT — ACHIEVEMENTS */}

        <div className="achievements-column">

          <div className="section-mini-heading">
            RECOGNITIONS
          </div>

          <div className="heading-line" />

          <div className="achievement-list">

            {achievements.map((achievement) => (

              <article
                className="achievement-card"
                key={achievement.title}
              >

                <div className="achievement-symbol">
                  {achievement.symbol}
                </div>

                <div className="achievement-content">

                  <h3>
                    {achievement.title}
                  </h3>

                  <p>
                    {achievement.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>


      <style>{`

        /* =================================
           MAIN SECTION
        ================================= */

        .skills-achievements-section {
          position: relative;

          width: 100%;

          height: 100vh;
          min-height: 100vh;

          background: var(--bg-primary);

          color: #f8f1e7;

          padding:
            120px 7vw;

          box-sizing: border-box;

          overflow: hidden;

          z-index: 2;

          scroll-margin-top: 0;

          border-bottom-left-radius: 45px;
          border-bottom-right-radius: 45px;

          box-shadow:
            0 30px 80px
            rgba(0, 0, 0, 0.38);
        }


        /* =================================
           CONTAINER
        ================================= */

        .skills-achievements-container {
          width: 100%;

          max-width: 1500px;

          height: 100%;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            1fr
            1.35fr
            1.15fr;

          gap: 60px;

          box-sizing: border-box;
        }


        /* =================================
           LEFT
        ================================= */

        .skills-intro {
          padding-top: 0;
        }


        /* =================================
           DIGITAL ARCHIVE
        ================================= */

        .skills-big-title {
          display: flex;

          flex-direction: column;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size:
            clamp(
              65px,
              7vw,
              120px
            );

          line-height: 0.8;

          letter-spacing: -5px;

          font-style: italic;

          font-weight: 400;

          margin-bottom: 100px;

          position: relative;

          isolation: isolate;
        }


        .archive-word {
          position: relative;

          display: block;

          width: fit-content;

          transition:
            transform 0.4s ease,
            text-shadow 0.4s ease,
            color 0.4s ease;

          will-change: transform;
        }


        /* =================================
           DIGITAL — CYAN OUTLINE
        ================================= */

        .digital-word {
          color: #090a0b;

          -webkit-text-stroke:
            1.5px rgba(125, 227, 237, 0.8);

          text-stroke:
            1.5px rgba(125, 227, 237, 0.8);

          text-shadow:
            0 0 5px rgba(125, 227, 237, 0.18),
            0 0 14px rgba(125, 227, 237, 0.08);

          animation:
            archiveGlowCyan 4s ease-in-out infinite;
        }


        /* =================================
           ARCHIVE — ORANGE OUTLINE
        ================================= */

        .archive-word-main {
          color: #090a0b;

          -webkit-text-stroke:
            1.5px rgba(245, 163, 74, 0.75);

          text-stroke:
            1.5px rgba(245, 163, 74, 0.75);

          margin-left: 5px;

          text-shadow:
            0 0 5px rgba(245, 163, 74, 0.18),
            0 0 14px rgba(245, 163, 74, 0.08);

          animation:
            archiveGlowOrange 4s ease-in-out infinite;

          animation-delay: 1.2s;
        }


        /* =================================
           HOVER EFFECT
        ================================= */

        .skills-big-title:hover .digital-word {
          transform:
            translateX(5px);

          -webkit-text-stroke:
            1.8px rgba(125, 227, 237, 1);

          text-shadow:
            0 0 8px rgba(125, 227, 237, 0.45),
            0 0 22px rgba(125, 227, 237, 0.22),
            0 0 45px rgba(125, 227, 237, 0.1);
        }


        .skills-big-title:hover .archive-word-main {
          transform:
            translateX(10px);

          -webkit-text-stroke:
            1.8px rgba(245, 163, 74, 1);

          text-shadow:
            0 0 8px rgba(245, 163, 74, 0.45),
            0 0 22px rgba(245, 163, 74, 0.22),
            0 0 45px rgba(245, 163, 74, 0.1);
        }


        /* =================================
           SUBTLE GLOW ANIMATION
        ================================= */

        @keyframes archiveGlowCyan {

          0%,
          100% {
            -webkit-text-stroke-color:
              rgba(125, 227, 237, 0.65);

            text-shadow:
              0 0 4px rgba(125, 227, 237, 0.12),
              0 0 12px rgba(125, 227, 237, 0.05);
          }

          50% {
            -webkit-text-stroke-color:
              rgba(125, 227, 237, 1);

            text-shadow:
              0 0 7px rgba(125, 227, 237, 0.35),
              0 0 20px rgba(125, 227, 237, 0.14);
          }

        }


        @keyframes archiveGlowOrange {

          0%,
          100% {
            -webkit-text-stroke-color:
              rgba(245, 163, 74, 0.6);

            text-shadow:
              0 0 4px rgba(245, 163, 74, 0.12),
              0 0 12px rgba(245, 163, 74, 0.05);
          }

          50% {
            -webkit-text-stroke-color:
              rgba(245, 163, 74, 1);

            text-shadow:
              0 0 7px rgba(245, 163, 74, 0.35),
              0 0 20px rgba(245, 163, 74, 0.14);
          }

        }


        /* =================================
           DESCRIPTION
        ================================= */

        .skills-description {
          max-width: 430px;

          color: #aaa;

          font-size: 16px;

          line-height: 1.7;

          margin: 0;
        }


        /* =================================
           HEADINGS
        ================================= */

        .section-mini-heading {
          color: #777;

          font-size: 14px;

          font-weight: 600;

          letter-spacing: 2px;

          margin-bottom: 12px;
        }


        .heading-line {
          width: 100%;

          height: 1px;

          background: #222;

          margin-bottom: 65px;
        }


        /* =================================
           SKILLS
        ================================= */

        .skill-group {
          margin-bottom: 28px;
        }


        .skill-group h3 {
          margin:
            0 0 14px;

          color: #e9e2d8;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size: 19px;

          font-weight: 400;
        }


        .skill-pills {
          display: flex;

          flex-wrap: wrap;

          gap: 9px;
        }


        .skill-pill {
          display: inline-flex;

          align-items: center;

          padding:
            7px 12px;

          border:
            1px solid #252525;

          border-radius: 999px;

          color: #999;

          font-size: 13px;

          line-height: 1;

          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .skill-pill:hover {
          border-color: #7de3ed;

          color: #f8f1e7;

          transform:
            translateY(-2px);
        }


        /* =================================
           ACHIEVEMENTS
        ================================= */

        .achievements-column {
          min-width: 0;
        }


        .achievement-list {
          display: flex;

          flex-direction: column;

          gap: 25px;
        }


        .achievement-card {
          display: flex;

          gap: 20px;

          padding:
            24px 20px;

          border:
            1px solid #222;

          background: #0d0e0f;

          min-height: 105px;

          box-sizing: border-box;

          transition:
            border-color 0.25s ease,
            transform 0.25s ease,
            background 0.25s ease;
        }


        .achievement-card:hover {
          border-color: #3b3b3b;

          background: #101213;

          transform:
            translateY(-3px);
        }


        .achievement-symbol {
          flex-shrink: 0;

          width: 32px;

          color: #f8f1e7;

          font-size: 25px;

          line-height: 1;
        }


        .achievement-content h3 {
          margin:
            0 0 8px;

          color: #f1ece5;

          font-size: 17px;

          font-weight: 600;

          line-height: 1.35;
        }


        .achievement-content p {
          margin: 0;

          color: #999;

          font-size: 14px;

          line-height: 1.55;
        }


        /* =================================
           TABLET
        ================================= */

        @media (max-width: 1100px) {

          .skills-achievements-section {
            padding:
              100px 6vw;
          }

          .skills-achievements-container {
            grid-template-columns:
              1fr 1fr;
          }

          .skills-intro {
            grid-column:
              1 / -1;
          }

          .skills-big-title {
            margin-bottom: 40px;
          }

        }


        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 700px) {

          .skills-achievements-section {
            height: auto;
            min-height: auto;

            padding:
              70px 20px 40px;

            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }


          .skills-achievements-container {
            grid-template-columns: 1fr;

            gap: 40px;

            overflow: visible;
            height: auto;

            padding-bottom: 20px;
          }


          .skills-intro {
            grid-column: auto;
          }


          .skills-big-title {
            font-size: 70px;

            margin-bottom: 40px;
          }


          .heading-line {
            margin-bottom: 40px;
          }

        }

      `}</style>

    </section>
  )
}