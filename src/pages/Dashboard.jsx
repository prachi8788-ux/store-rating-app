import { Container, Paper, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Container style={{ marginTop: 30 }}>
        <Paper style={{ padding: 30 }}>
          <Typography variant="h4">Dashboard</Typography>

          <Typography style={{ marginTop: 10 }}>
            Welcome admin 🎯
          </Typography>

          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={() => navigate("/admin")}
          >
            Open Admin Dashboard
          </Button>
        </Paper>
      </Container>
    </>
  );
}