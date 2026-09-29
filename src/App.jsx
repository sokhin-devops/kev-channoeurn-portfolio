import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { sectionIds } from './data/navigation'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDemoPage } from './pages/ProjectDemoPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* /about, /skills, /projects, /experience, /education, /contact */}
        {sectionIds.map((id) => (
          <Route key={id} path={id} element={<HomePage sectionId={id} />} />
        ))}
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Full-screen project demos, without the portfolio navigation */}
      <Route path="projects/:slug/demo" element={<ProjectDemoPage />} />
    </Routes>
  )
}
