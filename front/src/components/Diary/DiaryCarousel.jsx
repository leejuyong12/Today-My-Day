import React, { useEffect } from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import DiaryCard from './DiaryCard'
import './Comment.css'
function onChange(a, b, c) {
  // console.log(a, b, c)
}

const MyCarousel = styled(Carousel)`
  > .slick-dots-bottom li button {
    height: 5px;
    border-radius: 3px;
  }

  > .slick-dots-bottom li button:before {
    display: none;
  }

  > .slick-dots {
    margin-right: 0;
    margin-left: 0;
  }
`

function DiaryCarousel({ diaryList }) {
  const rendering = () => {
    const result = []
    for (let index = 0; index < diaryList.length; index += 5) {
      const element = diaryList.slice(0 + index, 5 + index)
      const fiveCards = element.map((card) => {
        return <DiaryCard card={card} key={card.dno} />
      })

      result.push(
        <div className="card-area">
          <StyledCardlArea>{fiveCards}</StyledCardlArea>
        </div>,
      )
    }
    return result
  }

  return (
    <div className="carousel">
      {diaryList !== [] && (
        <MyCarousel
          afterChange={onChange}
          dotPosition="bottom"
          style={{ listStyle: 'none', overflow: 'hidden' }}>
          {rendering()}
        </MyCarousel>
      )}
    </div>
  )
}

const StyledCardlArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 55vh;
  // border: 1px solid rgba(50, 50, 50, 0.2);
`

export default DiaryCarousel
