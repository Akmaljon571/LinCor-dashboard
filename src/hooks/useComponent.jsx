import { useContext } from 'react'
import { State } from '../content/component'

function useComponent() {
  const { token, setToken, count, setCount } = useContext(State)
  return { token, setToken, count, setCount }
}

export default useComponent
