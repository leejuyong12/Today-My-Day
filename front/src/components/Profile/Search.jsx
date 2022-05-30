import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Search = styled(Button)`
  margin-top: 5%;
  margin-right: 35%;
`
function SearchAll() {
  const navigate = useNavigate()

  const pageMove = () => {
    navigate(`/my/articleList`)
  }
  return (
    <div>
      <Search onClick={pageMove}>내 글목록 보기</Search>
    </div>
  )
}
export default SearchAll
