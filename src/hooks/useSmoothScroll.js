import { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, setScroller } from '../lib/scroll.js'

gsap.registerPlugin(ScrollTrigger)

// Locomotive Scroll drives smooth scrolling; ScrollTrigger is kept in sync on every scroll frame.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const loco = new LocomotiveScroll({
      lenisOptions: { lerp: 0.09, smoothWheel: true },
      scrollCallback: () => ScrollTrigger.update(),
    })
    setScroller(loco)

    const refresh = () => {
      loco.resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      setScroller(null)
      loco.destroy()
    }
  }, [])
}
