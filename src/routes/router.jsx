import { Route, Routes } from 'react-router-dom'
import { Course, Take, Video, Xisobot, Error } from '../components'

function Routerr() {
  return (
    <Routes>
      <Route path="/xisobot" element={<Xisobot />} />
      <Route path="/kurslar" element={<Course />} />
      <Route path="/video" element={<Video />} />
      <Route path="/sotish" element={<Take />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  )
}

/*
  setting
  workbook
  open-workbook
  allUsers
*/

export default Routerr
