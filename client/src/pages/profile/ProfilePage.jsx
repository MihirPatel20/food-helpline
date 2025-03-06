import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Snackbar,
  Box,
  Grid,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { authApi } from "../../services/api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
}));

const EditableField = ({ isEditing, value, onChange, name, label }) => {
  return (
    <Box display="flex" mb={2} alignItems="center">
      <Typography variant="body1" sx={{ minWidth: "120px" }}>
        {label}:
      </Typography>

      {isEditing ? (
        <TextField
          fullWidth
          name={name}
          size="small"
          value={value || ""}
          onChange={onChange}
          sx={{ ml: 2 }}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            p: "8.5px 14px",
            border: "1px solid #ccc",
            flex: 1,
            width: "100%",
          }}
        >
          {value || "-"}
        </Typography>
      )}
    </Box>
  );
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await authApi.getProfile();
      setUser(res);
      setEditedUser(res);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to fetch profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = {};
      const allowedUpdates = [
        "name",
        "email",
        "phone",
        "businessName",
        "operatingHours",
        "location",
      ];

      allowedUpdates.forEach((field) => {
        if (JSON.stringify(editedUser[field]) !== JSON.stringify(user[field])) {
          updates[field] = editedUser[field];
        }
      });

      if (Object.keys(updates).length === 0) {
        setError("No changes to save");
        return;
      }

      const res = await authApi.updateProfile(updates);
      setUser(res);
      setEditedUser(res);
      setIsEditing(false);
      setError(null);
      // Add a success message
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => {
      const newUser = { ...prev };
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        newUser[parent] = { ...newUser[parent], [child]: value };
      } else {
        newUser[name] = value;
      }
      return newUser;
    });
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (!user)
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        No user data available
      </Alert>
    );

  return (
    <StyledCard elevation={3}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">User Profile</Typography>
          {!isEditing ? (
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton onClick={handleSave} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="secondary">
                <CancelIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EditableField
              isEditing={isEditing}
              value={editedUser?.name}
              onChange={handleChange}
              name="name"
              label="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <EditableField
              isEditing={false}
              value={user?.email}
              name="email"
              label="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <EditableField
              isEditing={isEditing}
              value={editedUser?.phone}
              onChange={handleChange}
              name="phone"
              label="Phone"
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ minWidth: "120px" }}>
              User Type:
            </Typography>
            <Chip label={user?.userType} color="primary" size="small" />
          </Grid>
        </Grid>

        {(user?.userType === "donor" || user?.userType === "agent") && (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              Business Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.businessName}
                  onChange={handleChange}
                  name="businessName"
                  label="Business Name"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.operatingHours?.start}
                  onChange={handleChange}
                  name="operatingHours.start"
                  label="Opening Time"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.operatingHours?.end}
                  onChange={handleChange}
                  name="operatingHours.end"
                  label="Closing Time"
                />
              </Grid>

              <Grid item xs={12}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.location?.address}
                  onChange={handleChange}
                  name="location.address"
                  label="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.location?.city}
                  onChange={handleChange}
                  name="location.city"
                  label="City"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.location?.state}
                  onChange={handleChange}
                  name="location.state"
                  label="State"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableField
                  isEditing={isEditing}
                  value={editedUser?.location?.pincode}
                  onChange={handleChange}
                  name="location.pincode"
                  label="Pincode"
                />
              </Grid>
            </Grid>
          </>
        )}

        {user?.userType === "agent" && (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              Agent Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">
              <strong>Active Deliveries:</strong>{" "}
              {user?.activeDeliveries?.length || 0}
            </Typography>
          </>
        )}
      </CardContent>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setError(null);
            setSuccess(null);
          }}
          variant="filled"
          elevation={6}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </StyledCard>
  );
};

export default UserProfile;
