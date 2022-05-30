import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const Change = styled(Button)`
  margin-top: 5%;
`
function ProfileChange() {
  return <Change>프로필 수정</Change>
}
export default ProfileChange
