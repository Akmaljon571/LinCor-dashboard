import { Route, Routes } from 'react-router-dom'
import { Course, Take, Video, Xisobot } from '../components'

function Routerr() {
  return (
    <Routes>
      <Route path="/xisobot" element={<Xisobot />} />
      <Route path="/kurslar" element={<Course />} />
      <Route path="/video" element={<Video />} />
      <Route path="/sotish" element={<Take />} />
    </Routes>
  )
}

export default Routerr
