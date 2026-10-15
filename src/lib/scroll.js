let instance = null

export function setScroller(next) {
  instance = next
}

// Smooth scroll through Locomotive Scroll when it is running, native otherwise.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -72, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
