import React, { useState } from 'react'
import { Row, Col, Button, Space, Modal } from 'antd'
import styled from 'styled-components'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const axios = getAxios()

function DiaryFooter({ diary, dno }) {
  const { me } = useSelector((state) => state.user)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const navigate = useNavigate()

  const handleModify = () => {
    navigate(`/diary/modify/${dno}`)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    deleteDiary()
    Modal.success({
      content: '글 삭제가 완료되었습니다.',
      okText: '확인',
      onOk: handleMove,
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const deleteDiary = async () => {
    await axios.delete(`diary/${dno}`, {
      params: { dno: dno, userId: me.userId },
    })
  }

  const handleMove = () => {
    navigate('/my/articleList')
  }

  const myList = (e) => {
    if (me.nickname === diary.nickname) {
      return <StyledPrimaryBtn onClick={handleMove}>내 글 목록</StyledPrimaryBtn>
    } else {
      return null
    }
  }

  const myBtn = (e) => {
    if (me.nickname === diary.nickname) {
      return (
        <Space size="middle">
          {/* <StyledPrimaryBtn type="text" onClick={handleModify}>
            수정
          </StyledPrimaryBtn>
          <StyledDangerBtn type="text" onClick={showModal}>
            삭제
          </StyledDangerBtn> */}
          <StyledPrimaryBtn onClick={handleModify}>수정</StyledPrimaryBtn>
          <StyledDangerBtn onClick={showModal}>삭제</StyledDangerBtn>
        </Space>
      )
    } else {
      return null
    }
  }

  return (
    <Row>
      <Col span={12}>
        <StyledStratContainer>{me !== null && myList()}</StyledStratContainer>
      </Col>
      <Col span={12}>
        <StyledEndContainer>{me !== null && myBtn()}</StyledEndContainer>
        <Modal
          title="글 삭제"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="확인"
          cancelText="취소">
          <p>해당 글을 삭제하시겠습니까?</p>
        </Modal>
      </Col>
    </Row>
  )
}

const StyledStratContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledEndContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const StyledPrimaryBtn = styled(Button)`
  &&& {
    background: #fafafa;
    border-color: #f0f0f0;
    color: #e86f8b;
  }
`
const StyledDangerBtn = styled(Button)`
  &&& {
    background: #e86f8b;
    border-color: #e86f8b;
    color: #fff;
  }
`

export default DiaryFooter
