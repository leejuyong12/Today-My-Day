import React from 'react'
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'

const Container = styled.div`
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyForm = styled.div`
  width: 300px;
  border
`

const Item = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #eea7bb;
`

function Login() {
  return (
    <Container>
      <MyForm>
        <Item>
          <LoginForm />
        </Item>
      </MyForm>
    </Container>
  )
}

export default Login
