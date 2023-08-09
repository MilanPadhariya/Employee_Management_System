const express=require('express');

const leaveController= require('../controllers/leaveController');
const authController=require('../controllers/authController');

const router=express.Router();

router.post('/',authController.protectRoute,leaveController.createLeave);
router.get('/',authController.protectRoute,leaveController.getMyLeaves);
router.get('/approved',authController.protectRoute,leaveController.getMyApprovedLeaves);
router.get('/unapproved',authController.protectRoute,leaveController.getMyUnapprovedLeaves);
router.get('/pending',authController.protectRoute,leaveController.getMypendingLeaves);

router.get('/approve',authController.protectRoute,authController.restrictTo('team_lead','hr'),leaveController.getUnapprovedLeaves);
router.post('/approve/:id',authController.protectRoute,authController.restrictTo('team_lead','hr'),leaveController.approveLeave);
router.get('/employee/:id',authController.protectRoute,authController.restrictTo('team_lead','hr','director'),leaveController.getLeavesOfEmployee);

module.exports=router;