import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Add as AddIcon,
  List as ListIcon,
  Analytics as AnalyticsIcon,
  Inventory as InventoryIcon,
  NotificationsActive as NotificationsIcon,
} from "@mui/icons-material";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { activityFeed, expiringItems } from "./dummyData";
import api, { authApi } from "../../services/api";
import DonationCard from "../DonationCard";

// Brand colors
const brandColors = {
  primary: "#1976d2",
  secondary: "#dc004e",
  warning: "#ff9800",
  success: "#4caf50",
  info: "#00acc1",
};

const HomePage = () => {
  const user = authApi.getUser();
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  const [actionSearchQuery, setActionSearchQuery] = useState("");
  const [userData, setUserData] = useState({
    name: user.name,
    totalItems: 120,
    expiringItems: 5,
    moneySaved: 250,
    totalDonations: 75, // New stat for total donations
  });

  const fetchDonations = async () => {
    try {
      const response = await api.get("/donations/all");

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

  useEffect(() => {
    fetchDonations();
  }, []);

  const quickStats = [
    {
      title: "Total Items",
      value: userData.totalItems,
      icon: <ShoppingCartIcon />,
      color: brandColors.primary,
    },
    {
      title: "Expiring Soon",
      value: userData.expiringItems,
      icon: <WarningIcon />,
      color: brandColors.warning,
    },
    {
      title: "Money Saved",
      value: `$${userData.moneySaved}`,
      icon: <AttachMoneyIcon />,
      color: brandColors.success,
    },
    {
      title: "Total Donations",
      value: userData.totalDonations,
      icon: <FavoriteIcon />,
      color: brandColors.secondary,
    },
  ];

  const quickActions = {
    inventory: {
      title: "Inventory",
      icon: <InventoryIcon sx={{ color: brandColors.primary }} />,
      actions: [
        {
          title: "Add Food Item",
          icon: <AddIcon />,
          description: "Add a new food item to inventory",
          action: () => navigate("/foods/add"),
        },
        {
          title: "View List",
          icon: <ListIcon />,
          description: "View and manage food inventory",
          action: () => navigate("/foods/list"),
        },
        {
          title: "Categories",
          icon: <CategoryIcon />,
          description: "Manage food categories",
          action: () => navigate("/foods/categories"),
        },
      ],
    },
    analytics: {
      title: "Analytics",
      icon: <AnalyticsIcon sx={{ color: brandColors.info }} />,
      actions: [
        {
          title: "Dashboard",
          icon: <TrendingUpIcon />,
          description: "View analytics dashboard",
          action: () => navigate("/analytics"),
        },
        {
          title: "Reports",
          icon: <AnalyticsIcon />,
          description: "Generate and view reports",
          action: () => navigate("/analytics/reports"),
        },
      ],
    },
    settings: {
      title: "Settings",
      icon: <SettingsIcon sx={{ color: brandColors.secondary }} />,
      actions: [
        {
          title: "Notifications",
          icon: <NotificationsIcon />,
          description: "Manage notification settings",
          action: () => navigate("/settings/notifications"),
        },
      ],
    },
  };

  const recentlyUsed = [
    {
      title: "Add Food Item",
      icon: <AddIcon />,
      action: () => navigate("/foods/add"),
      timestamp: "2 hours ago",
    },
    {
      title: "Analytics",
      icon: <TrendingUpIcon />,
      action: () => navigate("/analytics"),
      timestamp: "1 day ago",
    },
  ];

  const filteredActions = Object.values(quickActions).flatMap((category) =>
    category.actions.filter(
      (action) =>
        action.title.toLowerCase().includes(actionSearchQuery.toLowerCase()) ||
        action.description
          .toLowerCase()
          .includes(actionSearchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Total Donation Summary
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
                        (d) =>
                          d.status === "pending" || d.status === "completed"
                      ).length
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3} mb={4}>
          {donations.map((donation) => (
            <DonationCard donation={donation} key={donation._id} />
          ))}
        </Grid>

        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: `linear-gradient(45deg, ${brandColors.primary}15, ${brandColors.info}15)`,
            borderLeft: `4px solid ${brandColors.primary}`,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome back, {userData.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You have {userData.expiringItems} items expiring soon and saved $
            {userData.moneySaved} this month.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Main Content Grid */}
          <Grid container item xs={12} md={8} spacing={3}>
            {/* Quick Stats Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Stats
                </Typography>
                <Grid container spacing={2}>
                  {quickStats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Card
                        sx={{
                          background: `linear-gradient(45deg, ${stat.color}15, ${stat.color}05)`,
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 2,
                          },
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 1,
                                bgcolor: `${stat.color}15`,
                                color: stat.color,
                                mr: 1,
                              }}
                            >
                              {stat.icon}
                            </Box>
                            <Typography variant="h5">{stat.value}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {stat.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Expiring Items Section */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  background: `linear-gradient(45deg, ${brandColors.warning}05, ${brandColors.warning}10)`,
                  borderLeft: `4px solid ${brandColors.warning}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <WarningIcon sx={{ color: brandColors.warning, mr: 1 }} />
                  <Typography variant="h6">Expiring Items</Typography>
                </Box>
                <Grid container spacing={2}>
                  {expiringItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card
                        sx={{
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 2,
                          },
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <WarningIcon
                              sx={{
                                mr: 1,
                                color:
                                  item.daysLeft <= 2
                                    ? brandColors.secondary
                                    : brandColors.warning,
                              }}
                            />
                            <Typography variant="h6">
                              {item.name} - {item.quantity}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                item.daysLeft <= 2
                                  ? brandColors.secondary
                                  : "text.secondary",
                              fontWeight: item.daysLeft <= 2 ? 500 : 400,
                            }}
                          >
                            Expires in {item.daysLeft} days
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Expiry:{" "}
                            {new Date(item.expiryDate).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Quick Actions Section */}
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderTop: `4px solid #4CAF50`,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search actions..."
                    value={actionSearchQuery}
                    onChange={(e) => setActionSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  {/* Recently Used Section */}
                  {!actionSearchQuery && (
                    <>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <HistoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="subtitle1">
                          Recently Used
                        </Typography>
                      </Box>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {recentlyUsed.map((action, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Card
                              variant="outlined"
                              sx={{
                                cursor: "pointer",
                                transition: "all 0.2s",
                                "&:hover": {
                                  bgcolor: "action.hover",
                                },
                              }}
                              onClick={action.action}
                            >
                              <CardContent>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Box sx={{ mr: 2 }}>{action.icon}</Box>
                                  <Box>
                                    <Typography variant="subtitle1">
                                      {action.title}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {action.timestamp}
                                    </Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}

                  {/* Filtered/Categorized Actions */}
                  {actionSearchQuery ? (
                    <Grid container spacing={2}>
                      {filteredActions.map((action, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Card
                            variant="outlined"
                            sx={{
                              cursor: "pointer",
                              transition: "all 0.2s",
                              "&:hover": {
                                bgcolor: "action.hover",
                              },
                            }}
                            onClick={action.action}
                          >
                            <CardContent>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Box sx={{ mr: 2 }}>{action.icon}</Box>
                                <Box>
                                  <Typography variant="subtitle1">
                                    {action.title}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {action.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    Object.values(quickActions).map((category, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          {category.icon}
                          <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            {category.title}
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          {category.actions.map((action, actionIndex) => (
                            <Grid item xs={12} sm={6} key={actionIndex}>
                              <Card
                                variant="outlined"
                                sx={{
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    bgcolor: "action.hover",
                                  },
                                }}
                                onClick={action.action}
                              >
                                <CardContent>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        mr: 2,
                                        color: brandColors.primary,
                                      }}
                                    >
                                      {action.icon}
                                    </Box>
                                    <Box>
                                      <Typography variant="subtitle1">
                                        {action.title}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {action.description}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Activity Feed Section */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                height: "100%",
                background: `linear-gradient(45deg, ${brandColors.primary}15, ${brandColors.info}15)`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Activity Feed
              </Typography>
              <List>
                {activityFeed.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${activity.action}: ${activity.item}`}
                        secondary={activity.timestamp}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
