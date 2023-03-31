import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { apiGet, host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'

function InputVideo() {
  const sar = useRef()
  const des = useRef()
  const pri = useRef()
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, setCourseId } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])

  useEffect(() => {
    apiGet('/courses', token)
      .then((re) => re.json())
      .then((data) => {
        setCourse(data)
        setCourseId(data[0]?.course_id)
      })
  }, [setCourse, token, count, setCourseId])

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
      formData.append('description', description)
      formData.append('sequence', sequence)
      formData.append('duration', price)
      formData.append('course_id', bgcolor)

      fetch(host + '/video/create', {
        method: 'POST',
        headers: {
          autharization: token,
        },
        body: formData,
      }).then((data) => {
        console.log(data)
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
    <>
      <div className="inputs_course">
        <h1>{Tillar[0][lang].addVideo}</h1>
        <ul>
          <li>
            <span>{Tillar[0][lang].title}</span>
            <input ref={sar} type="text" placeholder="3-dars" />
          </li>
          <li>
            <span>{Tillar[0][lang].des}</span>
            <input ref={des} type="text" placeholder="Bugungi dars paloncha" />
          </li>
          <li>
            <span>{Tillar[0][lang].duration}</span>
            <input ref={pri} type="text" placeholder="30:00" />
          </li>
          <li>
            <span>{Tillar[0][lang].oqish}</span>
            <select ref={bgc}>
              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.course_id}>
                      {e?.course_title}
                    </option>
                  ))
                : null}
            </select>
          </li>
          <li>
            <span>{Tillar[0][lang].seq}</span>
            <input ref={seq} type="number" placeholder="1" />
          </li>
          <li className="rasm">
            <span>{Tillar[0][lang].guruh}</span>
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
      <select className='videoSelect' onClick={(e) => setCourseId(e?.target?.value)}>
        {course.length
          ? course.map((e, i) => (
              <option key={i} value={e?.course_id}>
                {e?.course_title}
              </option>
            ))
          : null}
      </select>
    </>
  )
}

export default InputVideo
