import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, TextField, MenuItem, AppBar, Toolbar, IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddNewUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // फॉर्म डेटा स्टेट्स
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "Normal User" // इमेजप्रमाणे डीफॉल्ट व्हॅल्यू 'Normal User' ठेवली आहे
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/admin/users", form);
      alert("User Created Successfully!");
      navigate("/admin/users"); // युझर लिस्ट पेजवर परत जाण्यासाठी
    } catch (err) {
      alert("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      
      {/* १. निळा टॉप हेडर बार */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}>
        <Toolbar sx={{ px: 3 }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate(-1)} 
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", fontWeight: 500 }}>
            Create New User
          </Typography>
        </Toolbar>
      </AppBar>

      {/* २. मुख्य फॉर्म कार्ड कंटेनर */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 5, 
            maxWidth: 750, 
            width: "100%", 
            borderRadius: "8px", 
            border: "1px solid #e0e0e0",
            textAlign: "center"
          }}
        >
          {/* हेडिंग */}
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#202124", mb: 1 }}>
            Add New User
          </Typography>
          <Typography variant="body2" sx={{ color: "#757575", mb: 5 }}>
            Create a new user account with the specified role and permissions.
          </Typography>

          {/* इनपुट फॉर्म */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, textLeft: "left" }}>
              
              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
              />

              {/* Email Address */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
              />

              {/* Address */}
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={form.address}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
              />

              {/* Role ड्रॉपडाऊन मेनू */}
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  textAlign: "left",
                  '& .MuiOutlinedInput-root': { borderRadius: '6px' } 
                }}
              >
                <MenuItem value="NORMAL_USER">Normal User</MenuItem>
                <MenuItem value="STORE_OWNER">Store Owner</MenuItem>
                <MenuItem value="SYSTEM_ADMIN">System Admin</MenuItem>
              </TextField>

              {/* ३. तळाचे ॲक्शन बटन्स */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{ 
                    py: 1.5, 
                    backgroundColor: "#1976d2", 
                    textTransform: "none", 
                    fontSize: "15px",
                    fontWeight: 500,
                    borderRadius: "6px",
                    '&:hover': { backgroundColor: "#1565c0" }
                  }}
                >
                  {loading ? "Creating..." : "Create User"}
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ 
                    py: 1.5, 
                    color: "#757575",
                    borderColor: "#cbd5e1",
                    textTransform: "none", 
                    fontSize: "15px",
                    fontWeight: 500,
                    borderRadius: "6px",
                    '&:hover': { borderColor: "#94a3b8", backgroundColor: "#f8f9fa" }
                  }}
                >
                  Cancel
                </Button>
              </Box>

            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
