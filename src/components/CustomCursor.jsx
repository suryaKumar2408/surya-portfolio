import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [typing, setTyping] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [clicking, setClicking] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringX = useSpring(cursorX, {
    damping: 28,
    stiffness: 280,
    mass: 0.45
  })

  const ringY = useSpring(cursorY, {
    damping: 28,
    stiffness: 280,
    mass: 0.45
  })

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target

      const input = target.closest(
        'input, textarea'
      )

      if (input) {
        setTyping(true)
        setHovered(false)
        return
      }

      setTyping(false)

      const interactive = target.closest(
        `
        a,
        button,
        select,
        [role="button"],
        .work-card,
        .achievement-card,
        .nav-card,
        .nav-card-link,
        .round-link,
        .resume-link,
        .card-nav-cta-button,
        .work-tag
        `
      )

      setHovered(Boolean(interactive))
    }

    const handleFocusIn = (e) => {
      if (
        e.target.matches(
          'input, textarea'
        )
      ) {
        setTyping(true)
        setHovered(false)
      }
    }

    const handleFocusOut = (e) => {
      if (
        e.target.matches(
          'input, textarea'
        )
      ) {
        setTyping(false)
      }
    }

    const handleMouseDown = () => {
      setClicking(true)
    }

    const handleMouseUp = () => {
      setClicking(false)
    }

    const handleMouseLeave = () => {
      setHidden(true)
    }

    const handleMouseEnter = () => {
      setHidden(false)
    }

    window.addEventListener(
      'mousemove',
      moveCursor
    )

    window.addEventListener(
      'mousedown',
      handleMouseDown
    )

    window.addEventListener(
      'mouseup',
      handleMouseUp
    )

    document.addEventListener(
      'focusin',
      handleFocusIn
    )

    document.addEventListener(
      'focusout',
      handleFocusOut
    )

    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave
    )

    document.documentElement.addEventListener(
      'mouseenter',
      handleMouseEnter
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        moveCursor
      )

      window.removeEventListener(
        'mousedown',
        handleMouseDown
      )

      window.removeEventListener(
        'mouseup',
        handleMouseUp
      )

      document.removeEventListener(
        'focusin',
        handleFocusIn
      )

      document.removeEventListener(
        'focusout',
        handleFocusOut
      )

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      )

      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      )
    }
  }, [cursorX, cursorY])

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return null
  }

  return (
    <>
      {/* INNER DOT */}

      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          opacity:
            hidden || typing ? 0 : 1
        }}
        animate={{
          scale: clicking
            ? 0.45
            : hovered
              ? 0.8
              : 1
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut'
        }}
      />

      {/* OUTER CURSOR */}

      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: hidden ? 0 : 1
        }}
        animate={{
          width: typing
            ? 2
            : hovered
              ? 60
              : 32,

          height: typing
            ? 24
            : hovered
              ? 60
              : 32,

          borderRadius: typing
            ? 2
            : 999,

          borderColor: typing
            ? 'rgba(125, 227, 237, 0.9)'
            : hovered
              ? 'rgba(125, 227, 237, 0.75)'
              : 'rgba(125, 227, 237, 0.35)',

          backgroundColor:
            typing
              ? 'rgba(125, 227, 237, 0.75)'
              : hovered
                ? 'rgba(125, 227, 237, 0.06)'
                : 'transparent',

          scale: clicking
            ? 0.85
            : 1
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
      />
    </>
  )
}