import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Avatar, Image, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { EyeOutlined, MessageFilled } from '@ant-design/icons'
import { getAxios } from '../../api'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { loadUserRequestAction } from '../../reducers/user'
import '../Diary/Comment.css'

const { Title, Text } = Typography

function DiaryHeader({ diary }) {
  const { me } = useSelector((state) => state.user)
  const [state, setState] = useState(false)
  const axios = getAxios()
  const params = useParams()
  const [liked, setLiked] = useState(null)

  const onChangeLiked = () => {
    if (state) {
      // 좋아요 -> 안좋아요
      axios.post('/liked', { dno: params.dno, userId: me.userId }).then((res) => {
        setState(res.data.liked)
        axios.get('liked', { params: { dno: params.dno } }).then((res) => {
          setLiked(res.data)
        })
      })
    } else {
      // 안좋아요 -> 좋아요
      axios.post('/liked', { dno: params.dno, userId: me.userId }).then((res) => {
        setState(res.data.liked)
        axios.get('/liked', { params: { dno: params.dno } }).then((res) => {
          setLiked(res.data)
        })
      })
    }
  }

  useEffect(() => {
    axios.get('/liked', { params: { dno: params.dno } }).then((res) => {
      setLiked(res.data)
    })
  }, [])

  useEffect(() => {
    if (me !== null) {
      axios.get('/liked/status', { params: { dno: params.dno, userId: me.userId } }).then((res) => {
        setState(res.data.result)
      })
    }
  }, [me])

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

  return (
    <Row>
      <Col span={12}>
        <StyledWordTitle level={3}>#{diary.word}</StyledWordTitle>
        <StyledSpace>
          {state ? (
            <StyledLikeArea>
              <StyledUnLiked onClick={onChangeLiked} />
              {liked !== null && liked}
            </StyledLikeArea>
          ) : (
            <StyledLikeArea>
              <StyledLiked onClick={onChangeLiked} />
              {liked !== null && liked}
            </StyledLikeArea>
          )}
          <div>
            <EyeOutlined /> {diary.view}
          </div>
          <div>
            <MessageFilled /> {diary.comments && diary.comments.length}
          </div>
        </StyledSpace>
      </Col>
      <Col span={12}>
        <StyledUserArea>
          {/* {me !== null ? (
            me.image === null ? (
              <StyledAvatar icon={<UserOutlined />} />
            ) : (
              <StyledAvatar src={<img src={me.image} style={{ width: 32 }} />} />
            )
          ) : null} */}
          <StyledAvatar src={<img src={diary.profileImage} style={{ width: 32 }} />} />
          <Title level={5}>{diary.nickname}</Title>
        </StyledUserArea>
        <StyledDateText level={5}>{timeForToday(diary.createdat)}</StyledDateText>
      </Col>
    </Row>
  )
}

const StyledWordTitle = styled(Title)`
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  font-size: 25px;
`
const StyledAvatar = styled(Avatar)`
  margin: 0 0.5rem;
`

const StyledUserArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 0.5rem;
`

const StyledDateText = styled(Text)`
  display: flex;
  justify-content: end;
  align-items: center;
`

const StyledLiked = styled(BsHeart)`
  cursor: pointer;
  width: 13px;
  margin-top: 0.1em;
  margin-right: 0.3em;
`

const StyledUnLiked = styled(BsHeartFill)`
  cursor: pointer;
  width: 13px;
  margin-top: 0.1em;
  margin-right: 0.3em;
`

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledLikeArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default DiaryHeader
