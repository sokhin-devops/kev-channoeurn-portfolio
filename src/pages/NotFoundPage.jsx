import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section className="section not-found" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <p className="not-found__code">404</p>
        <h1 id="not-found-title" className="section-title">
          This page doesn&apos;t exist.
        </h1>
        <p className="section-description">The link may be broken, or the page may have been moved.</p>
        <Button to="/" icon={ArrowLeft}>
          Back to home
        </Button>
      </div>
    </section>
  )
}
