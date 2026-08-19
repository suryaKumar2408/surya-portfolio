import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function StickyHero({ children, id, style = {} }) {
  return (
    <section
      id={id}
      className="sticky-hero"
      style={style}
    >
      {children}
    </section>
  )
}

export function OverlaySection({
  children,
  id,
  className = '',
  style = {},
  dark = false
}) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      style={{
        ...style,
        backgroundColor: dark ? '#0a0a0a' : 'var(--bg)'
      }}
    >
      {children}
    </section>
  )
}

export default function SectionReveal({
  children,
  id,
  className = '',
  style = {},
  dark = false
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3']
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0.6, 1]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [30, 0]
  )

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${className}`}
      style={{
        ...style,
        opacity,
        y,
        backgroundColor: dark ? '#0a0a0a' : undefined
      }}
    >
      {children}
    </motion.section>
  )
}