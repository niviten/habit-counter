import AddHabitModal from '@/components/modals/AddHabitModal'
import fetchData from '@/helpers/fetchData'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

export default function Habits() {
  const [ loading, setLoading ] = useState(true)
  const [ showAddHabitModal, setShowAddHabitModal ] = useState(false)
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

    <AddHabitModal showModal={showAddHabitModal} handleHideModal={() => setShowAddHabitModal(false)}/>
  </>
}
