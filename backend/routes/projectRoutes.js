const express= require('express');
const projectController=require('../controllers/projectController');
const authController=require('../controllers/authController');
const router=express.Router();

router.post('/',authController.protectRoute,authController.restrictTo('director','team_lead'),projectController.createProject);
router.get('/',authController.protectRoute,authController.restrictTo('director','team_lead'),projectController.getAllProjects);
router.post('/module/assign/:id',authController.protectRoute,authController.restrictTo('director','team_lead'),projectController.userAssign);
router.get('/details/:id',authController.protectRoute,projectController.getProjectDetails);
router.post('/add-module/:id',authController.protectRoute,projectController.addModule);

module.exports=router;