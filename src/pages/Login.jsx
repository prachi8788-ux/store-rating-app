import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Link,
  InputAdornment,
  IconButton
} from "@mui/material";



import MailOutlineIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // फॉर्म रीलोड रोखण्यासाठी
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      alert("Login Success");
      if (res.data.user.role === "SYSTEM_ADMIN") {
        navigate("/admin");
        } else {
        navigate("/stores");
      }
      
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        fontFamily: "Roboto, sans-serif"
      }}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          padding: '40px 32px', 
          width: 480, 
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          textAlign: 'center'
        }}
      >
        {/* मुख्य हेडिंग */}
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#202124', mb: 1, letterSpacing: '-0.5px' }}>
          Store Rating System
        </Typography>
        
        {/* सब-हेडिंग */}
        <Typography variant="h6" sx={{ color: '#202124', mb: 4, fontWeight: 500 }}>
          Sign In
        </Typography>

        {/* लॉगिन फॉर्म */}
        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            
            {/* ईमेल इनपुट फील्ड */}
            <TextField
              fullWidth
              label="Email Address *"
              name="email"
              variant="outlined"
              onChange={handleChange}
              value={form.email}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: '#757575', marginRight: 1 }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true, // इमेजप्रमाणे लेबल बॉर्डरवर दिसण्यासाठी
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            />

            {/* पासवर्ड इनपुट फील्ड */}
            <TextField
              fullWidth
              label="Password *"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              onChange={handleChange}
              value={form.password}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#757575', marginRight: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            />

            {/* साइन इन बटण */}
            <Button 
              fullWidth 
              variant="contained" 
              type="submit"
              sx={{ 
                mt: 1, 
                py: 1.5, 
                backgroundColor: '#1976d2', 
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '6px',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Sign In
            </Button>
          </Box>
        </form>

        {/* साइन अप लिंक */}
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography variant="body2" sx={{ color: '#616161' }}>
            Don't have an account?{' '}
            <Link 
              component="button" 
              onClick={() => navigate("/register")}
              sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>

        {/* डेमो क्रेडेंशियल्स बॉक्स (इमेज प्रमाणे) */}
        <Box 
          sx={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #f1f3f4', 
            borderRadius: '8px', 
            padding: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" display="block" fontWeight="bold" sx={{ color: '#3c4043', mb: 1, fontSize: '13px' }}>
            Demo Credentials:
          </Typography>
          <Typography variant="caption" display="block" sx={{ color: '#5f6368', fontSize: '12px', lineHeight: 1.6 }}>
            <strong>Admin:</strong> admin@system.com / Admin@123 <br />
            <strong>Store Owner:</strong> owner1@store.com / Owner@123 <br />
            <strong>Normal User:</strong> user1@example.com / User@123
          </Typography>
        </Box>

      </Paper>
    </Box>
  );
}