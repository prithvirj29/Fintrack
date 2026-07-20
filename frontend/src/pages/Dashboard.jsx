import { useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import "../styles/dashboard.css";

function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);

    // Called whenever a new transaction is added
    const handleTransactionAdded = () => {
        setRefreshKey((previousValue) => previousValue + 1);
    };

    return (

        <div className="dashboard">

            <Navbar />

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>
                        <h1>Financial Dashboard</h1>

                        <p>
                            Track your income, expenses
                            and financial activity.
                        </p>
                    </div>

                </div>


                {/* Refresh when transaction is added */}

                <SummaryCards
                    refreshKey={refreshKey}
                />


                <Charts
                    refreshKey={refreshKey}
                />


                <section className="dashboard-section">

                    <h2>Add Transaction</h2>

                    <TransactionForm
                        onTransactionAdded={
                            handleTransactionAdded
                        }
                    />

                </section>


                <section className="dashboard-section">

                    <h2>Recent Transactions</h2>

                    <TransactionTable
                        refreshKey={refreshKey}
                    />

                </section>

            </main>

        </div>

    );
}

export default Dashboard;