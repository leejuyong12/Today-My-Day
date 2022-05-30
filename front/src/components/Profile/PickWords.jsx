import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAxios } from '../../api'
import Search from 'antd/lib/input/Search'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  articleListRequestAction,
  diarySearchWordRequestAction,
  mySearchWordRequestAction,
} from '../../reducers/article'
import MyWord from '../MyWord'

const { Option } = Select
const Words = styled.div`
  width: 100%;
  height: 350px;
  // background-color: rgb(238, 167, 187);
  background: #ffe6f0;
  text-align: left;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  margin-top: 3%;
  overflow: auto;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
`

function PickWords() {
  const axios = getAxios()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState(null)
  const [word, setWord] = useState(null)
  const { me } = useSelector((state) => state.user)

  const onSearch = (value) => {
    setKeyword(value)
    dispatch(
      mySearchWordRequestAction({
        userId: me.userId,
        word: value,
        searchKind: 'searchword',
        setData,
      }),
    )
  }

  const onChange = (e) => {
    e.target.value === '' &&
      axios.get(`/diary/myword`, { params: { userId: me.userId } }).then((res) => {
        setWord(res.data)
      })
  }

  useEffect(() => {
    me !== null &&
      axios.get(`/diary/myword`, { params: { userId: me.userId } }).then((res) => {
        setWord(res.data)
      })
  }, [me])

  return (
    <div>
      <Words>
        내가 선택한 단어 <hr />
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <Search
            placeholder="검색어를 입력하세요..."
            allowClear
            onSearch={onSearch}
            onChange={onChange}
          />
        </div>
        <hr />
        <MyWord data={data} keyword={keyword} setWord={setWord} word={word} />
      </Words>
    </div>
  )
}
export default PickWords
