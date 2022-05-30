import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'

function DeleteAccount() {
  const { me } = useSelector((state) => state.user)

  let navigate = useNavigate()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onClickDelete = async () => {
    await Modal.success({
      content: '회원탈퇴가 완료되었습니다.',
      okText: '확인',
    })
  }
  const getDelete = async () => {
    try {
      const axios = getAxios()
      let res = await axios.delete('user/delete', { params: { userId: me.userId } })
    } catch (err) {
      // console.log(err)
    }
  }
  const Refresh = () => {
    window.location.reload()
  }

  return (
    <div>
      <Button type="danger" onClick={handleShow}>
        회원탈퇴
      </Button>

      <Modal
        title="회원탈퇴"
        visible={show}
        onOk={() => {
          handleClose()
          getDelete()
          onClickDelete()
          localStorage.removeItem('jwtToken')
          navigate('/', { replace: true })
          Refresh()
        }}
        onCancel={handleClose}
        okText="확인"
        cancelText="취소">
        <p>회원탈퇴 하시겠습니까?</p>
      </Modal>
    </div>
  )
}

export default DeleteAccount
