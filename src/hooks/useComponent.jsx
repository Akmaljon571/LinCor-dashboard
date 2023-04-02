import { useContext } from 'react'
import { State } from '../content/component'

function useComponent () {
  const {
    token,
    setToken,
    count,
    setCount,
    openModal,
    setOpenModal,
    coursId,
    setCourseId,
    videoModal,
    setVideoModal,
    takeId,
    setTakeId,
    openId,
    setOpenId,
    modalOpen,
    setModalOpen
  } = useContext(State)
  return {
    token,
    setToken,
    count,
    setCount,
    openModal,
    setOpenModal,
    coursId,
    setCourseId,
    videoModal,
    setVideoModal,
    takeId,
    setTakeId,
    openId,
    setOpenId,
    modalOpen,
    setModalOpen
  }
}

export default useComponent
