import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../../api'
import ImageArticle from '../ImageArticle'

function ModifyForm({ imageUploader, data }) {
  const axios = getAxios()
  const navigate = useNavigate()
  const { me } = useSelector((state) => state.user)

  const formRef = useRef()
  const messageRef = useRef()
  const { word, content, fileURL } = data
  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const [copyContent, setCopyContent] = useState('')
  const { dno } = useParams()

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // console.log(copyContent)
    if (copyContent.length <= 300) {
      try {
        axios
          .put(
            `diary/${dno}`,
            {
              word: word,
              content: copyContent === '' ? content : copyContent,
              image: file.fileURL === null ? fileURL : file.fileURL,
            },
            {
              params: { dno: dno, userId: me.userId },
            },
          )
          .then(() => {
            navigate(`/diary/read/${dno}`, { replace: true })
          })
        // message.success('This is a success message')
      } catch (err) {
        // console.log(err)
      }
    } else {
      Modal.warning({
        title: '300자 이내로 입력가능합니다.',
        okText: '확인',
      })
    }
  }

  const onChange = (e) => {
    setCopyContent(e.target.value)
  }

  return (
    <form
      ref={formRef}
      style={{
        textAlign: 'center',
        width: '100%',
        height: '80vh',
        margin: '0 auto',
        padding: '20px',
      }}>
      <Wrapper className="wrapper">
        <Letter className="letter">
          <Side className="side">
            <Row className="row">
              <Col span={24}>
                <TitleWord>#{word}</TitleWord>
              </Col>
            </Row>
            <Row className="row">
              <Col span={12}>
                <ImageLayout>
                  <ImageArticle
                    name={file.fileName}
                    imageUploader={imageUploader}
                    onFileChange={onFileChange}
                    file={file}
                    data={data}
                    setFile={setFile}
                  />
                </ImageLayout>
              </Col>
              <Col span={12}>
                <MyTextarea
                  ref={messageRef}
                  name="message"
                  defaultValue={content}
                  onChange={onChange}></MyTextarea>
                <div style={{ textAlign: 'right' }}>
                  <Submit type="primary" onClick={onSubmit}>
                    등록
                  </Submit>
                </div>
              </Col>
            </Row>
          </Side>
        </Letter>
      </Wrapper>
    </form>
  )
}

const ImageLayout = styled.div`
  width: 100%;
  height: 20rem;
  display: inline-block;
  // background-color: #ffff;
  border-radius: 20px;
  padding: 0.5rem 1rem;
`

const Submit = styled(Button)`
  &&& {
    background-color: #e86f8b;
    border: 0px solid;
  }
  margin: 5px;
`

const Wrapper = styled.div`
  display: inline-block;
`
const Letter = styled.div`
  width: 80vw;
`

const Side = styled.div`
  vertical-align: middle;
  height: 8rem;
  background-color: #fcfcf8;
  border-radius: 10px;
  outline: 1px solid transparent;
  &:nth-of-type(1) {
    // padding: 2rem 2rem 0;
    padding: 2rem;
    box-shadow: inset 0 0.75rem 2rem rgba(229, 225, 187, 0.5);
    height: 100%;
  }
  &.side:nth-of-type(2) {
    padding: 2rem;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.05), inset 0 -0.57rem 2rem rgba(229, 225, 187, 0.5);
    text-align: right;
    height: 100%;
  }
`

const TitleWord = styled.h1`
  font-size: 3rem;
  font-family: 'GangwonEduSaeeum_OTFMediumA';
`

const MyTextarea = styled.textarea`
  line-height: 1.5rem;
  border: 0;
  outline: none;
  font-size: 2rem;
  font-family: 'GangwonEduSaeeum_OTFMediumA';
  appearance: none;
  color: #4e5e72;
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgb(229, 225, 187)' x='0' y='23' width='10' height='1'/></svg>");
  width: 98%;
  height: 20rem;
  resize: none;
  &:focus {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgba(78, 94, 114, 0.3)' x='0' y='23' width='10' height='1'/></svg>");
    outline: none;
  }
`

export default ModifyForm
