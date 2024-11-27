const express = require('express')
const router = new express.Router()

const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')


router.post('/user/save',userController.save)
router.get('/hero/req',jwtMiddleware,userController.getgrev)
router.delete('/hero/delete/:id',jwtMiddleware,userController.deletegrev)
router.post('/hero/login',userController.login)
module.exports=router