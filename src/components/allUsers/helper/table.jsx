import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons'
import { Popconfirm, message, Result } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'

function AllUserTable () {
  const { lang } = useStart()
  const { token, setCount, count } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [users, setUsers] = useState([])
  const key = 'updatable'

  useEffect(() => {
    apiGet('/users/statistika', token)
      .then(re => re.json())
      .then(data => setUsers(data.allUsers))
  }, [count, setUsers, token])

  const userDelete = userId => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    apiGet('/users/admin/delete/' + userId, token, 'DELETE').then(baza => {
      if (baza.status === 204) {
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

  const restart = userId => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    apiGet('/users/update/restart/' + userId, token, 'PUT').then(baza => {
      console.log(baza)
      if (baza.status === 200) {
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

  const cancel = e => {
    message.error('Click on No')
  }

  return (
    <div className='take_table'>
      {contextHolder}
      <table>
        <thead>
          <tr>
            <th className='th'>№</th>
            <th className='th'>{Tillar[0][lang].ismi}</th>
            <th className='th'>{Tillar[0][lang].familiyasi}</th>
            <th className='th'>{Tillar[0][lang].email}</th>
            <th className='th'>{Tillar[0][lang].active}</th>
            <th className='th'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td>{e.email}</td>
                <td>{e.active ? 'true' : 'false'}</td>
                <td>
                  {e.active ? (
                    <Popconfirm
                      title="O'chirmoqchimisz?"
                      onConfirm={() => userDelete(e.user_id)}
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
                  ) : (
                    <Popconfirm
                      title="Qaytarmoqchimisz?"
                      onConfirm={() => restart(e.user_id)}
                      onCancel={cancel}
                      okText='Yes'
                      cancelText='No'
                    >
                      <UserAddOutlined
                        style={{
                          color: 'green',
                          cursor: 'pointer',
                          fontSize: '22px'
                        }}
                      />
                    </Popconfirm>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>
                <Result
                  status='404'
                  title='404'
                  subTitle='Sorry, the page you visited does not exist.'
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AllUserTable
