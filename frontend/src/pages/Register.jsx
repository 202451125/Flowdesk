import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try{
      await axios.post("http://127.0.0.1:5000/register",{
        name,
        email,
        password,
        role:"employee"
      });

      setMessage("Account created successfully");

    }catch{
      setMessage("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(120deg,#eaf3ff,#dbeafe)"
      }}
    >

      <Box
        sx={{
          flex:1,
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          padding:10
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#1e3a8a">
          Create Account
        </Typography>

        <Typography mt={2} color="#475569" width="70%">
          Join FlowDesk and manage company workflows efficiently.
        </Typography>
      </Box>

      <Box
        sx={{
          flex:1,
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >

        <Box
          sx={{
            width:350,
            padding:5,
            borderRadius:5,
            backdropFilter:"blur(14px)",
            background:"rgba(255,255,255,0.65)",
            boxShadow:"0 20px 40px rgba(0,0,0,0.15)"
          }}
        >

          <Typography variant="h5" textAlign="center" mb={3}>
            Sign Up
          </Typography>

          <form onSubmit={handleRegister}>

            <TextField
              label="Name"
              fullWidth
              margin="normal"
              onChange={(e)=>setName(e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt:2,
                background:"linear-gradient(90deg,#2563eb,#38bdf8)"
              }}
            >
              Create Account
            </Button>

          </form>

          <Typography textAlign="center" mt={2}>
            Already have an account? <Link to="/">Login</Link>
          </Typography>

          <Typography textAlign="center" mt={2} color="error">
            {message}
          </Typography>

        </Box>
      </Box>
    </Box>
  );
}

export default Register;