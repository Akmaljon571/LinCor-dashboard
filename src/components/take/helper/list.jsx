import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'
import { Result } from 'antd'

function TakeList() {
    const { lang } = useStart()
    const { token, setCount, count, takeId, } = useComponent()
    const [messageApi, contextHolder] = message.useMessage()
    const [users, setUsers] = useState([])
    const key = 'updatable'

    useEffect(() => {
        apiGet('/courses_open_users/get/' + takeId, token)
            .then((re) => re.json())
            .then((data) => setUsers(data))
    }, [takeId, count, setUsers, token])

    return (
        <div className='take_table'>
            {contextHolder}
            <table>
                <thead>
                    <tr>
                        <th className="th">№</th>
                        <th className="th">{Tillar[0][lang].ismi}</th>
                        <th className="th">{Tillar[0][lang].familiyasi}</th>
                        <th className="th">{Tillar[0][lang].email}</th>
                        <th className="th">{Tillar[0][lang].active}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length ? (
                        users.map((e, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e.first_name}</td>
                                <td>{e.last_name} chi</td>
                                <td>{e.email}</td>
                                <td>{e.active ? true : false}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TakeList;