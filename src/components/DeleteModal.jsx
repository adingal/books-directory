import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  min-width: 72px;
  margin: 0 4px;
`

function DeleteModal(props) {
  const { currentBook, modalState, setModalState, setDeleteBook } = props

  const handleModalState = (e) => {
    setModalState(false)
    setDeleteBook(e.target.dataset.action === 'yes' ? true : false)
  }

  return (
    <>
      <Modal isOpen={modalState} toggle={handleModalState}>
        <ModalHeader toggle={handleModalState}>Delete Book</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this book?</p>
          <p>
            <strong>Book Title: </strong>
            {currentBook?.title}
          </p>
        </ModalBody>
        <ModalFooter>
          <StyledButton
            data-action="yes"
            color="primary"
            onClick={handleModalState}
          >
            Yes
          </StyledButton>
          <StyledButton
            data-action="no"
            color="danger"
            onClick={handleModalState}
          >
            Cancel
          </StyledButton>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteModal
