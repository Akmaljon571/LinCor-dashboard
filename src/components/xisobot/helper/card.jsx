import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import { apiGet } from '../../../utils/api'
import darkImage from '../../../img/icon (1).svg'
import image from '../../../img/icon.svg'
import useStart from '../../../hooks/useStart'

function Card() {
  const [data, setData] = useState()
  const { token } = useComponent()
  const { dark } = useStart()

  useEffect(() => {
    apiGet('/users/statistika', token)
      .then((re) => re.json())
      .then((baza) => {
        console.log(baza)
        setData(baza)
      })
  }, [setData, token])

  return (
    <ul className="card_statistika">
      <li className="item">
        <span>Jami Userlar:</span> {data?.allUsers?.length || 0} ta
        <br />
        <span>active: </span> {data?.activeUser || 0} ta
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>1 Haftali Daromat: </span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>1 Oylik Daromat:</span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>1 Yillik Daromat: </span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
    </ul>
  )
}

export default Card
