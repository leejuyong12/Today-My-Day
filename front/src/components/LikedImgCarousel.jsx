import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { Card } from 'antd'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './Diary/Comment.css'
function LikedImgCarousel({ liked }) {
  const navigate = useNavigate()
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

  const [ImageIndex, setImageIndex] = useState(0)

  const settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  }

  const pageMove = (dno, e) => {
    navigate(`/diary/read/${dno}`)
  }

  return (
    <>
      <div className="Carousel">
        <StyledFont>좋아요 top5</StyledFont>
        <Slider {...settings}>
          {liked.map((item, idx) => (
            <div key={idx} className={idx === ImageIndex ? 'slide activeSlide' : 'slide'}>
              <Card
                style={{ width: '190px' }}
                hoverable
                onClick={(e) => {
                  pageMove(item.dno, e)
                }}>
                <div style={{ marginBottom: '10px' }}>{idx + 1}</div>
                {/* <div style={{ marginBottom: '10px' }}>
                  <img style={{ width: '150px' }} src={item.image} alt={item.image} />
                </div> */}
                <ImageLayout>
                  <StyledImageArea>
                    <img
                      style={{
                        width: '88%',
                        height: '88%',
                        objectFit: 'cover',
                        margin: '0',
                        borderRadius: '5px',
                      }}
                      src={item.image}
                      alt="content-image"
                    />
                  </StyledImageArea>
                </ImageLayout>
                <StyledTitle style={{ fontWeight: 'bold' }}>#{item.word}</StyledTitle>
                <span style={{ margin: '10px' }}>
                  <HeartFilled /> {item.liked}
                </span>
                <span style={{ margin: '10px' }}>
                  <EyeFilled /> {item.view}
                </span>
                <span style={{ margin: '10px' }}>
                  <MessageFilled /> {item.comments.length}
                </span>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

const ImageLayout = styled.div`
  width: 10rem;
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
const StyledTitle = styled.h3`
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  font-size: 20px;
`
const StyledFont = styled.h2`
  font-family: 'Cafe24';
`
export default LikedImgCarousel
