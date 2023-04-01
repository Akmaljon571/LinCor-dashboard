import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'
import { Result } from 'antd'

function ListVideo() {
  const { lang } = useStart()
  const { token, setCount, count, coursId, setVideoModal } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [video, setVideo] = useState([])
  const key = 'updatable'

  useEffect(() => {
    apiGet('/video/by_course/' + coursId, token)
      .then((re) => re.json())
      .then((data) => setVideo(data))
  }, [coursId, count, setVideo, token])

  const videoDelete = (id) => {
    console.log(id)
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    })
    apiGet('/video/delete/' + id, token, 'DELETE').then((baza) => {
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

  const cancel = (e) => {
    message.error('Click on No');
  };

  return (
    <>
      {contextHolder}
      <table>
        <thead>
          <tr>
            <th className="th">№</th>
            <th className="th">{Tillar[0][lang].title}</th>
            <th className="th">{Tillar[0][lang].seq}</th>
            <th className="th">{Tillar[0][lang].duration}</th>
            <th className="th">{Tillar[0][lang].des}</th>
            <th className="th">Edit</th>
            <th className="th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {video.length ? (
            video.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.video_title}</td>
                <td>{e.video_sequence} chi</td>
                <td>{e.video_duration}</td>
                <td>{e.video_description}</td>
                <td>
                  <EditOutlined
                    onClick={() => setVideoModal(e)}
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                  />
                </td>
                <td>
                  <Popconfirm
                    title="O'chirmoqchimisz?"
                    onConfirm={() => videoDelete(e.video_id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '22px',
                      }}
                    />
                  </Popconfirm>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default ListVideo
