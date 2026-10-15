import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-white/10 px-5 py-10 text-sm text-muted sm:px-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Designed and built by me.</p>
        <p>
          React, Three.js, GSAP, Tailwind CSS and Supabase.{' '}
          <a href="/?inbox=1" className="underline decoration-white/30 underline-offset-4 hover:text-text">
            Owner sign in
          </a>
        </p>
      </div>
    </footer>
  )
}
