import express from 'express'
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from '../controllers/expenseController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/expense', authMiddleware, createExpense)
router.get('/expense', authMiddleware, getExpenses)
router.get('/expense/:expenseid', authMiddleware, getExpenseById)
router.put('/expense/:expenseid', authMiddleware, updateExpense)
router.delete('/expense/:expenseid', authMiddleware, deleteExpense)

export default router
