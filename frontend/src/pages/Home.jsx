import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { expenseApi } from '../services/api';

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    async function getExpensesData() {
        try {
            const response = await axios.get(expenseApi, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(response.data.expenses || []);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    useEffect(() => {
        if (token) {
            getExpensesData();
        }
    }, [token]);

    async function deleteHandler(expenseId) {
        try {
            await axios.delete(`${expenseApi}/${expenseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await getExpensesData();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    }

    function editHandler(expenseId) {
        navigate(`/editexpense/${expenseId}`);
    }

    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return (
        <div>
            {user && <h1 className="page-title">Welcome, {user.name}</h1>}

            <div className="dashboard-card">
                <h2>Dashboard</h2>
                <div className="dashboard-grid">
                    <div>
                        <p className="dashboard-label">Total Expenses</p>
                        <p className="dashboard-value">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="dashboard-label">Total Records</p>
                        <p className="dashboard-value">{expenses.length}</p>
                    </div>
                </div>
            </div>

            {expenses.length === 0 ? (
                <div className="empty">No expenses found. Add one!</div>
            ) : (
                expenses.map((item) => (
                    <div key={item._id} className="card">
                        <h2>{item.title}</h2>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Amount:</strong> ₹{item.amount}</p>
                        <p><strong>Date:</strong> {item.date}</p>
                        {item.description && <p><strong>Description:</strong> {item.description}</p>}

                        <div className="card-buttons">
                            <button type="button" onClick={() => editHandler(item._id)}>
                                Edit
                            </button>
                            <button type="button" onClick={() => deleteHandler(item._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
