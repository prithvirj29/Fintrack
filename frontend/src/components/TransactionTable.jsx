import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {

        try {

            const response = await api.get("/transactions");
            setTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/transactions/${id}`);

            alert("Transaction Deleted Successfully");

            loadTransactions();

        } catch (error) {

            console.log(error);

            alert("Failed to delete transaction.");

        }

    };

    const editTransaction = (transaction) => {

        alert("Edit Feature Coming Soon!\n\nTransaction: " + transaction.title);

    };

    return (

        <div>

            <h2>Transactions</h2>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {transactions.length > 0 ? (

                        transactions.map((t) => (

                            <tr key={t.id}>

                                <td>{t.title}</td>
                                <td>₹{t.amount}</td>
                                <td>{t.type}</td>
                                <td>{t.category}</td>
                                <td>{t.date}</td>
                                <td>{t.description}</td>

                                <td>

                                    <button
                                        onClick={() => editTransaction(t)}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No Transactions Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default TransactionTable;