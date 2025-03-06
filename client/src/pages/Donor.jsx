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
import axios from "axios";
import api, { authApi } from "../services/api";

const Donor = () => {
  const currentUser = authApi.getUser();
  const [donations, setDonations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    quantityUnit: "kilograms",
    foodType: "cooked",
    expiryDate: getTodayDate(),
    expiryTime: getOneHourLater(),
    pickupAddress: "",
    description: "",
    allergenInfo: "",
    contactPhone: currentUser.phone || "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function getOneHourLater() {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toTimeString().slice(0, 5);
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await api.get("/donations");
      console.log("res: ", response.data.donations);
      setDonations(response.data.donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setNotification({
        open: true,
        message: "Failed to fetch donations",
        severity: "error",
      });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDonation(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      foodName: "",
      quantity: "",
      quantityUnit: "servings",
      foodType: "cooked",
      expiryDate: getTodayDate(),
      expiryTime: getOneHourLater(),
      pickupAddress: "",
      description: "",
      allergenInfo: "",
      contactPhone: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.foodName ||
      !formData.quantity ||
      !formData.pickupAddress ||
      !formData.contactPhone
    ) {
      setNotification({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
      return;
    }

    const expiryDateTime = new Date(
      `${formData.expiryDate}T${formData.expiryTime}`
    );

    try {
      if (editingDonation) {
        await api.put(`/donations/${editingDonation._id}`, {
          ...formData,
          expiryDateTime: expiryDateTime.toISOString(),
        });
        setNotification({
          open: true,
          message: "Donation updated successfully!",
          severity: "success",
        });
      } else {
        await api.post("/donations", {
          ...formData,
          expiryDateTime: expiryDateTime.toISOString(),
        });
        setNotification({
          open: true,
          message: "Donation added successfully!",
          severity: "success",
        });
      }
      fetchDonations();
      handleCloseDialog();
    } catch (error) {
      console.error("Error submitting donation:", error);
      setNotification({
        open: true,
        message: "Failed to submit donation",
        severity: "error",
      });
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

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

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

  const checkExpiredDonations = () => {
    const now = new Date();
    const updatedDonations = donations.map((donation) => {
      if (
        donation.status === "available" &&
        new Date(donation.expiryDateTime) < now
      ) {
        return { ...donation, status: "expired" };
      }
      return donation;
    });

    if (JSON.stringify(updatedDonations) !== JSON.stringify(donations)) {
      setDonations(updatedDonations);
    }
  };

  useEffect(() => {
    checkExpiredDonations();
    const interval = setInterval(checkExpiredDonations, 60000);
    return () => clearInterval(interval);
  }, [donations]);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Donor Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          size="large"
        >
          Add Food Donation
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Donation Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#e3f2fd", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  Total Donations
                </Typography>
                <Typography variant="h3">{donations.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#e8f5e9", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="success.main">
                  Available
                </Typography>
                <Typography variant="h3">
                  {donations.filter((d) => d.status === "available").length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#fff3e0", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="warning.main">
                  Pending/Completed
                </Typography>
                <Typography variant="h3">
                  {
                    donations.filter(
                      (d) => d.status === "pending" || d.status === "completed"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" gutterBottom>
        Your Donation List
      </Typography>

      {donations.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 5,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            You haven't made any donations yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Click the "Add Food Donation" button to get started
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDialog}
          >
            Add Your First Donation
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {donations.map((donation) => (
            <Grid item xs={12} md={6} key={donation._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: 5,
                  borderColor: `${
                    donation.status === "expired"
                      ? "error.main"
                      : "primary.main"
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

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <Restaurant
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: "middle" }}
                    />
                    {donation.foodItem.quantity}{" "}
                    {donation.foodItem.quantityUnit} •{" "}
                    {donation.foodItem.foodType}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <AccessTime
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: "middle" }}
                    />
                    Expires:{" "}
                    {new Date(donation.foodItem.expiryDate).toLocaleString()}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
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

                <CardActions sx={{ justifyContent: "flex-end" }}>
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Donation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingDonation ? "Edit Food Donation" : "Add Food Donation"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="foodName"
                label="Food Name *"
                value={formData.foodName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="quantity"
                label="Quantity *"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="quantityUnit"
                  value={formData.quantityUnit}
                  onChange={handleInputChange}
                  label="Unit"
                >
                  <MenuItem value="kilograms">Kilograms</MenuItem>
                  <MenuItem value="items">Items</MenuItem>
                  <MenuItem value="packages">Packages</MenuItem>
                  <MenuItem value="pounds">Pounds</MenuItem>
                  <MenuItem value="servings">Servings</MenuItem>
                  <MenuItem value="liters">Liters</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Food Type</InputLabel>
                <Select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleInputChange}
                  label="Food Type"
                >
                  <MenuItem value="cooked">Cooked Food</MenuItem>
                  <MenuItem value="packaged">Packaged Food</MenuItem>
                  <MenuItem value="produce">Fresh Produce</MenuItem>
                  <MenuItem value="dairy">Dairy Product</MenuItem>
                  <MenuItem value="grains">Grains</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                name="expiryDate"
                label="Expiry Date *"
                type="date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                name="expiryTime"
                label="Expiry Time *"
                type="time"
                value={formData.expiryTime}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="pickupAddress"
                label="Pickup Address *"
                value={formData.pickupAddress}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                placeholder="Provide details about the food, preparation date, etc."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="allergenInfo"
                label="Allergen Information"
                value={formData.allergenInfo}
                onChange={handleInputChange}
                fullWidth
                placeholder="e.g., Contains nuts, dairy, gluten"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="contactPhone"
                label="Contact Phone *"
                value={formData.contactPhone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingDonation ? "Update Donation" : "Add Donation"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Donor;
