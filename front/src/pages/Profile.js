import React, { useEffect, useState } from 'react'
import MyPicture from '../components/Profile/MyPicture'
import MyNickName from '../components/Profile/MyNickname'
import MyAge from '../components/Profile/MyAge'
import MyGender from '../components/Profile/MyGender'
import PickWords from '../components/Profile/PickWords'
import Grass from '../components/Profile/Grass'
import Search from '../components/Profile/Search'
import { Col, Row } from 'antd'
import ImageUploader from '../service/image_uploader'
import { loadUserRequestAction } from '../reducers/user'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import MainProfile from '../components/Profile/MainProfile'
const imageUploader = new ImageUploader()

const Place = styled.div`
  padding: 2%;
  padding-right: 10%;
`

const Left = styled.div`
  padding: 2%;
`

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

function Profile() {
  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // const [data, setData] = useState({
  //   fileURL: '/images/기본이미지.jpg',
  // })

  return (
    <StyledBackground>
      <StyledContainer>
        <Row>
          <Col span={12}>
            <Left>
              {me !== null && (
                <MyPicture imageUploader={imageUploader} data={me !== null && me.image}></MyPicture>
              )}
              <MainProfile
                imageUploader={imageUploader}
                data={me !== null && me.image}></MainProfile>
            </Left>
          </Col>
          <Col span={12}>
            <Place>
              <PickWords></PickWords>
              <Grass></Grass>
            </Place>
          </Col>
        </Row>
      </StyledContainer>
    </StyledBackground>
  )
}
export default Profile
