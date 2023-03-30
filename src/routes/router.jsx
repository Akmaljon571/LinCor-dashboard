import { Route, Routes } from 'react-router-dom'
import { Course, Xisobot } from '../components'

function Routerr() {
  return (
    <Routes>
      <Route path="/xisobot" element={<Xisobot />} />
      <Route path="/kurslar" element={<Course />} />
    </Routes>
  )
}

export default Routerr
