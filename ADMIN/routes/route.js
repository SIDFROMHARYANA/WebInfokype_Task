const express = require('express');
const router = express.Router()
const tokencheck = require('../tokenverification')
const admincontroller = require('../controllers/admincontroller')
const blogcontroller=require('../controllers/blogcontroller')

router.post('/login',  admincontroller.adminLogin)
router.post('/register', admincontroller.adminRegister)

router.post('/blogcreate', tokencheck.verifyToken , blogcontroller.createblog)
router.get('/blogsget' , tokencheck.verifyToken ,blogcontroller.getblogs)
router.put('/blogs/title',tokencheck.verifyToken ,blogcontroller.updateBlog)
router.delete('/blogs/title', tokencheck.verifyToken, blogcontroller.deleteblog)
  

module.exports = router