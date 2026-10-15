import { ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import { GithubIcon } from './Icons.jsx'
import { projects } from '../data.js'

// Moves the hover highlight to follow the cursor inside a card.
const trackPointer = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Things I&rsquo;ve built and shipped"
      intro="Four full-stack products, each with its own roles, data and deployment."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title} className="flex">
            <article
              onPointerMove={trackPointer}
              className="glass spotlight flex w-full flex-col rounded-[1.75rem] p-6 sm:p-8"
            >
              <h3 className="text-3xl font-bold">{p.title}</h3>
              <p className="mt-1 text-base font-medium text-saffron">{p.tagline}</p>
              <p className="mt-4 text-muted">{p.description}</p>

              <ul className="mt-4 space-y-2 text-[0.97rem] text-text/85">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-periwinkle" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${p.title} tech stack`}>
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                {p.live && (
                  <a
                    className="btn btn-primary"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${p.title} live site`}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                    Live site
                  </a>
                )}
                {p.github && (
                  <a
                    className="btn btn-ghost"
                    href={p.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${p.title} source on GitHub`}
                  >
                    <GithubIcon width={18} height={18} />
                    Source code
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
