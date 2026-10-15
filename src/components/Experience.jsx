import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './Section.jsx'
import { experience } from '../data.js'
import { prefersReducedMotion } from '../lib/scroll.js'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const list = useRef(null)

  // The saffron line fills as you scroll down the timeline.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        },
      )
    }, list)
    return () => ctx.revert()
  }, [])

  return (
    <Section
      id="experience"
      title="Hackathons and leadership"
      intro="Leading a hackathon team, designing for college events and representing a national tech fest."
    >
      <div ref={list} className="relative max-w-3xl">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/12" aria-hidden="true">
          <div className="timeline-fill h-full w-full bg-saffron" />
        </div>
        <ol className="space-y-10">
          {experience.map((item) => (
            <li key={`${item.org}-${item.role}`} className="relative pl-10">
              <span
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-saffron bg-ink"
                aria-hidden="true"
              />
              <p className="text-sm text-muted">{item.period}</p>
              <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-normal">{item.role}</h3>
              <p className="mt-1 text-base font-medium text-periwinkle">{item.org}</p>
              <ul className="mt-3 space-y-1.5 text-muted">
                {item.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
