import { Brain, Code, Database, LayoutDashboard, Server, Wrench } from 'lucide-react'
import Section from './Section.jsx'
import { skills } from '../data.js'

const icons = {
  code: Code,
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  wrench: Wrench,
  brain: Brain,
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="The tools I use to build, and the fundamentals underneath them.">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => {
          const Icon = icons[group.icon] ?? Code
          return (
            <li key={group.group} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron/15 text-saffron">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-normal">{group.group}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
