import { createContext, useState } from 'react'

export const State = createContext()

export const StatPriveder = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('admin_token')) || '',
  )
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [coursId, setCourseId] = useState(false);

  const data = { token, setToken, count, setCount, openModal, setOpenModal, coursId, setCourseId }
  return <State.Provider value={data}>{children}</State.Provider>
}
