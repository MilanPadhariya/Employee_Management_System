const express= require('express');
const teamController=require('../controllers/teamController');
const authController=require('../controllers/authController');
const router=express.Router();

router.post('/',authController.protectRoute,authController.restrictTo('director'),teamController.createTeam);
router.get('/',authController.protectRoute,teamController.getAllTeams);

module.exports=router;