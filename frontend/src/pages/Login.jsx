import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });

      /* SAVE USER SESSION */
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage(`Welcome ${res.data.user.name}`);

      navigate("/dashboard");

    } catch (err) {

      setMessage("Invalid email or password");

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
          Welcome to FlowDesk
        </Typography>

        <Typography mt={2} color="#475569" width="70%">
          Manage employees, projects and workflow in one clean dashboard.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            width: 160,
            background: "linear-gradient(90deg,#2563eb,#38bdf8)"
          }}
        >
          Learn More
        </Button>

      </Box>

      {/* LOGIN CARD */}
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
            width: 360,
            padding: 5,
            borderRadius: 5,
            backdropFilter: "blur(14px)",
            background: "rgba(255,255,255,0.65)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
        >

          <Typography variant="h5" textAlign="center" mb={3}>
            Sign In
          </Typography>

          <form onSubmit={handleLogin}>

            <TextField
              label="Email or Username"
              placeholder="example@gmail.com or kavana"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              placeholder="Minimum 6 characters"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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

            <Typography textAlign="center" mt={2}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Typography>

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