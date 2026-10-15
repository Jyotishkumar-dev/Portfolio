import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, LogOut, Mail, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

// Owner-only view of messages from the contact form. Sign-in is a Supabase email link; the database's
// row-level security decides who can read, so this screen shows nothing to anyone else.
export default function Inbox() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(!supabase)
  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState('')
  const [messages, setMessages] = useState([])
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  const load = useCallback(async () => {
    setLoadError('')
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id,name,email,message,created_at')
      .order('created_at', { ascending: false })
    if (error) setLoadError('Messages could not be loaded. Check that you ran supabase/schema.sql.')
    else setMessages(data)
  }, [])

  useEffect(() => {
    if (session) load()
  }, [session, load])

  async function signIn(e) {
    e.preventDefault()
    setNotice('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/?inbox=1` },
    })
    setNotice(error ? 'Sign-in link could not be sent. Use the email address of the owner account.' : 'Check your email for a sign-in link.')
  }

  async function remove(id) {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (!error) setMessages((list) => list.filter((m) => m.id !== id))
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-12 sm:px-8">
      <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to portfolio
      </a>
      <h1 className="text-4xl font-bold">Inbox</h1>

      {!supabase && (
        <p className="glass mt-8 rounded-2xl p-5 text-muted">
          Supabase isn&rsquo;t configured. Copy <code>.env.example</code> to <code>.env</code> and add your project URL
          and anon key.
        </p>
      )}

      {supabase && !ready && <p className="mt-8 text-muted">Loading…</p>}

      {supabase && ready && !session && (
        <form onSubmit={signIn} className="glass mt-8 space-y-4 rounded-3xl p-6">
          <label htmlFor="inbox-email" className="block text-sm font-medium">
            Owner email
          </label>
          <input
            id="inbox-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            placeholder="you@example.com"
          />
          <button type="submit" className="btn btn-primary">
            <Mail size={18} aria-hidden="true" />
            Email me a sign-in link
          </button>
          <p role="status" className="text-sm text-muted">
            {notice}
          </p>
        </form>
      )}

      {supabase && session && (
        <>
          <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
            <p>Signed in as {session.user.email}</p>
            <button type="button" className="btn btn-ghost !px-4 !py-2 !text-sm" onClick={() => supabase.auth.signOut()}>
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </div>

          {loadError && <p className="mt-6 text-red-300">{loadError}</p>}
          {!loadError && messages.length === 0 && (
            <p className="glass mt-8 rounded-2xl p-5 text-muted">No messages yet. New messages from the contact form appear here.</p>
          )}

          <ul className="mt-8 space-y-4">
            {messages.map((m) => (
              <li key={m.id} className="glass rounded-3xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <a className="text-sm text-saffron hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    aria-label={`Delete message from ${m.name}`}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-white/10 hover:text-red-300"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-text/90">{m.message}</p>
                <p className="mt-3 text-xs text-muted">{new Date(m.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
