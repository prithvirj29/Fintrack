import { useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";

import "../styles/dashboard.css";

function Dashboard() {

    // Whenever this number changes,
    // dashboard components fetch fresh data.
    const [refreshKey, setRefreshKey] = useState(0);


    // Called after Add / Edit / Delete
    const refreshDashboard = () => {

        setRefreshKey((previous) => previous + 1);

    };


    return (

        <div className="dashboard">

            <Navbar />


            <main className="dashboard-content">


                {/* =========================
                    DASHBOARD HEADER
                ========================= */}

                <div className="dashboard-header">

                    <div>

                        <h1>
                            Financial Dashboard
                        </h1>

                        <p>
                            Track your income, expenses
                            and financial activity.
                        </p>

                    </div>

                </div>


                {/* =========================
                    SUMMARY CARDS
                ========================= */}

                <SummaryCards
                    refreshKey={refreshKey}
                />


                {/* =========================
                    CHARTS
                ========================= */}

                <Charts
                    refreshKey={refreshKey}
                />


                {/* =========================
                    ADD TRANSACTION
                ========================= */}

                <section className="dashboard-section">

                    <h2>
                        Add Transaction
                    </h2>

                    <TransactionForm
                        onTransactionAdded={
                            refreshDashboard
                        }
                    />

                </section>


                {/* =========================
                    TRANSACTION TABLE
                ========================= */}

                <section className="dashboard-section">

                    <h2>
                        Recent Transactions
                    </h2>

                    <TransactionTable

                        refreshKey={
                            refreshKey
                        }

                        onTransactionChanged={
                            refreshDashboard
                        }

                    />

                </section>


            </main>

        </div>

    );

}

export default Dashboard;