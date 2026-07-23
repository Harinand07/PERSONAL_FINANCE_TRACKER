import Expense from '../models/expense.js'

const createExpense = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body

        if (!title || !amount || !category || !date) {
            return res.status(400).json({
                message: 'title, amount, category, and date are required'
            })
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            date,
            description,
            userId: req.user._id
        })

        res.status(201).json({
            success: true,
            message: 'expense created successfully...',
            expense
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'expense has not created',
            error
        })
    }
}

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            expenses
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error occurred while fetching expenses',
            error
        })
    }
}

const getExpenseById = async (req, res) => {
    try {
        const { expenseid } = req.params

        const expense = await Expense.findOne({ _id: expenseid, userId: req.user._id })
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'expense not found or unauthorized'
            })
        }

        res.status(200).json({
            success: true,
            expense
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error occurred while fetching expense',
            error
        })
    }
}

const updateExpense = async (req, res) => {
    try {
        const { expenseid } = req.params
        const { title, amount, category, date, description } = req.body

        if (!expenseid) {
            return res.status(400).json({
                success: false,
                message: 'expenseid not found!!'
            })
        }

        const expense = await Expense.findOne({ _id: expenseid, userId: req.user._id })
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'expense not found or unauthorized'
            })
        }

        const updateData = {}
        if (title !== undefined) updateData.title = title
        if (amount !== undefined) updateData.amount = amount
        if (category !== undefined) updateData.category = category
        if (date !== undefined) updateData.date = date
        if (description !== undefined) updateData.description = description

        const updatedExpense = await Expense.findByIdAndUpdate(expenseid, updateData, { returnDocument: 'after' })

        res.status(200).json({
            success: true,
            message: 'expense updated successfully',
            updatedExpense
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error occurred while updating expense',
            error
        })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { expenseid } = req.params

        const expense = await Expense.findOne({ _id: expenseid, userId: req.user._id })
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'expense not found or unauthorized'
            })
        }

        const deletedExpense = await Expense.findByIdAndDelete(expenseid)
        res.status(200).json({
            success: true,
            message: 'expense deleted successfully',
            deletedExpense
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error occurred while deleting expense',
            error
        })
    }
}

export { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense }
