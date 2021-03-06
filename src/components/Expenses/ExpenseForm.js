import React, { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = ({ addExpense, expenseYears, toggleFormDisplay }) => {
    const initialState = {
        title: '',
        amount: '',
        date: '',
    }
    const [ input, setInput ] = useState({
        ...initialState,
    })
    const handleChange = (e) => {
        setInput((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }
    const handleSubmit = (e) => {
        const { date } = input
        const year = parseFloat(date.split('-')[0])
        const month = parseFloat(date.split('-')[1])
        const day = parseFloat(date.split('-')[2])
        e.preventDefault()
        setInput({
            ...initialState,
        })
        addExpense({
            desc: input.title,
            date: {
                year,
                month,
                day,
            },
            price: input.amount,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input name='title' type="text" value={input.title} onChange={handleChange} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input name='amount' type="number" min={0.01} step={0.01} value={input.amount} onChange={handleChange} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input name='date' type="date" min={`${Math.min.apply(null, expenseYears)}-01-01`} max={`${Math.max.apply(null, expenseYears)}-01-01`} value={input.date} onChange={handleChange} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type='submit'>Add Expense</button>
                <button onClick={toggleFormDisplay}>Close Form</button>
            </div>
        </form>
    )
}

export default ExpenseForm