import React, { useState } from 'react'
import { Row, Col, Typography } from 'antd'
import styled from 'styled-components'
import '../Diary/Comment.css'
const { Text } = Typography

function DiaryContent({ diary }) {
  const [content, setContent] = useState('')

  // setContent(me.dairies[])
  return (
    <Row>
      <Col span={24}>
        <StyledContainer>
          <Text level={5}>{diary.content}</Text>
        </StyledContainer>
      </Col>
    </Row>
  )
}

const StyledContainer = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 1rem 0;
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  font-size: 20px;
`

export default DiaryContent
