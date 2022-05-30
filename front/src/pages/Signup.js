import React, { useState } from 'react'
import styled from 'styled-components'
import SignupForm from '../components/Signup/SignupForm'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Signup() {
  const [data, setData] = useState({
    fileURL: '/images/기본이미지.jpg',
  })

  return (
    <StyledContainer>
      <StyledFormArea className="styled-form-area">
        <SignupForm imageUploader={imageUploader} data={data} />
      </StyledFormArea>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
`

const StyledFormArea = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: 3px;
  width: 30%;
  padding: 1rem;
  margin: 3rem;
`

export default Signup
