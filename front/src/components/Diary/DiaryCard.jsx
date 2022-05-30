import React, { useEffect, useState } from 'react'
import { Card, Avatar, Space, Typography, Row, Col } from 'antd'
import styled from 'styled-components'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { getAxios } from '../../api'

const { Meta } = Card
const { Text } = Typography

function DiaryCard({ card }) {
  const navigate = useNavigate()
  const axios = getAxios()

  const onClick = async () => {
    axios.get('/diary/view', { params: { dno: card.dno } }).then(() => {
      navigate(`/diary/read/${card.dno}`)
    })
  }

  return (
    <StyledCard
      className="card"
      hoverable
      cover={
        <StyledImageArea>
          <StyledImage src={card.image} />
        </StyledImageArea>
      }
      onClick={onClick}>
      <Meta
        avatar={<Avatar src={card.profileImage} />}
        title={card.nickname}
        description={`#${card.word}`}
      />
      {/* <Row justify="space-evenly" align="middle">
        <Col span={24}>
          <Space size="small">
            <Avatar src={card.profile_image} />
            <Space direction="vertical" size={1}>
              <StyledText>{card.nickname}</StyledText>
              <StyledText>{moment(card.createdat).format('YYYY-MM-DD')}</StyledText>
            </Space>
          </Space>
        </Col>
      </Row> */}

      {/* <StyledText>#{card.word}</StyledText> */}
      <div style={{ marginTop: '1rem' }}>
        <StyledText>{card.content}</StyledText>
      </div>
    </StyledCard>
  )
}

const StyledImageArea = styled.div`
  height: 25vh;
  overflow: hidden;
  // border: 1px solid red;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledCard = styled(Card)`
  width: 15vw;
  height: 50vh;
`

const StyledText = styled(Text)`
  font-size: small;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height: 6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`

export default DiaryCard
