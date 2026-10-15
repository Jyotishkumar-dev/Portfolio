export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <header className="mb-12 max-w-2xl">
        <h2 id={`${id}-title`} className="text-4xl font-bold sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </header>
      {children}
    </section>
  )
}
