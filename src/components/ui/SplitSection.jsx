import { Reveal } from './Reveal'

/**
 * The layout used by every home page section: the title sits in a narrow
 * left column (it stays in view while scrolling) and the content on the right.
 */
export function SplitSection({ id, title, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container split">
        <Reveal as="h2" id={`${id}-title`} className="split__title">
          {title}
        </Reveal>
        <div className="split__body">{children}</div>
      </div>
    </section>
  )
}
