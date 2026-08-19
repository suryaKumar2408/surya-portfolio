import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { GoArrowUpRight } from 'react-icons/go'
import './CardNav.css'

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#0d171b',
  menuColor = '#f8f1e7',
  buttonBgColor = '#7de3ed',
  buttonTextColor = '#071014',
  buttonText = 'Get Started',
  buttonHref = '#contact',
  onButtonClick
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const navRef = useRef(null)
  const cardsRef = useRef([])
  const tlRef = useRef(null)

  const calculateHeight = () => {
    const navEl = navRef.current

    if (!navEl) return 240

    const isMobile = window.matchMedia(
      '(max-width: 768px)'
    ).matches

    if (isMobile) {
      const contentEl =
        navEl.querySelector('.card-nav-content')

      if (contentEl) {
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'

        contentEl.offsetHeight

        const topBar = 48
        const padding = 12
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return topBar + contentHeight + padding
      }
    }

    return 240
  }

  const createTimeline = () => {
    const navEl = navRef.current

    if (!navEl) return null

    gsap.set(navEl, {
      height: 48,
      overflow: 'hidden'
    })

    gsap.set(cardsRef.current, {
      y: 40,
      opacity: 0
    })

    const tl = gsap.timeline({
      paused: true
    })

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    })

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease,
        stagger: 0.08
      },
      '-=0.1'
    )

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()

    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
  }, [ease, items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      tlRef.current.kill()

      const newTl = createTimeline()

      if (newTl) {
        if (isExpanded) {
          newTl.progress(1)
        }

        tlRef.current = newTl
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current

    if (!tl) return

    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)

      tl.play(0)
    } else {
      setIsHamburgerOpen(false)

      tl.eventCallback(
        'onReverseComplete',
        () => {
          setIsExpanded(false)
        }
      )

      tl.reverse()
    }
  }

  const setCardRef = index => element => {
    if (element) {
      cardsRef.current[index] = element
    }
  }

  const handleSearch = () => {
    const value = searchValue
      .trim()
      .toLowerCase()

    if (!value) return

    let target = null

    if (
      value.includes('project') ||
      value.includes('work') ||
      value.includes('portfolio')
    ) {
      target = 'projects'
    } else if (
      value.includes('skill') ||
      value.includes('technology') ||
      value.includes('tech')
    ) {
      target = 'skills'
    } else if (
      value.includes('about') ||
      value.includes('experience')
    ) {
      target = 'about'
    } else if (
      value.includes('contact') ||
      value.includes('hire') ||
      value.includes('email')
    ) {
      target = 'contact'
    }

    if (target) {
      document
        .getElementById(target)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })

      setSearchValue('')

      if (isExpanded) {
        toggleMenu()
      }
    }
  }

  const handleSearchKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div
      className={`card-nav-container ${className}`.trim()}
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? 'open' : ''
        }`}
        style={{
          backgroundColor: baseColor
        }}
      >

        <div className="card-nav-top">

          <div
            className={`hamburger-menu ${
              isHamburgerOpen ? 'open' : ''
            }`}
            onClick={toggleMenu}
            onKeyDown={e => {
              if (
                e.key === 'Enter' ||
                e.key === ' '
              ) {
                e.preventDefault()
                toggleMenu()
              }
            }}
            role="button"
            aria-label={
              isExpanded
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{
              color: menuColor
            }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="nav-search-wrapper">

            <input
              type="text"
              value={searchValue}
              onChange={e =>
                setSearchValue(e.target.value)
              }
              onKeyDown={handleSearchKeyDown}
              placeholder="Search projects, skills..."
              className="nav-search"
              aria-label="Search portfolio"
            />

          </div>

          <a
            href={buttonHref}
            onClick={onButtonClick}
            className="card-nav-cta-button"
            style={{
              backgroundColor: buttonBgColor,
              color: buttonTextColor
            }}
          >
            {buttonText}
          </a>

        </div>

        <div
          className="card-nav-content"
          aria-hidden={!isExpanded}
        >

          {(items || [])
            .slice(0, 3)
            .map((item, index) => (

              <div
                key={`${item.label}-${index}`}
                className="nav-card"
                ref={setCardRef(index)}
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor
                }}
              >

                <div className="nav-card-label">
                  {item.label}
                </div>

                <div className="nav-card-links">

                  {item.links?.map(
                    (link, i) => (

                      <a
                        key={`${link.label}-${i}`}
                        className="nav-card-link"
                        href={link.href}
                        aria-label={
                          link.ariaLabel
                        }
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon"
                          aria-hidden="true"
                        />

                        {link.label}
                      </a>

                    )
                  )}

                </div>

              </div>

            ))}

        </div>

      </nav>
    </div>
  )
}

export default CardNav
