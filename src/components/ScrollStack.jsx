import { useLayoutEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import './ScrollStack.css'

export const ScrollStackItem = ({
  children,
  itemClassName = '',
}) => {
  return (
    <div
      className={`scroll-stack-card ${itemClassName}`.trim()}
    >
      {children}
    </div>
  )
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null)

  const cardsRef = useRef([])

  const cardPositionsRef = useRef([])

  const endPositionRef = useRef(0)

  const lastTransformsRef = useRef(new Map())

  const animationFrameRef = useRef(null)

  const lenisRef = useRef(null)

  const stackCompletedRef = useRef(false)

  const isUpdatingRef = useRef(false)

  const calculateProgress = useCallback(
    (scrollTop, start, end) => {
      if (end <= start) {
        return scrollTop >= end ? 1 : 0
      }

      if (scrollTop <= start) {
        return 0
      }

      if (scrollTop >= end) {
        return 1
      }

      return (scrollTop - start) / (end - start)
    },
    []
  )

  const parsePercentage = useCallback(
    (value, containerHeight) => {
      if (
        typeof value === 'string' &&
        value.includes('%')
      ) {
        return (
          (parseFloat(value) / 100) *
          containerHeight
        )
      }

      return parseFloat(value) || 0
    },
    []
  )

  /*
   * IMPORTANT:
   *
   * We calculate the ORIGINAL document position
   * BEFORE ScrollStack applies any transforms.
   *
   * This prevents getBoundingClientRect()
   * from reading our own transformed position.
   */
  const measurePositions = useCallback(() => {
    const scroller = scrollerRef.current

    if (!scroller) return

    const cards = Array.from(
      scroller.querySelectorAll(
        '.scroll-stack-card'
      )
    )

    cardsRef.current = cards

    /*
     * Temporarily remove transforms while measuring.
     */
    const previousTransforms =
      cards.map(
        (card) => card.style.transform
      )

    const previousFilters =
      cards.map(
        (card) => card.style.filter
      )

    cards.forEach((card) => {
      card.style.transform = 'none'
      card.style.filter = 'none'
    })

    /*
     * Force browser layout.
     */
    scroller.offsetHeight

    if (useWindowScroll) {
      cardPositionsRef.current =
        cards.map((card) => {
          const rect =
            card.getBoundingClientRect()

          return (
            rect.top +
            window.scrollY
          )
        })

      const endElement =
        scroller.querySelector(
          '.scroll-stack-end'
        )

      if (endElement) {
        const rect =
          endElement.getBoundingClientRect()

        endPositionRef.current =
          rect.top +
          window.scrollY
      }
    } else {
      cardPositionsRef.current =
        cards.map(
          (card) => card.offsetTop
        )

      const endElement =
        scroller.querySelector(
          '.scroll-stack-end'
        )

      if (endElement) {
        endPositionRef.current =
          endElement.offsetTop
      }
    }

    /*
     * Restore transforms.
     */
    cards.forEach((card, index) => {
      card.style.transform =
        previousTransforms[index]

      card.style.filter =
        previousFilters[index]
    })

    lastTransformsRef.current.clear()
  }, [useWindowScroll])

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight:
          window.innerHeight,
      }
    }

    const scroller =
      scrollerRef.current

    if (!scroller) {
      return {
        scrollTop: 0,
        containerHeight:
          window.innerHeight,
      }
    }

    return {
      scrollTop: scroller.scrollTop,
      containerHeight:
        scroller.clientHeight,
    }
  }, [useWindowScroll])

  const updateCardTransforms =
    useCallback(() => {
      if (
        !cardsRef.current.length ||
        isUpdatingRef.current
      ) {
        return
      }

      isUpdatingRef.current = true

      const {
        scrollTop,
        containerHeight,
      } = getScrollData()

      const stackPositionPx =
        parsePercentage(
          stackPosition,
          containerHeight
        )

      const scaleEndPositionPx =
        parsePercentage(
          scaleEndPosition,
          containerHeight
        )

      const cardPositions =
        cardPositionsRef.current

      const endElementTop =
        endPositionRef.current

      const pinEnd =
        endElementTop -
        containerHeight / 2

      cardsRef.current.forEach(
        (card, index) => {
          const cardTop =
            cardPositions[index]

          if (
            typeof cardTop !==
            'number'
          ) {
            return
          }

          /*
           * When this card should reach
           * the stack position.
           */
          const pinStart =
            cardTop -
            stackPositionPx -
            itemStackDistance *
              index

          /*
           * Scaling starts slightly before
           * the card reaches the stack.
           */
          const scaleStart =
            cardTop -
            stackPositionPx -
            itemDistance

          const scaleEnd =
            cardTop -
            scaleEndPositionPx

          const scaleProgress =
            calculateProgress(
              scrollTop,
              scaleStart,
              scaleEnd
            )

          const targetScale =
            baseScale +
            index * itemScale

          const scale =
            1 -
            scaleProgress *
              (1 - targetScale)

          const rotation =
            rotationAmount
              ? index *
                rotationAmount *
                scaleProgress
              : 0

          /*
           * Calculate pinning.
           */
          let translateY = 0

          if (
            scrollTop >= pinStart &&
            scrollTop <= pinEnd
          ) {
            translateY =
              scrollTop -
              cardTop +
              stackPositionPx +
              itemStackDistance *
                index
          } else if (
            scrollTop > pinEnd
          ) {
            translateY =
              pinEnd -
              cardTop +
              stackPositionPx +
              itemStackDistance *
                index
          }

          /*
           * Blur.
           */
          let blur = 0

          if (blurAmount > 0) {
            let activeCard = 0

            for (
              let j = 0;
              j <
              cardPositions.length;
              j++
            ) {
              const otherCardTop =
                cardPositions[j]

              const otherPinStart =
                otherCardTop -
                stackPositionPx -
                itemStackDistance *
                  j

              if (
                scrollTop >=
                otherPinStart
              ) {
                activeCard = j
              }
            }

            if (
              index <
              activeCard
            ) {
              blur =
                (activeCard -
                  index) *
                blurAmount
            }
          }

          const transform =
            `translate3d(0, ${translateY}px, 0) ` +
            `scale(${scale}) ` +
            `rotate(${rotation}deg)`

          const filter =
            blur > 0
              ? `blur(${blur}px)`
              : 'none'

          const previous =
            lastTransformsRef.current.get(
              index
            )

          const transformChanged =
            !previous ||
            previous.transform !==
              transform ||
            previous.filter !==
              filter

          if (transformChanged) {
            card.style.transform =
              transform

            card.style.filter =
              filter

            lastTransformsRef.current.set(
              index,
              {
                transform,
                filter,
              }
            )
          }
        }
      )

      /*
       * Stack complete callback.
       */
      const lastIndex =
        cardsRef.current.length - 1

      if (lastIndex >= 0) {
        const lastCardStart =
          cardPositions[lastIndex] -
          stackPositionPx -
          itemStackDistance *
            lastIndex

        const complete =
          scrollTop >=
          lastCardStart &&
          scrollTop <= pinEnd

        if (
          complete &&
          !stackCompletedRef.current
        ) {
          stackCompletedRef.current =
            true

          if (onStackComplete) {
            onStackComplete()
          }
        }

        if (
          !complete &&
          stackCompletedRef.current
        ) {
          stackCompletedRef.current =
            false
        }
      }

      isUpdatingRef.current =
        false
    }, [
      getScrollData,
      parsePercentage,
      stackPosition,
      scaleEndPosition,
      itemStackDistance,
      itemDistance,
      baseScale,
      itemScale,
      rotationAmount,
      blurAmount,
      calculateProgress,
      onStackComplete,
    ])

  const requestUpdate =
    useCallback(() => {
      if (
        animationFrameRef.current
      ) {
        return
      }

      animationFrameRef.current =
        requestAnimationFrame(() => {
          animationFrameRef.current =
            null

          updateCardTransforms()
        })
    }, [updateCardTransforms])

  useLayoutEffect(() => {
    const scroller =
      scrollerRef.current

    if (!scroller) return

    const cards = Array.from(
      scroller.querySelectorAll(
        '.scroll-stack-card'
      )
    )

    cards.forEach(
      (card, index) => {
        /*
         * Keep spacing between cards.
         */
        if (
          index <
          cards.length - 1
        ) {
          card.style.marginBottom =
            `${itemDistance}px`
        }

        card.style.willChange =
          'transform, filter'

        card.style.transformOrigin =
          'top center'

        card.style.backfaceVisibility =
          'hidden'

        card.style.transform =
          'none'

        card.style.perspective =
          '1000px'

        card.style.webkitPerspective =
          '1000px'
      }
    )

    /*
     * Measure BEFORE any transforms.
     */
    measurePositions()

    /*
     * Initial render.
     */
    updateCardTransforms()

    /*
     * WINDOW SCROLL MODE
     *
     * No Lenis here.
     */
    const handleWindowScroll =
      () => {
        requestUpdate()
      }

    const handleResize = () => {
      /*
       * Clear old transforms before
       * recalculating document positions.
       */
      cards.forEach((card) => {
        card.style.transform =
          'none'

        card.style.filter =
          'none'
      })

      requestAnimationFrame(() => {
        measurePositions()
        updateCardTransforms()
      })
    }

    if (useWindowScroll) {
      window.addEventListener(
        'scroll',
        handleWindowScroll,
        {
          passive: true,
        }
      )

      window.addEventListener(
        'resize',
        handleResize
      )

      window.addEventListener(
        'load',
        handleResize
      )
    } else {
      /*
       * LOCAL SCROLLER MODE ONLY
       */
      const lenis =
        new Lenis({
          wrapper: scroller,
          content:
            scroller.querySelector(
              '.scroll-stack-inner'
            ),
          duration: 1.2,
          easing: (t) =>
            Math.min(
              1,
              1.001 -
                Math.pow(
                  2,
                  -10 * t
                )
            ),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          wheelMultiplier: 1,
          touchInertiaMultiplier: 35,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
          touchInertia: 0.6,
        })

      lenis.on(
        'scroll',
        updateCardTransforms
      )

      lenisRef.current = lenis

      const raf = (time) => {
        lenis.raf(time)

        animationFrameRef.current =
          requestAnimationFrame(
            raf
          )
      }

      animationFrameRef.current =
        requestAnimationFrame(raf)
    }

    /*
     * ResizeObserver keeps positions
     * correct if content changes.
     */
    const resizeObserver =
      new ResizeObserver(() => {
        handleResize()
      })

    resizeObserver.observe(
      scroller
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleWindowScroll
      )

      window.removeEventListener(
        'resize',
        handleResize
      )

      window.removeEventListener(
        'load',
        handleResize
      )

      resizeObserver.disconnect()

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        )

        animationFrameRef.current =
          null
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()

        lenisRef.current =
          null
      }

      cards.forEach((card) => {
        card.style.transform =
          ''

        card.style.filter =
          ''

        card.style.marginBottom =
          ''
      })

      cardsRef.current = []

      cardPositionsRef.current =
        []

      endPositionRef.current =
        0

      lastTransformsRef.current.clear()

      stackCompletedRef.current =
        false

      isUpdatingRef.current =
        false
    }
  }, [
    itemDistance,
    useWindowScroll,
    measurePositions,
    updateCardTransforms,
    requestUpdate,
  ])

  return (
    <div
      ref={scrollerRef}
      className={`scroll-stack-scroller ${className}`.trim()}
    >
      <div className="scroll-stack-inner">
        {children}

        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack