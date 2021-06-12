import { Modal } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const RatingModal = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const user = useSelector(state => state.user)

    return (
        <>
          <div className="btn btn-danger float-right" onClick={() => setModalVisible(true)}>
           {user ? "Leave your rating" : "Login first"}
          </div>
          <Modal
          title="Leave Your Rating"
          centered
          visible={modalVisible}
          onOk={() => {
              setModalVisible(false)
              toast.success('Thanks for your review')
          }}
          onCancel={() => {
              setModalVisible(false)
          }}
          > {children} </Modal>  
        </>
    )
}

export default RatingModal
