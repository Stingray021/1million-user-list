const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/get-users', testController.getUsers)
router.get('/get-total', testController.getTotalCount)
module.exports = router