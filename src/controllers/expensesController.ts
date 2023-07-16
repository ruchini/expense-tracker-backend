import { Request, Response } from 'express';
import ExpenseModel from '../models/ExpenseModel';

// Get expenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await ExpenseModel.find();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: expenses
    });
  } catch (error) {
    console.error('Error getting expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add expense
export const addExpense = async (req: Request, res: Response) => {
  try {
    const { description, type, amount, date } = req.body;

    const newExpense = new ExpenseModel({
      description,
      type,
      amount,
      date,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json({
      status: 'success',
      code: 201,
      data: savedExpense
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update expense
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expenseId: string = req.params.id;
    const { description, type, amount, date } = req.body;

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      expenseId,
      { description, type, amount, date },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({
      status: 'success',
      code: 200,
      data: updatedExpense
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove expense
export const removeExpense = async (req: Request, res: Response) => {
  try {
    const expenseId: string = req.params.id;

    const deletedExpense = await ExpenseModel.findByIdAndDelete(
      expenseId
    );

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'Expense removed successfully'
    });
  } catch (error) {
    console.error('Error removing expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
