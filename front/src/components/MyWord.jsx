import { Button, Card, Modal, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAxios } from '../api'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import moment from 'moment'

const { Title } = Typography

function MyWord({ data, keyword, setWord, word }) {
  const { me } = useSelector((state) => state.user)
  const axios = getAxios()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [diary, setDiary] = useState(null)
  const [title, setTitle] = useState(null)
  const navigate = useNavigate()
  const color = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
  }

  useEffect(() => {
    setWord(data)
  }, [data])

  const showModal = (item) => {
    setTitle(item)
    axios.get(`/diary/searchword`, { params: { userId: me.userId, word: item } }).then((res) => {
      setDiary(res.data)
    })
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
    })
  }

  function timeForToday(value) {
    let tData = new Date(value)
    tData.setHours(tData.getHours() + 9)
    const today = new Date()
    const timeValue = new Date(tData)

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
    if (betweenTime < 1) return '방금 전'
    if (betweenTime < 60) {
      return `${betweenTime}분 전`
    }

    const betweenTimeHour = Math.floor(betweenTime / 60)
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
    if (betweenTimeDay < 8) {
      return `${betweenTimeDay}일 전`
    }

    return `${moment(value).format('YYYY-MM-DD hh:mm')}`
  }

  const onWrite = (word) => {
    navigate('/my/article', { state: word })
  }

  return (
    <div>
      {word !== null && word.length !== 0 ? (
        word.map((item, idx) => (
          <Tag
            style={{ marginBottom: '5px', cursor: 'pointer' }}
            key={idx}
            color={color[Math.floor(Math.random() * color.length)]}
            onClick={(e) => {
              showModal(item, e)
            }}>
            {item}
          </Tag>
        ))
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <h3>
              <strong>'{keyword}'</strong>에 대한 검색 결과가 없습니다.
            </h3>
            {/* <Button
              type="text"
              icon={<EditOutlined />}
              style={{ marginRight: '1rem' }}
              onClick={(e) => onWrite(keyword)}>
              해당 단어로 글쓰기
            </Button> */}
          </div>
        </>
      )}
      {title != null && (
        <Modal
          title={<Title level={3}>#{title}</Title>}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1050}
          footer={null}>
          <Slider {...settings}>
            {diary != null &&
              diary.map((item, idx) => (
                <Card
                  hoverable
                  key={idx}
                  onClick={(e) => {
                    pageMove(item.dno, e)
                  }}>
                  <center>
                    <img style={{ width: '150px', height: '100px' }} src={item.image} alt="img" />
                  </center>
                  <div className="card-bottom" style={{ textAlign: 'center', marginTop: '5px' }}>
                    <div>
                      <HeartFilled style={{ fontSize: '18px' }} />{' '}
                      <span style={{ fontSize: '18px', marginRight: '20px' }}>{item.liked}</span>
                      <EyeFilled style={{ fontSize: '18px' }} />{' '}
                      <span style={{ fontSize: '18px', marginRight: '20px' }}>{item.view}</span>
                      <MessageFilled style={{ fontSize: '18px' }} />{' '}
                      <span style={{ fontSize: '18px' }}>{item.comments.length}</span>
                      <p style={{ marginTop: '5px' }}>{timeForToday(item.createdat)}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </Slider>
        </Modal>
      )}
    </div>
  )
}

export default MyWord
