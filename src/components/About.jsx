import { GraduationCap } from 'lucide-react'
import Section from './Section.jsx'
import { education } from '../data.js'

export default function About() {
  return (
    <Section id="about" title="I learn by building real systems.">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl space-y-5 text-lg text-muted">
          <p>
            I&rsquo;m a B.Tech Computer Science student at SAGE University Indore, studying at Alta School of Technology.
            My projects are attendance, farm equipment and campus-service platforms, each with real roles, permissions
            and data models behind them.
          </p>
          <p>
            Outside code, I design graphics for college tech fests, lead hackathon teams and represent Techfest, IIT
            Bombay on campus. I enjoy the parts of a product people see and the parts that keep it running.
          </p>
          <p>
            I&rsquo;m looking for an internship where I can ship features, learn from code review and take on harder
            problems.
          </p>
        </div>

        <ol className="space-y-4" aria-label="Education">
          {education.map((item) => (
            <li key={item.school} className="glass rounded-3xl p-5">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-periwinkle/15 text-periwinkle">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-normal">{item.school}</h3>
                  <p className="mt-1 text-base text-text/90">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.period}, {item.score}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
