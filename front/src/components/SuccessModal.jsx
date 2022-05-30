import { Modal } from 'antd'

function SuccessModal({ visible, onOk, modalContent }) {
  return (
    <Modal title="Basic Modal" visible={visible} onOk={onOk}>
      <p>{modalContent}</p>
    </Modal>
  )
}

export default SuccessModal
