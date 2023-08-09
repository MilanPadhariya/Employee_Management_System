const express=require('express');
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');
const router=express.Router();

router.post('/',userController.createUser);
router.get('/',authController.protectRoute,userController.getAllUsers);
router.post('/uploadfile',authController.protectRoute,userController.uploadProfileImg);
router.post('/assign/team/:id',authController.protectRoute,authController.restrictTo('director','team_lead','hr'),userController.assignTeam);

router.post('/login',authController.login);
router.get('/myProjects',authController.protectRoute,userController.myProjects);
router.post('/addSkill',authController.protectRoute,userController.addSkills);
router.get('/user-profile/:id',authController.protectRoute,userController.getUserDetails);

module.exports=router;