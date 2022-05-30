import React, { useEffect } from 'react'
import styled from 'styled-components'
import $ from 'jquery'
import Vara from 'vara'
import './diary.css'

function AllListDiary() {
  var winWidth = $(window).width()
  var ratio = winWidth / 1920
  var fontSize = {
    small: 12,
    medium: 14,
  }
  var played = [0, 0, 0]
  var vara = ['테스트 1', '테스트 2', '테스트 3']
  var bodyFontSize = Math.max(16 * ratio, 10)
  var posX = Math.max(80 * ratio, 30)
  $('body').css('font-size', bodyFontSize + 'px')
  fontSize.small = Math.max(fontSize.small * ratio, 7)
  fontSize.medium = Math.max(fontSize.medium * ratio, 10)

  const render = () => {
    let result = []
    for (let i of vara) {
      result.push(
        <div className="second paper">
          <div className="page front contents">
            <div id="vara-container">
              <h5>{i}</h5>
            </div>
          </div>
          <div className="page back"></div>
        </div>,
      )
    }
    return result
  }

  // vara.push('테스트 11111111111111111111111111111111111111111111111111111')
  // vara.push('테스트 2222')

  // vara[0] = new Vara(
  // vara.push(
  //   new Vara(
  //     '#vara-container',
  //     'https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json',
  //     [
  //       {
  //         text: '15 Jan 2019',
  //         textAlign: 'right',
  //         y: 20,
  //         x: -30,
  //         delay: 500,
  //         duration: 1500,
  //         fontSize: fontSize.small,
  //       },
  //       {
  //         text: 'Start the year with something cool.',
  //         y: 40,
  //         x: posX,
  //         duration: 4000,
  //       },
  //       {
  //         text: 'Like with a library,',
  //         id: 'sphinx',
  //         x: posX,
  //         delay: 1000,
  //         duration: 4500,
  //       },
  //       {
  //         text: '..... that can animate text writing',
  //         id: 'end',
  //         color: '#3f51b5',
  //         delay: 1000,
  //         x: posX,
  //         duration: 4500,
  //       },
  //     ],
  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     },
  //   ),
  // )
  // vara.push(
  //   new Vara(
  //     '#vara-container2',
  //     'https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json',
  //     [
  //       {
  //         text: '16 Jan 2019',
  //         textAlign: 'right',
  //         delay: 500,
  //         y: 20,
  //         x: -30,
  //         duration: 1500,
  //         fontSize: fontSize.small,
  //       },
  //       {
  //         text: 'Try to create something else.',
  //         y: 40,
  //         x: posX,
  //         duration: 4000,
  //       },
  //       {
  //         text: 'Like a diary or a todo list.',
  //         y: 40,
  //         x: posX,
  //         duration: 3500,
  //       },
  //     ],
  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     },
  //   ),
  // )
  // vara.push(
  //   new Vara(
  //     '#vara-container3',
  //     'https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json',
  //     [
  //       {
  //         text: '17 Jan 2019',
  //         textAlign: 'right',
  //         delay: 500,
  //         y: 20,
  //         x: -30,
  //         duration: 1500,
  //         fontSize: fontSize.small,
  //       },
  //       {
  //         text: 'Creating a Diary.',
  //         y: 40,
  //         x: posX,
  //         duration: 4000,
  //       },
  //       {
  //         text: 'View the library on,',
  //         y: 20,
  //         x: posX,
  //         duration: 3500,
  //       },
  //       {
  //         text: 'Github.',
  //         y: 10,
  //         color: '#3f51b5',
  //         id: 'link',
  //         x: posX,
  //         duration: 1500,
  //       },
  //     ],
  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     },
  //   ),
  // )
  const event = () => {
    $('.front:not(.last)').click(function () {
      var ix = $(this).parent('.paper').index()
      $('.book').addClass('open')
      $(this).parent('.paper').addClass('open')
      // if (!played[ix]) {
      //   vara[ix].playAll()
      //   vara[ix].animationEnd(function (i, o) {
      //     played[ix] = 1
      //     if (i == 'link') {
      //       var group = o.container
      //       var rect = vara[2].createNode('rect', {
      //         x: 0,
      //         y: 0,
      //         width: o.container.getBoundingClientRect().width,
      //         height: o.container.getBoundingClientRect().height,
      //         fill: 'transparent',
      //       })
      //       group.appendChild(rect)
      //       $(rect).css('cursor', 'pointer')
      //       $(rect).click(function () {
      //         console.log(true)
      //         document.querySelector('#link').click()
      //       })
      //     }
      //   })
      // }
    })
    $('.back').click(function () {
      if ($(this).parent('.paper').index() == 0) $('.book').removeClass('open')
      $(this).parent('.paper').removeClass('open')
    })
  }

  useEffect(() => {
    event()
  }, [])

  return (
    <>
      <div className="v-center"></div>
      <div id="container">
        <div className="book">
          <div className="first paper">
            <div className="page front contents">
              <div className="intro">
                <h2>DIARY</h2>
                <h1>2019</h1>
              </div>
            </div>
            <div className="page back"></div>
          </div>

          {render()}

          {/* <div className="second paper">
            <div className="page front contents">
              <div id="vara-container">
                <h5>{vara[0]}</h5>
              </div>
            </div>
            <div className="page back"></div>
          </div> */}

          {/* <div className="third paper">
            <div className="page front contents">
              <div id="vara-container2">
                <h5>{vara[1]}</h5>
              </div>
            </div>
            <div className="page back"></div>
          </div>

          <div className="fourth paper">
            <div className="page last front contents">
              <div id="vara-container3"></div>
            </div>
            <div className="page back"></div>
          </div> */}

          <div className="side"></div>
          <div className="bottom"></div>
          <div className="shadow"></div>
        </div>
      </div>
    </>
  )
}

const StyledCenter = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  width: 0;
`

const StyledContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`

const StyledBook = styled.div`
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(0deg) rotateZ(-45deg);
  transition: transform 1s;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 30em;
  height: 40em;
`

const StyledSide = styled.div`
  width: 3em;
  height: 40em;
  background: #b36060;
  position: absolute;
  left: -3em;
  top: 0;
  transform-origin: 100% 100%;
  transform: rotateY(-90deg) rotateX(0deg);
`
const StyledBottom = styled.div`
width: 25em;
height: 3em;
background: #e2e2e2;
position: absolute;
bottom: 0;
left: 0;
transform-origin: 100% 100%;
transform: rotateX(90deg);
}
`
const StyledShadow = styled.div`
  width: 25em;
  height: 40em;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  transform: translateZ(-3em);
  box-shadow: -1em 1em 0px 0px #ccc3a9;
  z-index: 1;
`

const StyledIntro = styled.div`
  position: absolute;
  width: 90%;
  width: calc(100% - 3em);
  height: 90%;
  height: calc(100% - 3em);
  border: 2em solid #eee;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`

const Title1 = styled.h1`
  padding: 0.5em 0.25em;
  font-size: 6em;
  color: #fff;
  word-break: break-all;
`
const Title2 = styled.h2`
  padding: 0.5em 0.5em;
  font-size: 2em;
  color: #fff;
  word-break: break-all;
  text-align: left;
  letter-spacing: 5px;
`

export default AllListDiary
