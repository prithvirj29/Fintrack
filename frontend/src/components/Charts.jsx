import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function Charts() {

    const [dashboard, setDashboard] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/transactions/dashboard");

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const pieData = {

        labels: ["Income", "Expense"],

        datasets: [

            {

                data: [
                    dashboard.totalIncome,
                    dashboard.totalExpense
                ]

            }

        ]

    };

    const barData = {

        labels: ["Income", "Expense", "Balance"],

        datasets: [

            {

                label: "Finance Summary",

                data: [

                    dashboard.totalIncome,
                    dashboard.totalExpense,
                    dashboard.balance

                ]

            }

        ]

    };

    return (

        <div>

            <h2>Finance Charts</h2>

            <div
                style={{
                    display: "flex",
                    gap: "50px"
                }}
            >

                <div style={{ width: "350px" }}>
                    <Pie data={pieData} />
                </div>

                <div style={{ width: "450px" }}>
                    <Bar data={barData} />
                </div>

            </div>

        </div>

    );

}

export default Charts;