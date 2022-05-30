import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Gender = styled.div`
  margin-top: 5%;
  text-align: left;
  margin-left: 25%;
`
function MyGender() {
  // 비동기 처리 해야된다

  const { me } = useSelector((state) => state.user)
  const checkGender = () => {
    if (me != null && me.gender === 'male') {
      return '남'
    } else {
      return '여'
    }
  }
  return <Gender>성별 : {checkGender()}</Gender>
}
export default MyGender
