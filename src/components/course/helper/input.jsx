import { useRef } from 'react'
import { message } from 'antd'
import { host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'

function InputsCourse() {
  const sar = useRef()
  const des = useRef()
  const pri = useRef()
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()

  const sent = () => {
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

    if (title && description && price && bgcolor && sequence && file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('price', price)
      formData.append('bgcolor', bgcolor)
      formData.append('sequence', sequence)
      formData.append('description', description)

      fetch(host + '/courses/create', {
        method: 'POST',
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
  }

  return (
    <div className="inputs_course">
      <h1>{Tillar[0][lang].courseAdd}</h1>
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
          <input ref={bgc} type="color" />
        </li>
        <li>
          <span>{Tillar[0][lang].seq}</span>
          <input ref={seq} type="number" placeholder="1" />
        </li>
        <li className="rasm">
          <span>{Tillar[0][lang].rasm}</span>
          <label htmlFor="rasm">
            <i>{Tillar[0][lang].yukla}</i>
            <img src={yukla} alt="yukla" />
          </label>
          <input id="rasm" ref={rasmi} className="none" type="file" />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>{Tillar[0][lang].sent}</button>
    </div>
  )
}

export default InputsCourse
