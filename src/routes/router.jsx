import { Route, Routes } from 'react-router-dom'
import { Course, Video, Xisobot } from '../components'

function Routerr() {
  return (
    <Routes>
      <Route path="/xisobot" element={<Xisobot />} />
      <Route path="/kurslar" element={<Course />} />
      <Route path="/video" element={<Video />} />
    </Routes>
  )
}

export default Routerr
