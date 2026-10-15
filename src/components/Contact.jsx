import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, Send, TriangleAlert } from 'lucide-react'
import Section from './Section.jsx'
import { GithubIcon, LinkedinIcon } from './Icons.jsx'
import { profile } from '../data.js'
import { supabase } from '../lib/supabase.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate({ name, email, message }) {
  const errors = {}
  if (!name) errors.name = 'Enter your name.'
  else if (name.length > 100) errors.name = 'Keep your name under 100 characters.'
  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(email) || email.length > 254) errors.email = 'Enter a valid email address, like name@example.com.'
  if (!message) errors.message = 'Write a message.'
  else if (message.length < 10) errors.message = 'Write at least 10 characters so I know how to help.'
  else if (message.length > 2000) errors.message = 'Keep your message under 2,000 characters.'
  return errors
}

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const [failure, setFailure] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = new FormData(formEl)

    // Hidden field that real visitors never see. Bots fill it, so we pretend it worked and drop the message.
    if (data.get('website')) {
      setStatus('sent')
      return
    }

    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    if (!supabase) {
      setFailure(`The contact form isn't connected yet. Email me at ${profile.email} instead.`)
      setStatus('error')
      return
    }

    setStatus('sending')
    setFailure('')
    // No .select() here: visitors may insert but never read, so we must not ask for the row back.
    const { error } = await supabase.from('contact_messages').insert(values)
    if (error) {
      setFailure(`Your message wasn't sent. Try again, or email me at ${profile.email}.`)
      setStatus('error')
      return
    }
    formEl.reset()
    setStatus('sent')
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  })

  return (
    <Section
      id="contact"
      title="Let&rsquo;s talk about an internship"
      intro="Send a message about a role, a project or a hackathon. I reply within a couple of days."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="space-y-4 text-lg">
          <li>
            <a className="flex items-center gap-3 text-text transition-colors hover:text-saffron" href={`mailto:${profile.email}`}>
              <Mail size={20} aria-hidden="true" />
              {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-3 text-muted">
            <MapPin size={20} aria-hidden="true" />
            {profile.location}, India
          </li>
          <li>
            <a
              className="flex items-center gap-3 text-text transition-colors hover:text-saffron"
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon />
              github.com/Jyotishkumar-dev
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 text-text transition-colors hover:text-saffron"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedinIcon />
              LinkedIn profile
            </a>
          </li>
        </ul>

        <div className="glass rounded-[1.75rem] p-6 sm:p-8">
          {status === 'sent' ? (
            <div className="py-6 text-center" role="status">
              <CheckCircle2 className="mx-auto text-emerald-400" size={44} aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-semibold tracking-normal">Message sent</h3>
              <p className="mx-auto mt-2 max-w-sm text-muted">Thanks for reaching out. I&rsquo;ll reply to the email you gave.</p>
              <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                    Your name
                  </label>
                  <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={100} className="field" placeholder="Priya Sharma" />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                    Your email
                  </label>
                  <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} className="field" placeholder="priya@company.com" />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-sm text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea {...fieldProps('message')} rows={6} maxLength={2000} className="field resize-y" placeholder="Tell me about the role or project." />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div aria-live="polite">
                {status === 'error' && (
                  <p className="flex items-start gap-2 rounded-2xl border border-red-300/30 bg-red-400/10 p-3 text-sm text-red-200">
                    <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {failure}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                <Send size={18} aria-hidden="true" />
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
