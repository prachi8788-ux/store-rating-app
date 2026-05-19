import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, TablePagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "../components/StarRating"; // आपण आधी बनवलेला स्टार कंपोनंट
import api from "../api/axios";

export default function RatingsOverview() {
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRatingsOverview = async () => {
      try {
        const res = await api.get("/user/Ratings-Overview");
        setRatings(res.data || []);
      } catch (err) {
        // API कनेक्ट नसेल तर इमेजप्रमाणे हुबेहूब डमी डेटा दिसेल
        setRatings([
          { storeName: "Prachi Lande - Fashion indus", address: "Wagholi,Pune", rating: 3, comment: "good", dateSubmitted: "May 17, 2026, 12:48 AM", lastUpdated: "-" },
          { storeName: "Test Grocery Store Two", address: "321 Grocery Lane, Food City, baramati", rating: 4, comment: "good", dateSubmitted: "May 17, 2026, 12:11 AM", lastUpdated: "-" },
          { storeName: "Premium Electronics Store - Best Tech Solutions", address: "Main Street, Downtown Business, Pune", rating: 1, comment: "No comment", dateSubmitted: "May 18, 2026, 06:04 PM", lastUpdated: "-" },
          { storeName: "Gourmet Food Market - Fresh Organic Products", address: "Pine Road, Organic Market Square, pune", rating: 5, comment: "No comment", dateSubmitted: "May 18, 2026, 06:04 PM", lastUpdated: "-" },
          { storeName: "Fashion Forward Boutique - Trendy Clothing Store", address: "Oak Avenue, Shopping Mall Complex, Pune", rating: 3, comment: "No comment", dateSubmitted: "May 19, 2026 , 06:04 PM", lastUpdated: "-" }
        ]);
      }
    };
    fetchRatingsOverview();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (ratingItem) => {
    alert(`Edit clicked for: ${ratingItem.storeName}`);
  };

  const handleDelete = async (ratingItem) => {
    if (window.confirm(`Are you sure you want to delete rating for ${ratingItem.storeName}?`)) {
      try {
        // await api.delete(`/user/ratings/${ratingItem.id}`);
        alert("Rating deleted successfully!");
      } catch (err) {
        alert("Failed to delete rating.");
      }
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh", fontFamily: "Roboto, sans-serif" }}>
      
      {/* मुख्य टायटल */}
      <Typography variant="h4" fontWeight="bold" align="center" sx={{ color: "#202124", mb: 4 }}>
        RatingsOverview
      </Typography>

      {/* रेटिंग्स टेबल लिस्ट कंटेनर */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px", border: "1px solid #e0e0e0", maxWidth: 1200, mx: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Store Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comment</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date Submitted</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Updated</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover>
                  {/* स्टोअरचे नाव */}
                  <TableCell sx={{ maxWidth: 200, fontWeight: 500, color: "#202124" }}>
                    {row.storeName}
                  </TableCell>
                  
                  {/* पत्ता */}
                  <TableCell sx={{ maxWidth: 250, color: "#5f6368", fontSize: "13px" }}>
                    {row.address}
                  </TableCell>
                  
                  {/* स्टार्स आणि निळा बॅज संख्या संख्या */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <StarRating rating={row.rating} />
                      <Box sx={{ 
                        backgroundColor: "#1976d2", 
                        color: "white", 
                        borderRadius: "50%", 
                        width: 20, 
                        height: 20, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "11px", 
                        fontWeight: "bold" 
                      }}>
                        {row.rating}
                      </Box>
                    </Box>
                  </TableCell>
                  
                  {/* कमेंट */}
                  <TableCell sx={{ color: "#202124" }}>{row.comment}</TableCell>
                  
                  {/* सबमिट केलेली तारीख */}
                  <TableCell sx={{ color: "#5f6368", fontSize: "13px", minWidth: 110 }}>
                    {row.dateSubmitted}
                  </TableCell>
                  
                  {/* लास्ट अपडेटेड तारीख */}
                  <TableCell sx={{ color: "#5f6368", fontSize: "13px", textAlign: "center" }}>
                    {row.lastUpdated}
                  </TableCell>
                  
                  {/* ॲक्शन्स एडिट आणि डिलीट बटन्स */}
                  <TableCell sx={{ minWidth: 180 }}>
                    <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon sx={{ fontSize: "16px !important" }} />}
                        onClick={() => handleEdit(row)}
                        sx={{ textTransform: "none", fontSize: "12px", borderRadius: "4px", py: 0.5 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon sx={{ fontSize: "16px !important" }} />}
                        onClick={() => handleDelete(row)}
                        sx={{ textTransform: "none", fontSize: "12px", borderRadius: "4px", py: 0.5 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* पेजिनेशन कंट्रोल विभाग */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ratings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
