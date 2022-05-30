import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ConsoleSqlOutlined, EditOutlined } from '@ant-design/icons'
import { getAxios } from '../../api'
import ImageFileInput from '../ImageFileInput'
import './MyPicture.css'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal, Avatar } from 'antd'
import { loadUserRequestAction } from '../../reducers/user'

const UpdateIcon = styled.div`
  margin-left: 120%;
`
const Submit = styled(Button)`
  margin-top: 10px;
`
const ChangeButton = styled(Button)`
  &&& {
    background: #fafafa;
    border-color: #f0f0f0;
    color: #e86f8b;
  }
`
const DeleteButton = styled(Button)`
  &&& {
    background: #e86f8b;
    border-color: #e86f8b;
    color: #fff;
  }
`
function MyPicture({ imageUploader, data }) {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const [form] = Form.useForm()
  const axios = getAxios()

  const [file2, setFile2] = useState({ fileName: null, fileURL: null })
  const formRef = useRef()
  const [editable, setEditable] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onFileChange = (file2) => {
    setFile2({
      fileName: file2.name,
      fileURL: file2.url,
    })
  }
  const [image, setImage] = useState({
    fileURL: '/images/기본사진.png',
  })
  const onFinish = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      file2.fileURL !== null &&
      (await axios.put(
        'user/modify',
        { image: file2.fileURL, age: me.age, gender: me.gender },
        { params: { userId: me.userId } },
      ))
    dispatch(loadUserRequestAction({ userId: me.userId }))
  }
  const onDelete = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      (await axios.put(
        'user/modify',
        { image: image.fileURL, age: me.age, gender: me.gender },
        { params: { userId: me.userId } },
      ))
    setFile2({ fileName: null, fileURL: null })
    dispatch(loadUserRequestAction({ userId: me.userId }))
    setEditable(!editable)
  }
  const success = () => {
    Modal.success({
      content: '사진 등록이 완료되었습니다.',
      okText: '확인',
    })
  }

  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    dispatch(loadUserRequestAction({ userId: me.userId }))
    setLoading(true)
  }
  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        loadMoreData(me.userId)
      }
    }
  }, [me])

  return (
    <div className="myPic">
      <UpdateIcon>
        <EditOutlined
          onClick={(e) => {
            setEditable(!editable)
          }}></EditOutlined>
      </UpdateIcon>
      {editable === false ? (
        <div>
          <div>
            <Avatar
              size={300}
              style={{ background: '#ccc', border: 'soild' }}
              icon={<img src={me !== null && me.image}></img>}></Avatar>
          </div>
        </div>
      ) : (
        <Form form={form} name="modify" onFinish={onFinish} autoComplete="off" layout="vertical">
          <Avatar
            size={300}
            icon={
              me.image !== null && (
                <ImageFileInput
                  name={file2.fileName}
                  imageUploader={imageUploader}
                  onFileChange={onFileChange}
                  file={file2}
                  // form={form}
                  data={data}
                  setFile={setFile2}
                />
              )
            }
          />{' '}
          <Form.Item>
            <DeleteButton type="danger" htmlType="submit" onClick={showModal}>
              삭제
            </DeleteButton>
            <Modal
              title="프로필 이미지 삭제"
              visible={isModalVisible}
              onOk={() => {
                onDelete()
                handleCancel()
              }}
              onCancel={handleCancel}
              okText="확인"
              cancelText="취소">
              <p>삭제하시겠습니까?</p>
            </Modal>
            <ChangeButton
              type="primary"
              htmlType="submit"
              onClick={() => {
                onFinish()
                success()
              }}>
              등록
            </ChangeButton>
          </Form.Item>{' '}
        </Form>
      )}
    </div>
  )
}

export default MyPicture
