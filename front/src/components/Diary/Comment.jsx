import React, { useEffect, useState } from 'react'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { Button, Modal } from 'antd'
import UpdateComments from './UpdateComments'
const CommentContent = styled.div`
  overflow: auto;
  max-height: 80vh;
`
const StyledButton = styled(Button)`
  &&& {
    bacground: #fff;
    border-color: rgb(220, 220, 220);
    color: rgb(100, 100, 100);
  }
`
const ReadComments = styled.div`
  // border: 1px solid red;
`
const WriteComment = styled.textarea`
  min-height: 70px;
  resize: none;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  border-color: rgba(100, 100, 100, 0.2);
`
const ReadComment = styled.div`
    display: flex;
    width: 100%
    margin-bottom: 5%;
    margin-top: 5%;
    // border: 1px solid blue;
`
const EnrollButton = styled.div`
  margin-right: 2%;
`
function Comment() {
  const { dno } = useParams()

  const { me } = useSelector((state) => state.user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const createComment = () => {
    const axios = getAxios()

    if (comment === '') {
      Modal.error({
        title: '댓글을 입력해주세요',
        okText: '확인',
      })
    } else if (comment !== '') {
      axios
        .post('comment', { content: comment, userId: me.userId }, { params: { dno: dno } })
        .then((res) => {
          setComment('')
          getComment()
        })
    }
  }
  const getComment = async () => {
    const axios = getAxios()

    axios
      .get(`diary/read/${dno}`, { params: { userId: me.userId } })
      .then((res) => {
        setComments([...res.data.comments])
      })
      .catch((err) => {
        Modal.error({
          title: '잘못된 접근입니다',
          okText: '확인',
        })
      })
  }

  useEffect(() => {
    me && getComment()
  }, [me])
  return (
    <StyledBackground>
      <ReadComment>
        <WriteComment
          placeholder="댓글을 입력해주세요..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}></WriteComment>
        <EnrollButton>
          <StyledButton
            variant="dark"
            size="sm"
            onClick={(e) => {
              createComment()
            }}>
            등록
          </StyledButton>
        </EnrollButton>
      </ReadComment>

      <CommentContent>
        <ReadComments>
          {comments.map((a) => {
            return (
              <UpdateComments
                key={a.cno}
                cno={a.cno}
                id={a.userId}
                profileImage={a.profileImage}
                nickname={a.nickname}
                content={a.content}
                createdat={a.createdat}
                getComment={getComment}></UpdateComments>
            )
          })}
        </ReadComments>
      </CommentContent>
    </StyledBackground>
  )
}

const StyledBackground = styled.div`
  background-color: #fff;
  padding: 2%;
  border-radius: 0 5px 5px 0;
  height: 100vh;
`

export default Comment
