import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { sectionIds } from './data/navigation'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectAppPage } from './pages/ProjectAppPage'

// Old links ended with /demo; send them to the project's page.
function LegacyDemoRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/projects/${slug}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* /about, /skills, /projects, /experience, /education, /contact */}
        {sectionIds.map((id) => (
          <Route key={id} path={id} element={<HomePage sectionId={id} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Each project on its own page, without the portfolio navigation */}
      <Route path="projects/:slug" element={<ProjectAppPage />} />
      <Route path="projects/:slug/demo" element={<LegacyDemoRedirect />} />
    </Routes>
  )
}
