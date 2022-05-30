import DiaryCarousel from './DiaryCarousel'
import { getAxios } from '../../api'
import { useEffect, useState } from 'react'

const axios = getAxios()

function TopLiked() {
  const [likedList, setLikedList] = useState([{}])
  const getResult = async () => {
    try {
      let result = await axios.get('diary/topliked')
      // console.log('like-result: ', result.data.diaries)
      await setLikedList([...result.data.diaries])
    } catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    getResult()
  }, [])

  return (
    <div
      className="diary-carousel-written"
      style={{
        background: '#ffe6f0',
        // background: '#FFDAE5',
        margin: '1rem auto',
        width: '90%',
        borderRadius: '3px',
        border: '1px solid rgba(50, 50, 50, 0.1)',
      }}>
      <h2
        style={{
          textAlign: 'left',
          padding: '0.5em 0 0.2em 1em',
          color: '#424242',
        }}>
        <strong>가장 많은 좋아요를 받은 글은?😮</strong>
      </h2>
      <DiaryCarousel diaryList={likedList} />
    </div>
  )
}

export default TopLiked
