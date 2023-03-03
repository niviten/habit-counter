import fetchData from '@/helpers/fetchData'
import { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'

export default function Habits() {
  const [ loading, setLoading ] = useState(true)
  const [ showAddHabitModal, setShowAddHabitModal ] = useState(false)
  const [ newHabit, setNewHabit ] = useState(null)
  const [ habits, setHabits ] = useState([])

  
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchData('/api/v1/habit', null, 'GET')
        setHabits(response.habits)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    setLoading(true)
    getData()
  }, [])


  function handleChangeNewHabit(event) {
    setNewHabit(event.target.value)
  }
  
  function addNewHabit() {
    console.log(newHabit)
    setShowAddHabitModal(false)
  }


  return <>
    <br />
    <div className='row'>
      <div className='col-md-6'>
        <h3>Habits</h3>
      </div>
      <div className='col-md-6'>
        <Button
          variant='dark'
          style={{ float: 'right' }}
          onClick={() => setShowAddHabitModal(true)}
        >
          Add Habit
        </Button>
      </div>
    </div>
    <hr />

    {loading
      ? <h3>Loading</h3>
      : <Table striped bordered hover>
        <thead className='table-dark'>
          <tr>
            <th>ID</th>
            <th>Habit</th>
            <th>Count</th>
            <th>Last done on</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => {
            return <tr key={index}>
              <td>{habit.habitID}</td>
              <td>{habit.habitName}</td>
              <td>{habit.habitDoneCount}</td>
              <td>{habit.habitLastDoneOn}</td>
            </tr>
          })}
        </tbody>
      </Table>
    }

    <Modal
      size='lg'
      show={showAddHabitModal}
      onHide={() => setShowAddHabitModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Habit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='newHabitForm.ControlInput1'>
            <Form.Control type='text' placeholder='Habit Name...' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='newHabitForm.ControlTextArea1'>
            <Form.Control as='textarea' rows={5} placeholder="Habit Description..." />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={() => setShowAddHabitModal(false)}>Close</Button>
        <Button variant='dark' onClick={() => addNewHabit()}>Add</Button>
      </Modal.Footer>
    </Modal>
  </>
}
