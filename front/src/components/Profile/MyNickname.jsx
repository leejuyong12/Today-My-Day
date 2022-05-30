import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Select } from 'antd'
import { useSelector } from 'react-redux'
const MyNick = styled.div`
  margin-top: 10%;
  text-align: left;
  margin-left: 25%;
`
function isLogin() {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

function MyNickName() {
  let navigate = useNavigate()
  const { me } = useSelector((state) => state.user)

  return <MyNick>닉네임 : {me !== null && me.nickname}</MyNick>
}
export default MyNickName
