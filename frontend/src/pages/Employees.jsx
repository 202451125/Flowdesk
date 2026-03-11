import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Employees() {

const navigate = useNavigate()

const [employees,setEmployees] = useState([])
const [open,setOpen] = useState(false)

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [role,setRole] = useState("")
const [department,setDepartment] = useState("")

const user = JSON.parse(localStorage.getItem("user"))

/* FETCH EMPLOYEES */

const fetchEmployees = async () => {

const res = await axios.get("http://127.0.0.1:5000/employees")

setEmployees(res.data)

}

useEffect(()=>{

fetchEmployees()

},[])


/* ADD EMPLOYEE */

const addEmployee = async ()=>{

await axios.post("http://127.0.0.1:5000/employees",{
name,
email,
role,
department
})

setOpen(false)

setName("")
setEmail("")
setRole("")
setDepartment("")

fetchEmployees()

}


/* DELETE EMPLOYEE */

const deleteEmployee = async (id)=>{

await axios.delete(`http://127.0.0.1:5000/employees/${id}`)

fetchEmployees()

}


return(

<Box sx={{padding:5}}>

{/* TOP BAR */}

<Box sx={{display:"flex",justifyContent:"space-between",mb:4}}>

<Button
startIcon={<ArrowBackIcon/>}
onClick={()=>navigate("/dashboard")}
>
Back
</Button>

{user?.role === "admin" && (

<Button
variant="contained"
onClick={()=>setOpen(true)}
>
Add Employee
</Button>

)}

</Box>


<Typography variant="h5" mb={3}>
Employees
</Typography>


{/* EMPLOYEE TABLE */}

<Table>

<TableHead>

<TableRow>

<TableCell>Name</TableCell>
<TableCell>Email</TableCell>
<TableCell>Role</TableCell>
<TableCell>Department</TableCell>
<TableCell>Action</TableCell>

</TableRow>

</TableHead>


<TableBody>

{employees.map(emp =>(

<TableRow key={emp.id}>

<TableCell>{emp.name}</TableCell>
<TableCell>{emp.email}</TableCell>
<TableCell>{emp.role}</TableCell>
<TableCell>{emp.department}</TableCell>

<TableCell>

{user?.role === "admin" && (

<Button
color="error"
onClick={()=>deleteEmployee(emp.id)}
>
Remove
</Button>

)}

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

{/* ADD EMPLOYEE MODAL */}

<Dialog open={open} onClose={()=>setOpen(false)}>

<DialogTitle>Add Employee</DialogTitle>

<DialogContent>

<TextField
label="Name"
fullWidth
margin="normal"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<TextField
label="Email"
fullWidth
margin="normal"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<TextField
label="Role"
fullWidth
margin="normal"
value={role}
onChange={(e)=>setRole(e.target.value)}
/>

<TextField
label="Department"
fullWidth
margin="normal"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
/>

</DialogContent>

<DialogActions>

<Button onClick={()=>setOpen(false)}>
Cancel
</Button>

<Button
variant="contained"
onClick={addEmployee}
>
Add
</Button>

</DialogActions>

</Dialog>


</Box>

)

}

export default Employees