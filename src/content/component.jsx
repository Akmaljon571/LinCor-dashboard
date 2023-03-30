import { createContext, useState } from 'react'

export const State = createContext()

export const StatPriveder = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('admin_token')) || '',
  )

  const data = { token, setToken }
  return <State.Provider value={data}>{children}</State.Provider>
}
