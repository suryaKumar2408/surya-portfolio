import { FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import LiquidEther from './LiquidEther'
import './Contact.css'

export default function Contact({ active = true })  {
  const handleSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget

    const name = form.name.value
    const email = form.email.value
    const message = form.message.value

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name}`
    )

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )

    window.location.href =
      `mailto:suryashukla2408@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      className="contact-section"
      id="contact"
    >

      {/* =================================
          LIQUID ETHER BACKGROUND
      ================================= */}

            <div className="contact-liquid-bg">
        {active && (
          <LiquidEther
            colors={[
              '#163b4a',
              '#1d5965',
              '#7de3ed',
              '#d4772e'
            ]}
            mouseForce={14}
            cursorSize={75}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.35}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.35}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        )}
      </div>

      {/* =================================
          CREAM OVERLAY
      ================================= */}

      <div className="contact-liquid-overlay" />

      {/* =================================
          CONTENT
      ================================= */}

      <div className="contact-container">

        {/* =================================
            LEFT
        ================================= */}

        <div className="contact-info">

          <p className="contact-eyebrow">
            05 / LET'S CONNECT
          </p>

          <h2>
            Let's
            <br />
            <em>talk.</em>
          </h2>

          <p className="contact-description">
            Have a project in mind, an opportunity to discuss,
            or simply want to connect? Drop me a message and
            I'll get back to you.
          </p>

          <div className="contact-details">

            {/* EMAIL */}

            <div className="contact-detail">

              <span>
                EMAIL
              </span>

              <a href="mailto:suryashukla2408@gmail.com">
                suryashukla2408@gmail.com
              </a>

            </div>

            {/* PHONE */}

            <div className="contact-detail">

              <span>
                PHONE
              </span>

              <a href="tel:+917302991707">
                +91 73029 91707
              </a>

            </div>

            {/* SOCIALS */}

            <div className="contact-socials">

              <span>
                FIND ME
              </span>

              <div className="contact-social-links">

                <a
                  href="https://github.com/suryaKumar2408"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/surya2408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            RIGHT — FORM
        ================================= */}

        <div className="contact-form-card">

          <div className="contact-form-header">

            <h3>
              Send a message
            </h3>

            <p>
              I'll get back to you as soon as possible.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="contact-name-row">

              <div className="contact-input-group">

                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />

              </div>

              <div className="contact-input-group">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>

            </div>

            <div className="contact-input-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
              />

            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              Send message
              <FiSend />
            </button>

            <p className="contact-form-note">
              Your message will open your default email client.
            </p>

          </form>

        </div>

      </div>

    </section>
  )
}