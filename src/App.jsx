import { lazy, Suspense } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// The owner inbox loads only when someone opens /?inbox=1, so visitors never download it.
const Inbox = lazy(() => import('./components/Inbox.jsx'))

function Portfolio() {
  useSmoothScroll()
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[60] rounded-full bg-saffron px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const showInbox = new URLSearchParams(window.location.search).has('inbox')
  if (showInbox) {
    return (
      <Suspense fallback={null}>
        <Inbox />
      </Suspense>
    )
  }
  return <Portfolio />
}
