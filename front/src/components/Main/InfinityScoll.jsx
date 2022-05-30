import { Avatar, Divider, List, Skeleton, Tag, Row, Col, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'
import '../Diary/Comment.css'
import moment from 'moment'

const MainLook = styled.div`
  margin-top: 1.5rem;
  background-color: white;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 5px;
`
const ImageLayout = styled.div`
  width: 15rem;
  height: 10rem;
  display: inline-block;
  border-radius: 20px;
  padding: 0.5rem 0;
`

const StyledImageArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
`

const StyledFont = styled.h3`
  font-family: 'Noto Sans Korean Medium';
`
const StyledContent = styled.p`
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  font-size: 20px;
`

const StyledTitle = styled.h1`
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  font-size: 25px;
`

const PAGE_NUMBER = 1

function InfinityScoll(props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(PAGE_NUMBER)
  const axios = getAxios()
  const navigate = useNavigate()

  const max = Number.MAX_SAFE_INTEGER

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(`http://k6c205.p.ssafy.io:8080/api/diary/paging?page=${page}`)
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
    loadMoreData()
  }, [])

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

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
    })
  }

  return (
    <>
      <MainLook>
        <Row>
          <Col span={12}>
            <div style={{ padding: '1rem 2rem', textAlign: 'left' }}>
              <StyledFont style={{ margin: 0 }}>전체 글 보기</StyledFont>
            </div>
          </Col>
          <Col span={12}>
            {/* <div style={{ padding: '1rem', textAlign: 'right' }}>
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
          </Col>
        </Row>
        <div
          id="scrollableDiv"
          style={{
            height: '570px',
            overflow: 'auto',
            padding: '0 16px',
            // border: '1px solid rgba(140, 140, 140, 0.35)',
            border: '1px solid rgba(200, 200, 200, 0.35)',
          }}>
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < max}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>마지막 글입니다 🤐</Divider>}
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
                  <div
                    style={{
                      width: '100%',
                      height: '160px',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}>
                    <ImageLayout>
                      <StyledImageArea>
                        <img
                          src={item.image}
                          alt="content_image"
                          width="100%"
                          height="100%"
                          style={{ objectFit: 'cover' }}
                        />
                      </StyledImageArea>
                    </ImageLayout>
                    <Space
                      direction="vertical"
                      size={1}
                      style={{ display: 'flex', justifyContent: 'center', width: '40rem' }}>
                      <StyledTitle style={{ fontWeight: 'bold' }}>#{item.word}</StyledTitle>
                      <StyledContent>
                        {item.content.length >= 120
                          ? item.content.substr(0, 120) + '...'
                          : item.content}
                      </StyledContent>
                      <StyledTime>{timeForToday(item.createdat)}</StyledTime>
                    </Space>

                    <Space
                      direction="vertical"
                      size={1}
                      style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <img
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                          src={item.profileImage}
                          alt="profile"
                        />
                        <span>{item.nickname}</span>
                      </div>
                      <div>
                        <span style={{ marginRight: '10px' }}>
                          <HeartFilled style={{ fontSize: '1rem' }} />{' '}
                          <span style={{ fontSize: '1rem' }}>{item.liked}</span>
                        </span>
                        <span style={{ marginRight: '10px' }}>
                          <EyeFilled style={{ fontSize: '1rem' }} />{' '}
                          <span style={{ fontSize: '1rem' }}>{item.view}</span>
                        </span>
                        <span>
                          <MessageFilled style={{ fontSize: '1rem' }} />{' '}
                          <span style={{ fontSize: '1rem' }}>{item.comments.length}</span>
                        </span>
                      </div>

                      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledFlexEnd>
                          <HeartFilled style={{ fontSize: '1rem' }} />
                        </StyledFlexEnd>
                        <StyledFlexStart>
                          <span style={{ fontSize: '1rem' }}>{item.liked}</span>
                        </StyledFlexStart>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledFlexEnd>
                          <EyeFilled style={{ fontSize: '1rem' }} />
                        </StyledFlexEnd>
                        <StyledFlexStart>
                          <span style={{ fontSize: '1rem' }}>{item.view}</span>
                        </StyledFlexStart>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledFlexEnd>
                          <MessageFilled style={{ fontSize: '1rem' }} />
                        </StyledFlexEnd>
                        <StyledFlexStart>
                          <span style={{ fontSize: '1rem' }}>{item.comments.length}</span>
                        </StyledFlexStart>
                      </div> */}
                    </Space>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </MainLook>
    </>
  )
}

const StyledFlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 5rem;
  padding-right: 0.2rem;
`

const StyledFlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 5rem;
  padding-left: 0.2rem;
`
const StyledTime = styled.div`
  font-size: 10px;
`
export default InfinityScoll
