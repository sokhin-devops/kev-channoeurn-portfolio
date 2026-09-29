import { cx } from '../../utils/cx'
import { Reveal } from './Reveal'

export function SectionHeading({ id, index, eyebrow, title, description, align = 'left' }) {
  return (
    <Reveal as="header" className={cx('section-heading', align === 'center' && 'section-heading--center')}>
      <p className="eyebrow">
        {index && <span className="eyebrow__index">{index}</span>}
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  )
}
