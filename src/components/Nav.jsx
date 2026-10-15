import { useEffect, useState } from 'react'
import { nav } from '../data.js'
import { scrollToId } from '../lib/scroll.js'

export default function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const targets = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <nav aria-label="Main" className="glass flex max-w-full items-center gap-1 rounded-full p-1.5">
        <a
          href="#top"
          onClick={go('top')}
          aria-label="Back to top"
          className="hidden h-9 w-9 items-center justify-center rounded-full bg-saffron font-display text-sm font-bold text-ink sm:flex"
        >
          JK
        </a>
        <ul className="flex items-center overflow-x-auto">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`block whitespace-nowrap rounded-full px-2 py-2 text-[0.82rem] transition-colors sm:px-4 sm:text-sm ${
                  active === item.id ? 'bg-white/12 text-text' : 'text-muted hover:text-text'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
