import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Error(props) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])
  return <></>
}

export default Error
