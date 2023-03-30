import { useContext } from 'react'
import { State } from '../content/component'

function useComponent() {
  const { token, setToken, count, setCount, openModal, setOpenModal } = useContext(State)
  return { token, setToken, count, setCount, openModal, setOpenModal }
}

export default useComponent
