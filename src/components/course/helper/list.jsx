import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet, img_link } from '../../../utils/api'
import ModalApp from './modal'

function ListCourse() {
  const { lang } = useStart()
  const { token, count, setCount, setOpenModal } = useComponent()
  const [data, setData] = useState([])

  useEffect(() => {
    apiGet('/courses', token)
      .then((re) => re.json())
      .then((baza) => setData(baza))
  }, [setData, count, token])
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'

  const CourseDelete = (id) => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    })
    apiGet('/courses/delete/' + id, token, 'DELETE').then((baza) => {
      if (baza.ok) {
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
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2,
        })
      }
    })
  }

  return (
    <div className="list_course">
      <h1>Mavjud guruhlar</h1>
      <ul className="top">
        {data.length
          ? data.map((e, i) => (
              <li style={{ backgroundColor: e?.course_bgc }} key={i}>
                <h2>{e?.course_title}</h2>
                <img src={img_link + e?.course_link} alt="course" />
                <p>
                  <span>{Tillar[0][lang].narx}:</span> {e?.course_price}sum
                </p>
                <p>
                  <span>{Tillar[0][lang].seq}:</span> {e?.course_sequence}chi
                </p>
                <p>
                  <span>{Tillar[0][lang].guruh}:</span> {e?.videos_count}ta
                </p>
                <p>
                  <span>{Tillar[0][lang].des}:</span>
                  <i style={{ textAlign: 'end' }}>{e?.course_description}</i>
                </p>
                <b>
                  <DeleteOutlined
                    onClick={() => CourseDelete(e.course_id)}
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '32px',
                    }}
                  />
                  <EditOutlined
                    onClick={() => setOpenModal(e)}
                    style={{ cursor: 'pointer', fontSize: '32px' }}
                  />
                </b>
              </li>
            ))
          : null}
      </ul>
      {contextHolder}
      <ModalApp />
    </div>
  )
}

export default ListCourse
