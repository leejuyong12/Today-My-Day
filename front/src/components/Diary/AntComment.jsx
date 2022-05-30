import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'

const { TextArea } = Input

function AntComment() {
  const { me } = useSelector((state) => state.user)

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  )

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} style={{ width: '400px' }} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  )

  const [state, setState] = React.useState({
    comments: [],
    submitting: false,
    value: '',
  })

  const handleSubmit = () => {
    if (!state.value) {
      return
    }

    setState({
      ...state,
      submitting: true,
    })

    setTimeout(() => {
      setState({
        submitting: false,
        value: '',
        comments: [
          ...state.comments,
          {
            author: me.nickname,
            avatar: me.image,
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      })
    }, 1000)
  }

  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    })
  }

  return (
    <>
      <Comment
        avatar={<Avatar src={me.image} alt={me.nickname} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={state.submitting}
            value={state.value}
          />
        }
      />

      {state.comments.length > 0 && <CommentList comments={state.comments} />}
    </>
  )
}
export default AntComment
