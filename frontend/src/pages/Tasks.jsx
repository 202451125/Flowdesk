import { useEffect, useState } from "react";
import axios from "axios";

import Topbar from "../components/Topbar";
import BackButton from "../components/BackButton";

import {
Box,
Typography,
TextField,
Button,
MenuItem,
Paper,
Avatar
} from "@mui/material";

function Tasks(){

const [tasks,setTasks] = useState([]);
const [employees,setEmployees] = useState([]);

const [title,setTitle] = useState("");
const [priority,setPriority] = useState("MEDIUM");
const [assigned,setAssigned] = useState("");
const [deadline,setDeadline] = useState("");

useEffect(()=>{
fetchTasks();
fetchEmployees();
},[]);

const fetchTasks = async ()=>{
const res = await axios.get("http://127.0.0.1:5000/tasks");
setTasks(res.data);
};

const fetchEmployees = async ()=>{
const res = await axios.get("http://127.0.0.1:5000/employees");
setEmployees(res.data);
};

const addTask = async ()=>{
await axios.post("http://127.0.0.1:5000/tasks",{
title,
priority,
assigned_to:assigned,
deadline
});

setTitle("");
setDeadline("");

fetchTasks();
};

const updateStatus = async (taskId,status)=>{
await axios.put(`http://127.0.0.1:5000/tasks/${taskId}`,{status});
fetchTasks();
};

const handleDrop = (e,status)=>{
const taskId = e.dataTransfer.getData("taskId");
updateStatus(taskId,status);
};

const handleDragStart = (e,id)=>{
e.dataTransfer.setData("taskId",id);
};

const columns=["TO_DO","IN_PROGRESS","DONE"];

return(

<div style={{background:"#f6f7fb",minHeight:"100vh"}}>

<Topbar/>

<Box p={4}>

<BackButton/>

<Typography variant="h4" mb={3}>
Task Board
</Typography>

{/* Add Task */}

<Paper sx={{p:3,mb:4,borderRadius:3}}>

<Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:2}}>

<TextField
label="Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<TextField
select
label="Priority"
value={priority}
onChange={(e)=>setPriority(e.target.value)}
>
<MenuItem value="LOW">LOW</MenuItem>
<MenuItem value="MEDIUM">MEDIUM</MenuItem>
<MenuItem value="HIGH">HIGH</MenuItem>
</TextField>

<TextField
select
label="Assign Employee"
value={assigned}
onChange={(e)=>setAssigned(e.target.value)}
>

{employees.map(emp=>(
<MenuItem key={emp.id} value={emp.id}>
{emp.name}
</MenuItem>
))}

</TextField>

<TextField
type="date"
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
/>

</Box>

<Button
variant="contained"
sx={{mt:2}}
onClick={addTask}
>
Add Task
</Button>

</Paper>

{/* Kanban */}

<Box
sx={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:3
}}
>

{columns.map(col=>(

<Box
key={col}
onDrop={(e)=>handleDrop(e,col)}
onDragOver={(e)=>e.preventDefault()}
>

<Typography variant="h6" mb={2}>
{col.replace("_"," ")}
</Typography>

{tasks
.filter(task=>task.status===col)
.map(task=>(

<Paper
key={task.id}
draggable
onDragStart={(e)=>handleDragStart(e,task.id)}
sx={{p:2,mb:2,borderRadius:2,cursor:"grab"}}
>

<Typography fontWeight="bold">
{task.title}
</Typography>

<Box sx={{display:"flex",alignItems:"center",gap:1,mt:1}}>

<Avatar sx={{width:26,height:26,fontSize:12}}>
{task.employee_name ? task.employee_name[0] : "U"}
</Avatar>

<Typography sx={{fontSize:12}}>
{task.employee_name || "Unassigned"}
</Typography>

</Box>

<Typography sx={{fontSize:12}}>
Priority: {task.priority}
</Typography>

<Typography sx={{fontSize:12}}>
Due: {task.deadline || "None"}
</Typography>

</Paper>

))}

</Box>

))}

</Box>

</Box>

</div>

);

}

export default Tasks;