import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });
      setMessage(`Welcome ${res.data.user.name} (${res.data.user.role})`);
    } catch {
      setMessage("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(120deg, #eaf3ff, #dbeafe)"
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#1e3a8a">
          Welcome!
        </Typography>

        <Typography mt={2} color="#475569" width="70%">
          FlowDesk helps you manage employees, tasks and company workflow
          efficiently with a centralized management system.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            width: 150,
            background: "linear-gradient(90deg,#2563eb,#38bdf8)"
          }}
        >
          Learn More
        </Button>
      </Box>

      {/* RIGHT SIDE LOGIN CARD */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            width: 350,
            padding: 5,
            borderRadius: 5,
            backdropFilter: "blur(14px)",
            background: "rgba(255,255,255,0.65)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3}>
            Sign in
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "linear-gradient(90deg,#2563eb,#38bdf8)"
              }}
            >
              Login
            </Button>
          </form>

          <Typography color="error" mt={2} textAlign="center">
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
