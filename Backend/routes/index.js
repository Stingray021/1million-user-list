const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const logRouter = require('./logRouter')
const testRouter = require('./testRouter')


router.use('/user', userRouter)
router.use('/log', logRouter)
router.use('/test', testRouter)


module.exports = router