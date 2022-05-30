import React from 'react'
import styled from 'styled-components'
import LandingInfo from '../components/Landing/LadingInfo'
import LandingImage from '../components/Landing/LandingImage'

function Landing(params) {
  return (
    <StyledContainer>
      <LandingImage />
      <LandingInfo />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding: 1rem;
  background: #fff;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
`

export default Landing
