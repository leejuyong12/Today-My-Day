import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { List, message, Avatar, Tag } from 'antd'
import VirtualList from 'rc-virtual-list'
import { getAxios } from '../../api'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const MainLook = styled.div`
  margin-top: 5%;
  background-color: pink;
`
const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo'
const ContainerHeight = 400

function DiaryList(props) {
  const [data, setData] = useState([])
  const axios = getAxios()
  const navigate = useNavigate()

  const appendData = () => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results))
    //     message.success(`${body.results.length} more items loaded!`)
    //   })
    axios.get('/diary/').then((res) => {
      setData(res.data.dairies)
    })
  }

  useEffect(() => {
    appendData()
  }, [])

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData()
    }
  }

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
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
    <div>
      <MainLook>
        <List>
          <VirtualList data={data} height={ContainerHeight}>
            {(item) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                key={item.dno}
                onClick={(e) => {
                  pageMove(item.dno, e)
                }}>
                <List.Item.Meta
                  avatar={
                    <>
                      <Avatar src={item.image} />
                      <span style={{ marginLeft: '10px' }}>{item.nickname}</span>
                      <div>{timeForToday(item.createdat)}</div>
                    </>
                  }
                  title={<div>#{item.word}</div>}
                  description={
                    <p>
                      {item.content.length >= 50
                        ? item.content.substr(0, 50) + '...'
                        : item.content}
                    </p>
                  }
                />
                <div>
                  <div>
                    <EyeFilled /> {item.view}
                  </div>
                  <div>
                    <HeartFilled /> {item.liked}
                  </div>
                  <div>
                    <MessageFilled /> 0
                  </div>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </MainLook>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <Tag style={{ cursor: 'pointer' }} color="magenta" onClick={createdatSort}>
          최신순
        </Tag>
        <Tag style={{ cursor: 'pointer' }} color="green" onClick={viewSort}>
          조회수
        </Tag>
        <Tag style={{ cursor: 'pointer' }} color="purple" onClick={likedSort}>
          좋아요
        </Tag>
      </div>
    </div>
  )
}

export default DiaryList
