import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Download, MapPin, Send } from 'lucide-react'
import HeroScene from './HeroScene.jsx'
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './Icons.jsx'
import { profile } from '../data.js'
import { prefersReducedMotion, scrollToId } from '../lib/scroll.js'

const socials = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon },
  { label: 'LeetCode', href: profile.leetcode, Icon: LeetcodeIcon },
]

export default function Hero() {
  const root = useRef(null)

  // The one orchestrated moment: name lines rise out of their masks, then everything else settles in.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-line', { yPercent: 115, duration: 1.15, stagger: 0.12 })
        .from('.hero-fade', { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, '-=0.65')
        .from('.hero-photo', { opacity: 0, scale: 0.94, duration: 1.2 }, 0.15)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroScene />
      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hero-fade glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships
          </p>

          <h1 className="text-[clamp(3.6rem,11.5vw,8.5rem)] font-bold leading-[0.92]">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true" className="block">
              <span className="hero-mask">
                <span className="hero-line inline-block">Jyotish</span>
              </span>
            </span>
            <span aria-hidden="true" className="block">
              <span className="hero-mask">
                <span className="hero-line inline-block">Kumar</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-7 max-w-xl text-lg text-muted sm:text-xl">
            Full-stack developer. I build role-based platforms for colleges, farms and campuses with React, Next.js and
            Node.
          </p>

          <p className="hero-fade mt-3 flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} aria-hidden="true" />
            Based in {profile.location}
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('projects')}>
              <ArrowDown size={18} aria-hidden="true" />
              View projects
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToId('contact')}>
              <Send size={17} aria-hidden="true" />
              Get in touch
            </button>
            {profile.resume && (
              <a className="btn btn-ghost" href={profile.resume} download>
                <Download size={17} aria-hidden="true" />
                Resume
              </a>
            )}
          </div>

          <ul className="hero-fade mt-8 flex items-center gap-2" aria-label="Profiles">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  title={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-saffron"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-photo mx-auto w-full max-w-[22rem] lg:max-w-md">
          <div className="glass rounded-[2rem] p-2.5">
            <picture>
              <source srcSet="/jyotish.webp" type="image/webp" />
              <img
                src="/jyotish.jpg"
                alt="Portrait of Jyotish Kumar in a navy blazer and glasses"
                width="960"
                height="960"
                fetchPriority="high"
                className="aspect-square w-full rounded-[1.5rem] object-cover object-[50%_20%]"
              />
            </picture>
          </div>
          <figcaption className="sr-only">Jyotish Kumar</figcaption>
        </figure>
      </div>
    </section>
  )
}
