const path = require('path')
const { select, insert } = require(path.join(__dirname, '..', 'helpers', 'database'))

async function getHabits(req, res) {
  const query = 'SELECT HABIT_ID, HABIT_NAME, IS_TIME_BASED from HCHabit ORDER BY HABIT_ID'
  try {
    const rows = await select(query)
    const habitIDs = []
    const habits = []
    rows.forEach(row => {
      habitIDs.push(row['HABIT_ID'])
      const habit = {}
      habit.habitID = row['HABIT_ID']
      habit.habitName = row['HABIT_NAME']
      habit.isTimeBased = row['IS_TIME_BASED'] === 1
      habits.push(habit)
    })
    res.status(200).send({ habits })
  } catch (err) {
    res.status(500).send(err)
  }
}

async function getHabitByID(req, res) {
  const { habitID } = req.params
  if (isNaN(habitID)) {
    res.status(400).send({ errorMessage: 'Habit ID is not a number' })
    return
  }
  const query = 'SELECT HC_HABIT_ID, HC_HABIT_NAME, HC_HABIT_DESCRIPTION from HCHabit WHERE HC_HABIT_ID = ?'
  const params = [ habitID ]
  try {
    const habit = await select(query, params)
    res.status(200).send({ habit })
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addHabit(req, res) {
  let { habitName, habitDescription, isTimeBased } = req.body

  if (!habitName) {
    res.status(400).send({
      errorMessage: 'Invalid Habit Name'
    })
    return
  }

  const isNewHabit = await isNewHabitName(habitName)
  if (!isNewHabit) {
    res.status(400).send({
      errorMessage: 'Habit Name Already Present'
    })
    return
  }

  if (!habitDescription) { habitDescription = '' }
  isTimeBased = isTimeBased ? 1 : 0

  try {
    const query = 'INSERT INTO HCHabit (HABIT_NAME, HABIT_DESCRIPTION, IS_TIME_BASED) VALUES (?, ?, ?)'
    const params = [ habitName, habitDescription, isTimeBased ]
    const habitID = await insert(query, params)
    res.status(200).send({ habitID, message: 'Successfully Inserted' })
  } catch (err) {
    res.status(500).send({ err })
  }
}


// helpers

async function isNewHabitName(habitName) {
  const query = 'SELECT COUNT(HABIT_ID) AS habitCount FROM HCHabit WHERE HABIT_NAME = ?'
  const params = [ habitName ]
  try {
    const rows = await select(query, params)
    return rows[0]['habitCount'] === 0
  } catch (err) {
    console.error(err)
  }
  return false
}


module.exports = { getHabits, getHabitByID, addHabit }
