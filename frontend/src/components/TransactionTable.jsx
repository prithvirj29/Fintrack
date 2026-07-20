import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable({ refreshKey }) {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTransactions = async () => {

        try {

            setLoading(true);

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.error(
                "Error loading transactions:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadTransactions();

    }, [refreshKey]);


    const deleteTransaction = async (id) => {

        try {

            await api.delete(
                `/transactions/${id}`
            );

            alert(
                "Transaction Deleted Successfully"
            );

            // Immediately refresh table
            loadTransactions();

        } catch (error) {

            console.error(
                "Error deleting transaction:",
                error
            );

            alert(
                "Failed to delete transaction"
            );

        }

    };


    if (loading) {

        return (
            <p>
                Loading transactions...
            </p>
        );

    }


    return (

        <div className="transaction-table-container">

            <table className="transaction-table">

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {transactions.length > 0 ? (

                        transactions.map((t) => (

                            <tr key={t.id}>

                                <td>
                                    {t.title}
                                </td>

                                <td>
                                    ₹{t.amount}
                                </td>

                                <td>
                                    {t.type}
                                </td>

                                <td>
                                    {t.category}
                                </td>

                                <td>
                                    {t.date}
                                </td>

                                <td>
                                    {t.description}
                                </td>

                                <td>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            deleteTransaction(
                                                t.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center"
                                }}
                            >
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