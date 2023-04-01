import { useRef } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import yukla from '../../../img/bx_download.svg'
import { message } from 'antd'
import { host } from '../../../utils/api'

const ModalVideo = ({ children }) => {
  const sar = useRef()
  const des = useRef()
  const pri = useRef()
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, videoModal, setVideoModal } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()

  const handleOk = () => {
    setVideoModal(false)
    const title = sar.current.value
    const description = des.current.value
    const price = pri.current.value
    const bgcolor = bgc.current.value
    const sequence = seq.current.value
    const file = rasmi.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('sequence', sequence)
    formData.append('duration', price)
    formData.append('course_id', bgcolor)

    fetch(host + '/video/update/' + videoModal?.video_id, {
      method: 'PATCH',
      headers: {
        autharization: token,
      },
      body: formData,
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1)
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2,
          })
        }, 1000)
      } else {
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'error',
            content: 'Loaded!',
            duration: 2,
          })
        }, 1000)
      }
    })
  }

  const handleCancel = () => {
    setVideoModal(false)
  }

  return (
    <>
      <b onClick={handleCancel} className={!videoModal ? 'none' : 'b'}></b>
      <div className={!videoModal ? 'none' : 'modal_course'}>
        <ul>
          <li>
            <span>{Tillar[0][lang].title}</span>
            <input ref={sar} type="text" placeholder="Topik 1" />
          </li>
          <li>
            <span>{Tillar[0][lang].des}</span>
            <input ref={des} type="text" placeholder="Kurs haqida qisqacha" />
          </li>
          <li>
            <span>{Tillar[0][lang].narx}</span>
            <input ref={pri} type="text" placeholder="1 000 000" />
          </li>
          <li>
            <span>{Tillar[0][lang].bgc}</span>
            <select ref={bgc}>
              <option value="#1D68F9">#1D68F9</option>
              <option value="#FF9D7B">#FF9D7B</option>
            </select>
          </li>
          <li>
            <span>{Tillar[0][lang].seq}</span>
            <input ref={seq} type="number" placeholder="1" />
          </li>
          <li className="rasm">
            <span>{Tillar[0][lang].rasm}</span>
            <label htmlFor="rasm2">
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt="yukla" />
            </label>
            <input id="rasm2" ref={rasmi} className="none" type="file" />
          </li>
        </ul>
        <button onClick={handleOk}>{Tillar[0][lang].sent}</button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalVideo
