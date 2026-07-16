import { useEffect,useState } from "react";
import api from "../services/api";

function SummaryCards(){

    const[dashboard,setDashboard]=useState({
        totalIncome:0,
        totalExpense:0,
        balance:0
    });

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=async()=>{

        const response=await api.get("/transactions/dashboard");

        setDashboard(response.data);

    }

    return(

        <div style={{

            display:"flex",
            justifyContent:"space-around"

        }}>

            <div>
                <h3>💵 Income</h3>
                <h2>₹{dashboard.totalIncome}</h2>
            </div>

            <div>
                <h3>💸 Expense</h3>
                <h2>₹{dashboard.totalExpense}</h2>
            </div>

            <div>
                <h3>💰 Balance</h3>
                <h2>₹{dashboard.balance}</h2>
            </div>

        </div>

    )

}

export default SummaryCards;