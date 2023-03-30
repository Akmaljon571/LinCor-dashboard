import { useContext } from 'react'
import { State } from '../content/component'

function useComponent() {
  const { token, setToken } = useContext(State)
  return { token, setToken }
}

export default useComponent
