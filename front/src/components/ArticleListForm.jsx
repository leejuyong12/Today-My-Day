import 'moment/locale/ko'
import moment from 'moment'
import { Avatar, Select, Tag } from 'antd'
import { getAxios } from '../api'
import Search from 'antd/lib/input/Search'
import { useNavigate } from 'react-router-dom'
import { List, Skeleton, Divider } from 'antd'
import ArticleListItem from './ArticleListItem'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  articleListRequestAction,
  diarySearchWordRequestAction,
  diarySearchContentRequestAction,
} from '../reducers/article'
import styled from 'styled-components'

const { Option } = Select
const PAGE_NUMBER = 1

function ArticleListForm(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [page, setPage] = useState(PAGE_NUMBER)
  const [loading, setLoading] = useState(false)
  const { me } = useSelector((state) => state.user)
  const [searchKind, setSearchKind] = useState('searchword')
  const axios = getAxios()

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(`http://k6c205.p.ssafy.io:8080/api/diary/mypaging?page=${page}&userId=${me.userId}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.content])
        setPage(page + 1)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    me !== null && loadMoreData()
  }, [me])

  const onSearch = (value) => {
    searchKind === 'searchword'
      ? dispatch(
          diarySearchWordRequestAction({ userId: me.userId, word: value, searchKind, setData }),
        )
      : dispatch(
          diarySearchContentRequestAction({
            userId: me.userId,
            keyword: value,
            searchKind,
            setData,
          }),
        )
  }

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
    })
  }

  function handleChange(value) {
    setSearchKind(value)
  }

  const onChange = (e) => {
    e.target.value === '' &&
      fetch(`http://k6c205.p.ssafy.io:8080/api/diary/mypaging?page=1&userId=${me.userId}`)
        .then((res) => res.json())
        .then((body) => {
          setData([...body.content])
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
  }

  function timeForToday(value) {
    let tData = new Date(value)
    tData.setHours(tData.getHours() + 9)
    const today = new Date()
    const timeValue = new Date(tData)

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
    if (betweenTime < 1) return '방금 전'
    if (betweenTime < 60) {
      return `${betweenTime}분 전`
    }

    const betweenTimeHour = Math.floor(betweenTime / 60)
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
    if (betweenTimeDay < 8) {
      return `${betweenTimeDay}일 전`
    }

    return `${moment(value).format('YYYY-MM-DD hh:mm')}`
  }

  const viewSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => b.view - a.view)
    setData(tmp)
  }

  const likedSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => b.liked - a.liked)
    setData(tmp)
  }

  const createdatSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
    setData(tmp)
  }

  return (
    <div style={{ width: '100%', marginTop: '1rem' }}>
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <Select
          defaultValue="단어"
          size="large"
          onChange={handleChange}
          style={{ float: 'left', width: '19%', marginRight: '5px' }}>
          <Option value="searchword">단어</Option>
          <Option value="searchcontent">내용</Option>
        </Select>
        <Search
          placeholder="검색어를 입력하세요..."
          allowClear
          size="large"
          style={{ width: '80%' }}
          onSearch={onSearch}
          onChange={onChange}
        />
      </div>

      <MainLook>
        {/* <div
          style={{
            padding: '1rem',
            textAlign: 'right',
          }}>
          <Tag style={{ cursor: 'pointer' }} color="magenta" onClick={createdatSort}>
            최신순
          </Tag>
          <Tag style={{ cursor: 'pointer' }} color="green" onClick={viewSort}>
            조회수
          </Tag>
          <Tag style={{ cursor: 'pointer' }} color="purple" onClick={likedSort}>
            좋아요
          </Tag>
        </div> */}

        <div
          id="scrollableDiv"
          style={{
            height: '500px',
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(200, 200, 200, 0.5)',
            borderRadius: '0 0 5px 5px',
          }}>
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 100}
            scrollableTarget="scrollableDiv">
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  key={item.id}
                  onClick={(e) => {
                    pageMove(item.dno, e)
                  }}>
                  <ArticleListItem
                    picture={item.image}
                    title={item.word}
                    content={item.content}
                    comment={item.comments.length}
                    view={item.view}
                    liked={item.liked}
                    createdat={timeForToday(item.createdat)}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </MainLook>
    </div>
  )
}

const MainLook = styled.div`
  margin-top: 1.5rem;
  background-color: white;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 5px;
`

export default ArticleListForm
