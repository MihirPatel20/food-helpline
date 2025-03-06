import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  LocationOn,
  AccessTime,
  Restaurant,
} from "@mui/icons-material";

const DonationCard = ({ donation }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "primary";
      case "expired":
        return "error";
      default:
        return "default";
    }
  };

  const handleEdit = (donation) => {
    const expiryDate = new Date(donation.expiryDateTime);
    setEditingDonation(donation);
    setFormData({
      ...donation,
      expiryDate: expiryDate.toISOString().split("T")[0],
      expiryTime: expiryDate.toTimeString().slice(0, 5),
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/donations/${id}`);
      fetchDonations();
      setNotification({
        open: true,
        message: "Donation deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting donation:", error);
      setNotification({
        open: true,
        message: "Failed to delete donation",
        severity: "error",
      });
    }
  };

  return (
    <Grid item xs={12} md={6} key={donation._id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderLeft: 5,
          borderColor: `${
            donation.status === "expired" ? "error.main" : "primary.main"
          }`,
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="div">
              {donation.foodItem.foodName}
            </Typography>
            <Chip
              label={
                donation.status.charAt(0).toUpperCase() +
                donation.status.slice(1)
              }
              color={getStatusColor(donation.status)}
              size="small"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Restaurant
              fontSize="small"
              sx={{ mr: 1, verticalAlign: "middle" }}
            />
            {donation.foodItem.quantity} {donation.foodItem.quantityUnit} •{" "}
            {donation.foodItem.foodType}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <AccessTime
              fontSize="small"
              sx={{ mr: 1, verticalAlign: "middle" }}
            />
            Expires: {new Date(donation.foodItem.expiryDate).toLocaleString()}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <LocationOn
              fontSize="small"
              sx={{ mr: 1, verticalAlign: "middle" }}
            />
            {donation.pickupAddress}
          </Typography>

          {donation.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {donation.description}
            </Typography>
          )}

          {donation.allergenInfo && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              Allergens: {donation.allergenInfo}
            </Typography>
          )}
        </CardContent>

        {/* <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(donation)}
            disabled={donation.status !== "available"}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(donation._id)}
          >
            <Delete />
          </IconButton>
        </CardActions> */}
      </Card>
    </Grid>
  );
};

export default DonationCard;
