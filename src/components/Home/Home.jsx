// import style from "./style.module.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return <div>
    <Link to='login'>Login</Link>
    <hr></hr>
    <Link to='dashboard'>Dashboard</Link>
  </div>;
}

export default Dashboard;
