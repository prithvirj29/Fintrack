import { useState } from "react";
import api from "../services/api";

function TransactionForm() {

    const [transaction, setTransaction] = useState({
        title: "",
        amount: "",
        type: "INCOME",
        category: "SALARY",
        date: "",
        description: ""
    });

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const saveTransaction = async () => {

        console.log(transaction);

        try {

            await api.post("/transactions", transaction);

            alert("Transaction Added Successfully");

            window.location.reload();

        } catch (error) {

            console.log(error.response.data);

        }
    };

    return (

        <div>

            <h2>Add Transaction</h2>

            <input
                name="title"
                placeholder="Title"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
            />

            <br /><br />

            <select
                name="type"
                value={transaction.type}
                onChange={handleChange}
            >
                <option value="INCOME">INCOME</option>
                <option value="EXPENSE">EXPENSE</option>
            </select>

            <br /><br />

            <select
                name="category"
                value={transaction.category}
                onChange={handleChange}
            >
                <option value="SALARY">SALARY</option>
                <option value="FOOD">FOOD</option>
                <option value="TRAVEL">TRAVEL</option>
                <option value="SHOPPING">SHOPPING</option>
                <option value="BILLS">BILLS</option>
                <option value="HEALTH">HEALTH</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                <option value="OTHER">OTHER</option>
            </select>

            <br /><br />

            <input
                type="date"
                name="date"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={saveTransaction}>
                Add Transaction
            </button>

        </div>

    );
}

export default TransactionForm;