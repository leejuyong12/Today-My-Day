import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import Fade from 'react-reveal/Fade'
import { Space, Button, Typography, Modal } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import LoginForm from '../LoginForm'
import { useSelector } from 'react-redux'

function LandingInfo() {
  const { me } = useSelector((state) => state.user)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [state, setState] = useState(null)
  const navigate = useNavigate()

  const showModal = () => {
    state === false ? setIsModalVisible(true) : navigate('/main')
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    me !== null ? setState(true) : setState(false)
  }, [me, setState])

  return (
    <>
      <StyledContainer>
        <Fade>
          <StyledTitle src={process.env.PUBLIC_URL + '/images/title-007.png'} />
        </Fade>
        <Fade right>
          <StyledImage>
            <img src={process.env.PUBLIC_URL + '/images/diary-3.PNG'} style={{ width: '100%' }} />
          </StyledImage>
        </Fade>
        <Fade left>
          <StyledSubTitle src={process.env.PUBLIC_URL + '/images/title-008.png'} />
          <StyledButton onClick={showModal}>시작하기</StyledButton>
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={350}
            footer={null}>
            <LoginForm />
          </Modal>
        </Fade>
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  position: relative;
  height: 40rem;
  overflow: hidden;
  background: #fff;
  // border: solid 1px black;
`

const StyledTitle = styled.img`
  position: absolute;
  top: -6rem;
  right: 0;
  bottom: 0;
  left: 4rem;
  width: 70rem;
`

const StyledImage = styled.div`
  position: absolute;
  top: 12rem;
  right: 0;
  bottom: 0;
  left: 44rem;
  width: 35rem;
  height: 23rem;
  overflow: hidden;
`

const StyledSubTitle = styled.img`
  position: absolute;
  top: -6.5rem;
  right: 0;
  bottom: 0;
  left: 4.5rem;
  width: 70rem;
`

const StyledButton = styled(Button)`
  position: absolute;
  top: 30.5rem;
  right: 0;
  bottom: 0;
  left: 10.5rem;
  width: 6rem;
  &&& {
    bacground: #fff;
    border-color: rgb(220, 220, 220);
    color: rgb(100, 100, 100);
  }
`

export default LandingInfo
