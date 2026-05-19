import React, { useState, useEffect, useContext } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, TextField, InputAdornment, Rating 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

export default function StoreList() {
  
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

    useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/stores");
        // जर API कडून डेटा मिळाला आणि तो रिकामी नसेल तर तो सेट करा, नाहीतर डमी डेटा दाखवा
        if (res.data && res.data.length > 0) {
          setStores(res.data);
        } else {
          setDummyData();
        }
      } catch (err) {
        setDummyData();
      }
    };

    // डमी डेटा सेट करण्यासाठी स्वतंत्र फंक्शन
    const setDummyData = () => {
      setStores([
        { id: 1, name: "Premium Electronics Store", address: "Main Street, Downtown Business, Pune", rating: 4.5, totalReviews: 24 },
        { id: 2, name: "Fashion Forward Boutique", address: "Oak Avenue, Shopping Mall Complex, Pune", rating: 3.8, totalReviews: 12 },
        { id: 3, name: "Gourmet Food Market", address: "Pine Road, Organic Market Square, pune", rating: 4.9, totalReviews: 56 },
        { id: 4, name: "Coffee Corner", address: "JSPM University, Pune", rating: 4.2, totalReviews: 18 }
      ]);
    };

    fetchStores();
  }, []);


  const handleRateStore = (storeId, storeName) => {
    alert(`Rating form opening for: ${storeName}`);
    // इथे तुम्ही रेटिंग देण्याचा पॉपअप डायलॉग किंवा नवीन पेज राउट जोडू शकता
  };

  // सर्च फिल्टर
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* १. टॉप नेव्हबार */}
      <Navbar title="Navbar" />

      {/* २. मुख्य कंटेनर */}
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        
        {/* हेडिंग आणि स्टार आयकॉन */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#202124" }}>
            Stores
          </Typography>
          <Typography variant="h4" sx={{ color: "#F59E0B" }}>⭐</Typography>
        </Box>

        {/* सर्च बार */}
        <Paper elevation={1} sx={{ p: 2, mb: 4, borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search stores by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#757575" }} />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Paper>

        {/* ३. स्टोअर्स लिस्ट टेबल */}
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Store Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Average Rating</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id} hover>
                  {/* स्टोअर नाव */}
                  <TableCell sx={{ fontWeight: 500, color: "#202124", py: 2.5 }}>
                    {store.name}
                  </TableCell>
                  
                  {/* पत्ता */}
                  <TableCell sx={{ color: "#5f6368", fontSize: "13.5px" }}>
                    {store.address}
                  </TableCell>
                  
                  {/* रेटिंग स्टार्स */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating value={store.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" fontWeight="bold" sx={{ color: "#202124" }}>
                        {store.rating}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#757575" }}>
                        ({store.totalReviews} reviews)
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  {/* ॲक्शन बटण */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<RateReviewIcon />}
                      onClick={() => handleRateStore(store.id, store.name)}
                      sx={{ 
                        textTransform: "none", 
                        backgroundColor: "#1976d2",
                        borderRadius: "6px",
                        px: 2
                      }}
                    >
                      Give Rating
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStores.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#757575" }}>
                    No stores found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
}
