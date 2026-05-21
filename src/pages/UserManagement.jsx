import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Paper, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UserManagement() {
  const navigate = useNavigate();
  
  // फिल्टर्स स्टेट्स
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data || []);
      } catch (err) {
        // API कनेक्ट नसेल तर इमेजप्रमाणे हुबेहूब डमी डेटा दिसेल
        setUsers([
          { name: "Prachi Lande - Fashion designer Shop - Tycoon Indus", email: "prachi@email.com", address: "wagholi pune", role: "SYSTEM ADMIN", storeInfo: "No store", createdDate: "May 17, 2026" },
          { name: "Nilesh Moharkar shah hai", email: "nilesh@email.com", address: "JSPM University Pune", role: "NORMAL USER", storeInfo: "No store", createdDate: "May 17, 2026" },
          { name: "Prachi Lande- Electronics", email: "prachi@email.com", address: "AhilyaNagar, Maharashtra", role: "STORE OWNER", storeInfo: "No store", createdDate: "May 18, 2026" },
          { name: "Nilesh Moharkar store cloth", email: "prachi@email.com", address: "Wagholi ,PUne", role: "NORMAL USER", storeInfo: "No store", createdDate: "May 18, 2026" },
          { name: "Prachi Lande new user", email: "prachi@email.com", address: "Gulmohar City Wagholi,Pune", role: "NORMAL USER", storeInfo: "No store", createdDate: "May 19, 2026" }
        ]);
      }
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  

  // युझर रोलनुसार रंगांचे बॅजेस ठरवणारे फंक्शन (हुबेहूब इमेजप्रमाणे)
  const getRoleStyle = (role) => {
    switch (role) {
      case "SYSTEM_ADMIN":
        return { backgroundColor: "#D32F2F", color: "white" };
      case "STORE_OWNER":
        return { backgroundColor: "#E65100", color: "white" };
      case "NORMAL_USER":
        return { backgroundColor: "#1976D2", color: "white" };
      default:
        return { backgroundColor: "#757575", color: "white" };
    }
  };

  // फिल्टर्सनुसार डेटा फिल्टर करणे
  const handleClearFilters = () => {
  setFilters({ name: "", email: "", address: "", role: "" });
  };

  const filteredUsers = users.filter((user) => {
  return (
    (user?.name || "").toLowerCase().includes((filters?.name || "").toLowerCase()) &&
    
    (user?.email || "").toLowerCase().includes((filters?.email || "").toLowerCase()) &&
    
    (user?.address || "").toLowerCase().includes((filters?.address || "").toLowerCase()) &&
    
    ((filters?.role || "") === "" || user?.role === filters.role)
  );
});

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* वरचा भाग: टायटल आणि ॲड युझर बटण */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#202124" }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/users/create")}
          sx={{ backgroundColor: "#1976d2", textTransform: "none", px: 2.5, py: 1, borderRadius: "6px" }}
        >
          Add User
        </Button>
      </Box>

      {/* फिल्टर्स कार्ड सेक्शन */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: "8px", border: "1px solid #e0e0e0" }}>
        <Typography variant="subtitle1" fontWeight="bold" align="center" sx={{ mb: 2, color: "#202124" }}>
          Filters
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2, alignItems: "center" }}>
          <TextField label="Name" name="name" size="small" value={filters.name} onChange={handleFilterChange} sx={{ backgroundColor: "white" }} />
          <TextField label="Email" name="email" size="small" value={filters.email} onChange={handleFilterChange} sx={{ backgroundColor: "white" }} />
          <TextField label="Address" name="address" size="small" value={filters.address} onChange={handleFilterChange} sx={{ backgroundColor: "white" }} />
          
          <TextField select label="Role" name="role" size="small" value={filters.role} onChange={handleFilterChange} sx={{ backgroundColor: "white" }}>
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="SYSTEM_ADMIN">SYSTEM ADMIN</MenuItem>
            <MenuItem value="STORE_OWNER">STORE OWNER</MenuItem>
            <MenuItem value="NORMAL_USER">NORMAL USER</MenuItem>
          </TextField>

          <Button variant="outlined" onClick={handleClearFilters} sx={{ textTransform: "none", height: "40px", borderRadius: "6px" }}>
            Clear Filters
          </Button>
        </Box>
      </Paper>

      {/* डेटा लिस्ट टेबल सेक्शन */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Store Info</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ maxWidth: 220, fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell sx={{ color: "#5f6368" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "#5f6368" }}>{user.address}</TableCell>
                <TableCell>
                  <Box sx={{
                    ...getRoleStyle(user.role),
                    display: "inline-block", px: 1.5, py: 0.5, borderRadius: "20px", fontSize: "11px", fontWeight: "bold", textAlign: "center"
                  }}>
                    {user.role}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#5f6368" }}>{user.storeInfo}</TableCell>
                <TableCell sx={{ color: "#5f6368" }}>{user.createdDate}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => alert(`Viewing details of ${user.name}`)}
                    sx={{ textTransform: "none", fontSize: "12px", borderRadius: "4px" }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
