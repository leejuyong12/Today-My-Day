import { getAxios } from '../../api'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewsTicker from 'react-advanced-news-ticker'
import styled from 'styled-components'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Row, Col, Button } from 'antd'
import WordTicker from './WordTicker'

const axios = getAxios()

function TopWord({ setKeyword, setDiaryList }) {
  const { me } = useSelector((state) => state.user)
  const [wordList, setWordList] = useState([])
  const [open, setOpen] = useState(false)

  const getWordList = async () => {
    try {
      let result = await axios.get('word/readTop', {
        params: { userId: me.userId },
      })
      // console.log('word-result: ', result.data)
      await setWordList([...result.data])
    } catch (err) {
      // console.log(err)
    }
  }

  const onClick = (word) => {
    // console.log(word)
    setKeyword(word)

    const getResult = async () => {
      let result = await axios.get('diary/searchallword', {
        params: { word: word },
      })
      // console.log('result: ', result)
      await setDiaryList([...result.data])
    }

    try {
      getResult()
    } catch (err) {
      // console.log(err)
    }
  }

  const onOpen = () => {
    setOpen(!open)
    // console.log(open)
  }

  const openRender = () => {
    const result = []
    for (let index = 0; index < wordList.length; index++) {
      result.push(
        <Row className={index} align="middle" onClick={(e) => onClick(wordList[index])}>
          <strong>
            <StyledNumber>{index + 1}</StyledNumber>
          </strong>
          <h3 style={{ margin: 0, cursor: 'pointer' }}>
            <strong>{wordList[index]}</strong>
          </h3>
        </Row>,
      )
    }
    return result
  }

  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        getWordList()
        // console.log(me)
      }
    }
  }, [me])

  return (
    <div
      className="word-top10-area"
      style={{
        background: '#FFFFFF',
        margin: '1rem auto',
        width: '90%',
        borderRadius: '3px',
        border: '1px solid rgba(50, 50, 50, 0.1)',
      }}>
      <Row justify="center" align="middle">
        <h2
          style={{
            textAlign: 'left',
            padding: '0.5em 0 0.2em 1em',
            color: '#424242',
          }}>
          <strong>나와 유사한 사용자가 선택한 단어는?😮</strong>
        </h2>
        {open === false ? (
          <Button type="text" icon={<DownOutlined />} onClick={onOpen} style={{ width: '110px' }}>
            펼쳐보기
          </Button>
        ) : (
          <Button type="text" icon={<UpOutlined />} onClick={onOpen} style={{ width: '110px' }}>
            접기
          </Button>
        )}
      </Row>

      <Row justify="center">
        {wordList.length === 10 ? (
          open === false ? (
            <WordTicker wordList={wordList} setKeyword={setKeyword} setDiaryList={setDiaryList} />
          ) : (
            <div style={{ marginBottom: '1.2rem' }}>{openRender()}</div>
          )
        ) : (
          <div>단어 리스트가 없습니다.</div>
        )}
      </Row>
    </div>
  )
}

const StyledNumber = styled.span`
  color: white;
  background-color: #e86f8b;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 5px;
  border-radius: 2px;
`
export default TopWord
