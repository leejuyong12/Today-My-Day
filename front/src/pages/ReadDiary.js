import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Image, Avatar, Row, Col } from 'antd'
import DiaryContent from '../components/Detail/DiaryContent'
import DiaryFooter from '../components/Detail/DiaryFooter'
import DiaryHeader from '../components/Detail/DiaryHeader'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../api'
import Comment from '../components/Diary/Comment'

// import { useSelector } from 'react-redux'

function MyDetail() {
  const axios = getAxios()
  const navigate = useNavigate()
  const { dno } = useParams()

  const [diary, setDiary] = useState({})

  const match = async () => {
    let result = await axios.get(`/diary/read/${dno}`)
    setDiary(result.data)
  }

  useEffect(() => {
    match()
  }, [])

  return (
    <StyledContainer>
      <Row>
        <Col span={12}>
          <StyledDiaryContainer>
            <StyledImageArea className="image-area">
              <Image src={diary.image} width="100%" height="100%" style={{ objectFit: 'cover' }} />
            </StyledImageArea>

            <StyledFormArea className="styled-form-area">
              <DiaryHeader diary={diary} />
              <DiaryContent diary={diary} />
              <DiaryFooter diary={diary} dno={dno} />
            </StyledFormArea>
          </StyledDiaryContainer>
        </Col>
        <Col span={12}>
          <StyledCmtyContainer>
            <Comment></Comment>
          </StyledCmtyContainer>
        </Col>
      </Row>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  background-color: #ffdae5;
  padding: 2%;
  border-radius: 5px;
`

const StyledCmtyContainer = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  padding: 5% 0;
`

const StyledDiaryContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  padding: 5% 0;
`

const StyledImageArea = styled.div`
  width: 80%;
  height: 25rem;
  // min-height: 20rem;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`

const StyledFormArea = styled.div`
  width: 80%;
  background: #ffe6f0;
  // background: #ffdae5;
  padding: 2rem;
  border-radius: 0 0 5px 5px;
  // border: 1px solid rgba(50, 50, 50, 0.2);
`

// const ReadComment = styled.div`
//     display: flex;
//     width: 100%
//     margin-top: 5%;
//     margin-bottom: 5%;

export default MyDetail
