const express = require('express')
const router = express.Router()
const {addWord, deleteWord, getWords, getSingleWord} = require('../controllers/wordController')
const requireAuth = require('../middlewear/requireAuth')
router.use(requireAuth)

router.post('/add', addWord)

router.delete('/:id', deleteWord)

router.get('/', getWords)

router.get('/:id', getSingleWord)

module.exports = router