import React, { useEffect, useState } from 'react'
import './App.css'
import { Button, Layout } from 'antd'
import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Search from './pages/Search'
import Navbar from './components/Layout/Navbar'
import Article from './pages/Article'
import ArticleList from './pages/ArticleList'
import Profile from './pages/Profile'
import ReadDiary from './pages/ReadDiary'
import ModifyDiary from './pages/ModifyDiary'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserRequestAction } from './reducers/user'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import RequiredLogin from './pages/RequiredLogin'

const { Content, Footer } = Layout
const audio = new Audio('/bgm/MP_분위기를 한잔.mp3')

const AudioButton1 = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.5);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 30px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #c1e17d;
  padding-top: 7px;
  padding-left: 6px;
`
const AudioButton2 = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.5);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 30px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #c1e17d;
  padding-top: 7px;
  padding-left: 6px;
`

function App() {
  const dispatch = useDispatch()
  const [state, setState] = useState(true)
  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    if (localStorage.getItem('jwtToken') != null) {
      const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
      const userId = decode_token.sub
      dispatch(loadUserRequestAction({ userId }))
    }
  }, [])

  const audioPlayer1 = () => {
    audio.play()
    setState(false)
  }
  const audioPlayer2 = () => {
    audio.pause()
    audio.currentTime = 0
    setState(true)
  }

  return (
    <Layout className="layout">
      <BrowserRouter>
        <Navbar />
        <StyledContent>
          <div className="App">
            <StyledContentArea>
              <Routes>
                {localStorage.getItem('jwtToken') !== null ? (
                  <>
                    <Route path="/" element={<Landing />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/my/article" element={<Article />} />
                    <Route path="/my/articleList" element={<ArticleList />} />
                    <Route path="/my/profile" element={<Profile />} />
                    <Route path="/diary/read/:dno" element={<ReadDiary />} />
                    <Route path="/diary/modify/:dno" element={<ModifyDiary />} />
                    <Route path="/*" element={<NotFound />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Landing />} />
                    <Route path="/*" element={<RequiredLogin />} />
                    <Route path="/user/signup" element={<Signup />} />
                  </>
                )}
              </Routes>
            </StyledContentArea>
          </div>
        </StyledContent>
        <Footer style={{ background: '#C1E17D', textAlign: 'center' }}>
          지금 나의 하루는 ©2022 Created by Ginny-us{' '}
        </Footer>
        {state ? (
          <AudioButton1 onClick={audioPlayer1}>
            <FaVolumeUp style={{ fontSize: '40px', cursor: 'pointer' }} />
          </AudioButton1>
        ) : (
          <AudioButton2 onClick={audioPlayer2}>
            <FaVolumeMute style={{ fontSize: '40px', cursor: 'pointer' }} />
          </AudioButton2>
        )}
      </BrowserRouter>
    </Layout>
  )
}

const StyledContent = styled(Content)`
  margin-top: 2rem;
  padding: 3rem;
  // border: 1px solid red;
  background-image: url('/images/background.PNG');
`

const StyledContentArea = styled.div`
  min-height: 80vh;
  padding: 1rem;
  // background: rgba(220, 220, 220, 1);
  // background: #fff;
  border-radius: 5px;
`

export default App
