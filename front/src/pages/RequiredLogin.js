import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'

function RequiredLogin() {
  const navigate = useNavigate()
  return (
    <StyledBackground>
      <div style={{ marginTop: '10%' }}>
        <h1>로그인이 필요한 페이지입니다.</h1>
        <StyledDangerBtn
          onClick={() => {
            navigate('/')
          }}>
          처음으로 이동하기
        </StyledDangerBtn>
      </div>
    </StyledBackground>
  )
}

const StyledBackground = styled.div`
  background-color: #fff;
  padding: 2%;
  height: 80vh;
  border-radius: 5px;
  border: 2px solid rgb(230, 230, 230);
`

const StyledDangerBtn = styled(Button)`
  &&& {
    background: #e86f8b;
    border-color: #e86f8b;
    color: #fff;
  }
`

export default RequiredLogin
