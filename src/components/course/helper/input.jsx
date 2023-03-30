import { useRef } from 'react'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import { host } from '../../../utils/api'
import { message } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

function InputsCourse() {
  const sar = useRef()
  const des = useRef()
  const pri = useRef()
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { token } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()

  const sent = async () => {
    const title = sar.current.value
    const a = await des.current.value
    const price = pri.current.value
    const bgcolor = bgc.current.value
    const sequence = seq.current.value
    const file = rasmi.current.files[0]
    const key = 'updatable'

    if (title && a && price && bgcolor && sequence && file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('price', price)
      formData.append('bgcolor', bgcolor)
      formData.append('sequence', sequence)
      formData.append('description', a)
      console.log(a)
      fetch(host + '/courses/create', {
        method: 'POST',
        headers: {
          autharization: token,
        },
        body: formData,
      }).then((data) => {
        if (data.ok) {
          messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          })
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 2,
            })
          }, 1000)
        } else {
          messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          })
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
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      })
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
      <h1>Yangi Kurs qo’shish</h1>
      <ul>
        <li>
          <span>title</span>
          <input ref={sar} type="text" placeholder="Topik 1" />
        </li>
        <li>
          <span>Description</span>
          <input ref={des} type="text" placeholder="Kurs haqida qisqacha" />
        </li>
        <li>
          <span>Narxi</span>
          <input ref={pri} type="text" placeholder="1 000 000" />
        </li>
        <li>
          <span>Background</span>
          <input ref={bgc} type="color" />
        </li>
        <li>
          <span>Ketma-ketligi</span>
          <input ref={seq} type="number" placeholder="1" />
        </li>
        <li className="rasm">
          <span>Rasmi</span>
          <label htmlFor="rasm">
            <i>Yuklash</i>
            <img src={yukla} alt="yukla" />
          </label>
          <input id="rasm" ref={rasmi} className="none" type="file" />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Jonatish</button>
    </div>
  )
}

export default InputsCourse
