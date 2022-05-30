import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import ArticleListForm from '../components/ArticleListForm'
import { getAxios } from '../api'
import { useSelector } from 'react-redux'
import LikedImgCarousel from '../components/LikedImgCarousel'
import ViewImgCarousel from '../components/ViewmgCarousel'
import MyBook from '../components/ArticleList/MyBook'
import styled from 'styled-components'

function ArticleList(props) {
  const axios = getAxios()
  const { me } = useSelector((state) => state.user)
  const [liked, setLiked] = useState(null)
  const [view, setView] = useState(null)

  useEffect(() => {
    if (me !== null) {
      axios
        .get('/diary/mytopliked', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item)
          })
          setLiked(tmp)
        })
        .catch((err) => {
          // console.log(err)
        })
      axios
        .get('/diary/mytopview', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item)
          })
          setView(tmp)
        })
        .catch((err) => {
          // console.log(err)
        })
    }
  }, [me])

  return (
    <StyledBackground>
      <StyledContainer>
        <Row>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '0.5rem',
                height: '640px',
              }}>
              <MyBook />
            </div>
          </Col>
          <Col span={12}>
            <ArticleListForm />
          </Col>
        </Row>
        <Row style={{ height: '550px', marginTop: '-100px' }}>
          <Col span={12}>{liked !== null && <LikedImgCarousel liked={liked} />}</Col>
          <Col span={12}>{view !== null && <ViewImgCarousel view={view} />}</Col>
        </Row>
      </StyledContainer>
    </StyledBackground>
  )
}

const StyledBackground = styled.div`
  background-color: #ffdae5;
  padding: 2%;
  border-radius: 5px;
`

const StyledContainer = styled.div`
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
`

export default ArticleList
