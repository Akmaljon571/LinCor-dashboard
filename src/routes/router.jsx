import { Route, Routes } from 'react-router-dom'
import { Course, Take, Video, Xisobot, Error, AllUser, OpenWorkbook, Workbook } from '../components'

function Routerr () {
  return (
    <Routes>
      <Route path='/xisobot' element={<Xisobot />} />
      <Route path='/kurslar' element={<Course />} />
      <Route path='/video' element={<Video />} />
      <Route path='/open' element={<OpenWorkbook />} />
      <Route path='/kitob' element={<Workbook />} />
      <Route path='/users' element={<AllUser />} />
      <Route path='/sotish' element={<Take />} />
      <Route path='/*' element={<Error />} />
    </Routes>
  )
}

/*
  setting
*/

export default Routerr
