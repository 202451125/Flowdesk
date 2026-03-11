import { FaHome, FaUsers, FaTasks, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed"
      }}
    >
      <h2 style={{marginBottom:"40px"}}>FlowDesk</h2>

      <nav style={{display:"flex",flexDirection:"column",gap:"20px"}}>

        <Link to="/dashboard" style={{color:"white",textDecoration:"none"}}>
          <FaHome/> Dashboard
        </Link>

        <Link to="/employees" style={{color:"white",textDecoration:"none"}}>
          <FaUsers/> Employees
        </Link>

        <Link to="/tasks" style={{color:"white",textDecoration:"none"}}>
          <FaTasks/> Tasks
        </Link>

        <Link to="/projects" style={{color:"white",textDecoration:"none"}}>
          <FaProjectDiagram/> Projects
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;