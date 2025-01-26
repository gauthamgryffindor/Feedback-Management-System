import express from 'express'
import controller from '../controller/feedbackController.js'
const router=express.Router()

router.post('/feedbacks',controller.addFeedback)
router.get('/feedbacks',controller.getAllFeedback)
router.get('/feedbacks/:id',controller.getFeedbackById)
router.put('/feedbacks/:id',controller.editFeedback)
router.delete('/feedbacks/:id',controller.deleteFeedback)

export default router