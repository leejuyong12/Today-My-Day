import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const MyButton = styled(Button)`
  margin-bottom: 10px;
  width: 100%;
  &&& {
    background-color: #e86f8b;
    border: 0px solid;
  }
`

function LoginForm({ setIsModalVisible }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = (values) => {
    dispatch(
      loginRequestAction({ userId: values.userId, password: values.password, navigate, Modal }),
    )
  }

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  const pageMove = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical">
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Form.Item label="아이디" name="userId">
            <Input />
          </Form.Item>

          <Form.Item label="비밀번호" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <MyButton type="primary" htmlType="submit">
              로그인
            </MyButton>
            <div style={{ marginTop: '10px' }}>
              계정이 없으신가요?{'  '}
              <Link style={{ color: '#e86f8b' }} to="/user/signup" onClick={pageMove}>
                회원가입
              </Link>
            </div>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
