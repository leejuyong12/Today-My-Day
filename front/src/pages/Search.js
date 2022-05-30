import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../components/Diary/SearchBar'
import SearchResult from '../components/Diary/SearchResult'
import TopLiked from '../components/Diary/TopLiked'
import TopWord from '../components/Diary/TopWord'
import { Row, Col, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Search() {
  const [optionBool, setOptionBool] = useState(false)
  const [option, setOption] = useState('word')
  const [keyword, setKeyword] = useState('')
  const [diaryList, setDiaryList] = useState([{}])
  const { me } = useSelector((state) => state.user)
  const navigate = useNavigate()

  // console.log('diaryList: ', diaryList)

  const onWrite = (word) => {
    navigate('/my/article', { state: word })
  }

  const onMove = () => {
    navigate('/search', { replace: true })
    setKeyword('')
  }

  return (
    <StyledContainer>
      <div className="search-bar" style={{ margin: '2rem auto 1rem auto', width: '90%' }}>
        <SearchBar
          optionBool={optionBool}
          setOptionBool={setOptionBool}
          option={option}
          setOption={setOption}
          keyword={keyword}
          setKeyword={setKeyword}
          diaryList={diaryList}
          setDiaryList={setDiaryList}
          me={me}
        />
      </div>
      {keyword === '' ? (
        <div>
          <TopWord
            keyword={keyword}
            setKeyword={setKeyword}
            diaryList={diaryList}
            setDiaryList={setDiaryList}
          />
          <TopLiked />
        </div>
      ) : (
        <div>
          {diaryList.length === 0 ? (
            <div>
              <h3>
                <strong>'{keyword}'</strong>에 대한 검색결과가 없습니다.
              </h3>

              <Button type="text" style={{ marginRight: '1rem' }} onClick={onMove}>
                처음으로
              </Button>
            </div>
          ) : (
            <SearchResult
              keyword={keyword}
              diaryList={diaryList}
              setDiaryList={setDiaryList}
              optionBool={optionBool}
            />
          )}
        </div>
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  background-color: #ffdae5;
  padding: 1rem;
  border: 2px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
`

export default Search
