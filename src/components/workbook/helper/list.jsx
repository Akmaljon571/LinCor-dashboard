import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, Result, message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'

function ListWorkbook () {
  const { workbookId, token, setCount, count, setModalWorkbook } = useComponent()
  const { lang } = useStart()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setVideo] = useState([])
  const key = 'updatable'

  useEffect(() => {
    apiGet('/workbook/admin/' + workbookId, token)
      .then(re => re.json())
      .then(data => {
        setVideo(data.workbook)
      })
  }, [workbookId, count, setVideo, token])

  const WorkbbookDelete = id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    apiGet('/workbook/delete/' + id, token, 'DELETE').then(baza => {
      if (baza.ok) {
        setCount(count + 1)
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2
          })
        }, 1000)
      } else {
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2
        })
      }
    })
  }

  const cancel = () => {
    message.error('Click on No')
  }

  return (
    <div className='list_open'>
      {contextHolder}
      <ul style={{ marginTop: '50px' }} className='top'>
        {data?.length ? (
          data.map((e, i) => (
            <li style={{ width: '250px' }} key={i}>
              <h2>Workbook Open</h2>
              <p style={{ marginTop: '10px' }}>
                <span>{Tillar[0][lang].seq}:</span> {e?.workbook_sequence} chi
              </p>
              <b>
                <EditOutlined
                  onClick={() => setModalWorkbook(e)}
                  style={{ cursor: 'pointer', fontSize: '22px' }}
                />
                <Popconfirm
                  title="O'chirmoqchimisz?"
                  onConfirm={() => WorkbbookDelete(e.workbook_id)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <DeleteOutlined
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '22px'
                    }}
                  />
                </Popconfirm>
              </b>
            </li>
          ))
        ) : (
          <Result
            status='404'
            title='404'
            style={{ marginLeft: '400px' }}
            subTitle='Sorry, the page you visited does not exist.'
          />
        )}
      </ul>
    </div>
  )
}

export default ListWorkbook
