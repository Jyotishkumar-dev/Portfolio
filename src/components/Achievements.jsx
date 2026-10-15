import { Award, ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import { achievement, certifications, profile } from '../data.js'

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements and certifications">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass flex flex-col justify-between rounded-[1.75rem] p-8">
          <div>
            <p className="font-display text-7xl font-bold leading-none text-saffron sm:text-8xl">{achievement.count}</p>
            <p className="mt-4 max-w-sm text-lg text-text/90">{achievement.text}</p>
          </div>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost mt-8 w-fit"
          >
            <ArrowUpRight size={18} aria-hidden="true" />
            View LeetCode profile
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.name} className="glass flex gap-4 rounded-3xl p-5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-periwinkle/15 text-periwinkle">
                <Award size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold leading-snug tracking-normal">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
