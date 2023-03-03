const router = require('express').Router()
const { getHabits, getHabitByID } = require('../controllers/habit')

router.get('/', getHabits)
router.get('/:habitID', getHabitByID)
// router.post('/', )

module.exports = router
