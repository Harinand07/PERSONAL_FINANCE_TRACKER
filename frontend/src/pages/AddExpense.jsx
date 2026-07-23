import React, { useState } from 'react';
import axios from 'axios';
import { expenseApi } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialExpenseState = {
    title: '',
    amount: '',
    category: '',
    date: '',
    description: ''
};

const AddExpense = () => {
    const [expense, setExpense] = useState(initialExpenseState);
    const { token } = useAuth();
    const navigate = useNavigate();

    function changeHandler(e) {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (!expense.title || !expense.amount || !expense.category || !expense.date) {
            alert('Please fill title, amount, category, and date');
            return;
        }

        try {
            await axios.post(expenseApi, {
                ...expense,
                amount: expense.amount === '' ? null : Number(expense.amount)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpense(initialExpenseState);
            navigate('/');
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    }

    return (
        <div>
            <h1 className="page-title">Add New Expense</h1>

            <form onSubmit={submitHandler} className="form-box">
                <input type="text" name="title" placeholder="Title" onChange={changeHandler} value={expense.title} />
                <input type="number" name="amount" placeholder="Amount (₹)" onChange={changeHandler} value={expense.amount} />

                <select name="category" onChange={changeHandler} value={expense.category}>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                </select>

                <input type="text" name="date" placeholder="Date (DD-MM-YYYY)" onChange={changeHandler} value={expense.date} />
                <textarea name="description" placeholder="Description (optional)" onChange={changeHandler} value={expense.description} />

                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
