import "../styles/Dashboard.css";

import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";

function Dashboard(){

    return(

        <div className="dashboard">

            <h1 className="title">
                💰 Finance Tracker
            </h1>

            <div className="section">
                <SummaryCards/>
            </div>

            <div className="section">
                <TransactionForm/>
            </div>

            <div className="section">
                <TransactionTable/>
            </div>

            <div className="section">
                <Charts/>
            </div>

        </div>

    )

}

export default Dashboard;