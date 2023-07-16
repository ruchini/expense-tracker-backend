import express, { Request, Response }  from 'express';
import { getExpenses, addExpense, updateExpense, removeExpense } from '../controllers/expensesController'

const router = express.Router();

// Add middleware for request body parsing
router.use(express.json());

router.use(express.urlencoded({ extended: true }));

// Get expenses
router.get('/expenses', getExpenses);

// Add expense
router.post('/expenses', addExpense);

// Update expense
router.put('/expenses/:id', updateExpense);

// Remove expense
router.delete('/expenses/:id', removeExpense);

export default router;
