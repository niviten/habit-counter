const router = require('express').Router()
const { getHabits, getHabitByID, addHabit } = require('../controllers/habit')

router.get('/', getHabits)
router.get('/:habitID', getHabitByID)
router.post('/', addHabit)

module.exports = router
