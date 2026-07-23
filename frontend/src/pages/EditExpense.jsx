import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { expenseApi } from '../services/api';
import axios from 'axios';

const EditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchExpense() {
            try {
                const res = await axios.get(`${expenseApi}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const exp = res.data.expense;
                setForm({
                    title: exp.title || '',
                    amount: exp.amount || '',
                    category: exp.category || '',
                    date: exp.date || '',
                    description: exp.description || ''
                });
            } catch (err) {
                setError('Failed to load expense');
            } finally {
                setLoading(false);
            }
        }
        fetchExpense();
    }, [id, token]);

    function changeHandler(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function updateHandler(e) {
        e.preventDefault();
        setError('');

        if (!form.title || !form.amount || !form.category || !form.date) {
            setError('Title, amount, category, and date are required');
            return;
        }

        try {
            await axios.put(`${expenseApi}/${id}`, {
                ...form,
                amount: form.amount === '' ? null : Number(form.amount)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            setError('Failed to update expense');
        }
    }

    if (loading) {
        return <div className="empty">Loading...</div>;
    }

    return (
        <div>
            <h1 className="page-title">Edit Expense</h1>

            <form onSubmit={updateHandler} className="form-box">
                {error && <p className="error">{error}</p>}

                <input type="text" name="title" placeholder="Expense Title" onChange={changeHandler} value={form.title} />
                <input type="number" name="amount" placeholder="Amount (₹)" onChange={changeHandler} value={form.amount} />

                <select name="category" onChange={changeHandler} value={form.category}>
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

                <input type="text" name="date" placeholder="Date (DD-MM-YYYY)" onChange={changeHandler} value={form.date} />
                <textarea name="description" placeholder="Description (optional)" onChange={changeHandler} value={form.description} />

                <div className="card-buttons">
                    <button type="submit">Update Expense</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditExpense;
