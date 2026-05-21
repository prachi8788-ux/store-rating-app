import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Rating,
  TextField,
  Button
} from "@mui/material";

export default function GiveRating() {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const storeName = localStorage.getItem("storeName");

  const handleSubmit = () => {

    alert("Rating Submitted Successfully");

    window.location.href = "/stores";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8"
      }}
    >
      <Paper sx={{ p: 4, width: 500 }}>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Give Rating
        </Typography>

        <Typography mb={2}>
          Store: <b>{storeName}</b>
        </Typography>

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Write Review"
          sx={{ mt: 3 }}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Submit Rating
        </Button>

      </Paper>
    </Box>
  );
}