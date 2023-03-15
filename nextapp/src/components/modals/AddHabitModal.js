import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddHabitModal({ showModal, handleHideModal }) {
  const [ habit, setHabit ] = useState({ habitName: '', habitDescription: '', isTimeBased: false })

  function handleChangeHabitName(event) {
    setHabit(previousValue => {
      return {
        ...previousValue,
        habitName: event.target.value
      }
    })
  }

  function handleChangeHabitDescription(event) {
    setHabit(previousValue => {
      return {
        ...previousValue,
        habitDescription: event.target.value
      }
    })
  }

  function handleChangeHabitIsTimeBased(event) {
    setHabit(previousValue => {
      return {
        ...previousValue,
        isTimeBased: event.target.checked
      }
    })
  }

  function addNewHabit() {
    console.log('habit', habit)
    handleModalClose()
  }

  function handleModalClose() {
    setHabit({
      habitName: '',
      habitDescription: '',
      isTimeBased: false
    })
    if (showModal) {
      handleHideModal()
    }
  }

  return <>
    <Modal
      size='lg'
      show={showModal}
      onHide={() => handleModalClose()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Habit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='newHabitForm.ControlInput1'>
            <Form.Control type='text' placeholder='Habit Name...' onChange={handleChangeHabitName}/>
          </Form.Group>
          <Form.Group className='mb-3' controlId='newHabitForm.ControlTextArea1'>
            <Form.Control as='textarea' rows={5} placeholder="Habit Description..." onChange={handleChangeHabitDescription}/>
          </Form.Group>
          <div className='mb-2'>
            <Form.Check type='checkbox' label='Is Time Based' onChange={handleChangeHabitIsTimeBased} />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={() => handleModalClose()}>Close</Button>
        <Button variant='dark' onClick={() => addNewHabit()}>Add</Button>
      </Modal.Footer>
    </Modal>
  </>
}
