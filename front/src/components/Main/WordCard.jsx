import './WordCard.css'
import React, { useState, useCallback, useEffect } from 'react'
import $, { data, get } from 'jquery'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  RedoOutlined,
  DownOutlined,
  HeartOutlined,
  PlusOutlined,
  ExclamationOutlined,
} from '@ant-design/icons'
import { Button, Row, Space } from 'antd'
import styled from 'styled-components'
import Zoom from 'react-reveal/Zoom'
import LightSpeed from 'react-reveal/LightSpeed'
import '../Diary/Comment.css'

const MainExplain = styled.h1`
  font-size: 3rem;
  color: #38532e;
  margin: 0;
  font-family: 'Cafe24';
`
const MainBack = styled.div`
  // background-color: pink;
  background-color: white;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  font-family: 'Cafe24';
`
const AllOpen = styled.div``

function WordCard() {
  const navigate = useNavigate()
  const { wordGet } = useSelector((state) => state.word)
  const [word, setWord] = useState([])

  const pageMove = (e) => {
    navigate('/my/article', { state: e.target.innerHTML })
  }
  const wordShuffle = () => {
    window.location.replace('/main')
  }

  $('.card').on('click', function () {
    $('.cardRotate').addClass('backRotate').removeClass('cardRotate')
    $(this).addClass('cardRotate').removeClass('backRotate')
  })

  for (let index = 0; index < 5; index++) {
    $(document).ready(function () {
      $('.envelope-wrapper .open' + index).click(function () {
        $('.card' + index).addClass('flap')
      })

      $('.envelope-wrapper .close' + index).click(function () {
        $('.card' + index).removeClass('flap')
      })
    })
  }

  $(document).ready(function () {
    $('.all').click(function () {
      $('.envelope-wrapper').addClass('flap')
    })
  })
  return (
    <>
      <MainBack>
        <Row justify="space-around" align="center" style={{ paddingTop: '1.5rem' }}>
          <Button type="disabled" style={{ width: '12rem' }}></Button>
          <MainExplain>오늘의 단어를 선택해보세요</MainExplain>
          <Space size={10}>
            <AllOpen className="all">
              <Button
                type="text"
                icon={<DownOutlined />}
                onClick={() => {
                  const audio = new Audio('/bgm/MP_Snap.mp3')
                  audio.play()
                }}>
                전체 열기
              </Button>
            </AllOpen>
            <Button type="text" icon={<RedoOutlined />} onClick={wordShuffle}>
              새로고침
            </Button>
          </Space>
        </Row>
        {wordGet != null
          ? wordGet.map((item, i) => (
              <Zoom key={i}>
                <div className="bg-wrapper">
                  <div className={'envelope-wrapper card' + i}>
                    <div className="envelope">
                      <div className="card">
                        <span className={'fa fa-close close-icon close' + i}>X</span>
                        <div className="text" style={{ cursor: 'pointer' }} onClick={pageMove}>
                          {item}
                        </div>
                      </div>
                    </div>
                    <div
                      className={'heart open' + i}
                      onClick={() => {
                        const audio = new Audio('/bgm/MP_Snap.mp3')
                        audio.play()
                      }}>
                      <ExclamationOutlined style={{ color: 'transparent' }} />
                    </div>
                  </div>
                </div>
              </Zoom>
            ))
          : null}
      </MainBack>
    </>
  )
}

export default WordCard
