const express = require('express')
const router = new express.Router()

const userController = require('../controller/userController')

router.post('/user/save',userController.save)
router.get('/hero/req',userController.getgrev)
router.delete('/hero/delete/:id',userController.deletegrev)
router.post('/hero/login',userController.login)

module.exports=router