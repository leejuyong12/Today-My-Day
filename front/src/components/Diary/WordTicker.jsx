import NewsTicker from 'react-advanced-news-ticker'
import styled from 'styled-components'
import { getAxios } from '../../api'

const axios = getAxios()

function WordTicker({ wordList, setKeyword, setDiaryList }) {
  const onClick = (word) => {
    setKeyword(word)

    const getResult = async () => {
      let result = await axios.get('diary/searchallword', {
        params: { word: word },
      })
      await setDiaryList([...result.data])
    }

    try {
      getResult()
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <NewsTicker
      rowHeight={24}
      rowWidth={100}
      maxRows={1}
      speed={600}
      duration={4000}
      autoStart={true}
      pauseOnHover={true}
      style={{
        width: '200px',
        height: '24px',
        padding: '0 1%',
        background: 'white',
        borderRadius: '0 0 3px 3px ',
        fontFamily: 'Noto Sans KR',
        listStyleType: 'none',
        listStyle: 'none',
      }}>
      <StyledDiv onClick={(e) => onClick(wordList[0])}>
        <strong>
          <StyledNumber>1</StyledNumber>
          {wordList[0]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[1])}>
        <strong>
          <StyledNumber>2</StyledNumber>
          {wordList[1]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[2])}>
        <strong>
          <StyledNumber>3</StyledNumber>
          {wordList[2]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[3])}>
        <strong>
          <StyledNumber>4</StyledNumber>
          {wordList[3]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[4])}>
        <strong>
          <StyledNumber>5</StyledNumber>
          {wordList[4]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[5])}>
        <strong>
          <StyledNumber>6</StyledNumber>
          {wordList[5]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[6])}>
        <strong>
          <StyledNumber>7</StyledNumber>
          {wordList[6]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[7])}>
        <strong>
          <StyledNumber>8</StyledNumber>
          {wordList[7]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[8])}>
        <strong>
          <StyledNumber>9</StyledNumber>
          {wordList[8]}
        </strong>
      </StyledDiv>

      <StyledDiv onClick={(e) => onClick(wordList[9])}>
        <strong>
          <StyledNumber>10</StyledNumber>
          {wordList[9]}
        </strong>
      </StyledDiv>
    </NewsTicker>
  )
}

const StyledDiv = styled.div`
  padding: 0.1rem;
`

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

export default WordTicker
