import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import { Box, Typography, Avatar } from "@mui/material";

function Dashboard(){

const [stats,setStats] = useState({
employees:0,
tasks:0,
projects:0,
completed:0
});

useEffect(()=>{

axios
.get("http://127.0.0.1:5000/dashboard-stats")
.then(res=>setStats(res.data))
.catch(err=>console.log(err));

},[]);

return(

<div style={{display:"flex",background:"#f5f6fa",minHeight:"100vh"}}>

<Sidebar/>

<div style={{marginLeft:"240px",width:"100%"}}>

<Topbar/>

<Box p={4}>

<Box
sx={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
mb:3
}}
>

<Typography variant="h4" fontWeight="bold">
Welcome Back 👋
</Typography>

<Box sx={{display:"flex",alignItems:"center",gap:2}}>

<Typography>Kavana</Typography>

<Avatar sx={{background:"#2563EB"}}>
K
</Avatar>

</Box>

</Box>

<Box
sx={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:3
}}
>

<StatCard
title="Employees"
value={stats.employees}
gradient="linear-gradient(135deg,#4F46E5,#818CF8)"
/>

<StatCard
title="Tasks"
value={stats.tasks}
gradient="linear-gradient(135deg,#9333EA,#C084FC)"
/>

<StatCard
title="Projects"
value={stats.projects}
gradient="linear-gradient(135deg,#F97316,#FDBA74)"
/>

<StatCard
title="Completed"
value={stats.completed}
gradient="linear-gradient(135deg,#16A34A,#4ADE80)"
/>

</Box>

</Box>

</div>

</div>

);

}

export default Dashboard;