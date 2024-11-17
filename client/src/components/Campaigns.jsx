import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import axios from "axios";
import API from "../utils/api";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [audienceSegments, setAudienceSegments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [error, setError] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  const [sentMessages, setSentMessages] = useState({}); // Store sent messages per campaign

  const fetchCampaigns = async () => {
    try {
      const response = await API.get("https://crm-campaign.onrender.com/api/campaign/get");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error.response?.data || error.message);
    }
  };

  const fetchAudienceSegments = async () => {
    try {
      const response = await API.get("https://crm-campaign.onrender.com/api/audience-segment");
      setAudienceSegments(response.data);
    } catch (error) {
      console.error("Error fetching audience segments:", error.response?.data || error.message);
    }
  };

  const handleCreateCampaign = async () => {
    if (!campaignName || !selectedSegmentId || !campaignMessage) {
      setError("All fields are required to create a campaign.");
      return;
    }

    try {
      const payload = {
        name: campaignName,
        audienceSegmentId: selectedSegmentId,
        message: campaignMessage,
      };

      const response = await axios.post("https://crm-campaign.onrender.com/api/campaign/create", payload);

      setCampaigns([response.data.campaign, ...campaigns]);
      setOpenDialog(false);
      setCampaignName("");
      setSelectedSegmentId("");
      setCampaignMessage("");
      setError("");
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to create campaign.");
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await API.delete(`https://crm-campaign.onrender.com/api/campaign/delete/${campaignId}`);
      setCampaigns(campaigns.filter((campaign) => campaign._id !== campaignId));
    } catch (error) {
      console.error("Error deleting campaign:", error.response?.data || error.message);
    }
  };

  const handleViewStatistics = async (campaignId) => {
    try {
      const response = await API.get(`https://crm-campaign.onrender.com/api/campaign/statistics/${campaignId}`);
      setStatistics(response.data);
      setOpenStatsDialog(true);
    } catch (error) {
      console.error("Error fetching campaign statistics:", error.response?.data || error.message);
    }
  };

  const handleSendMessages = async (campaignId) => {
    try {
      const response = await API.post(`https://crm-campaign.onrender.com/api/campaign/send-messages/${campaignId}`);
      const { communicationLogs } = response.data;

      setSentMessages((prev) => ({
        ...prev,
        [campaignId]: communicationLogs,
      }));

      alert("Messages sent successfully!");
    } catch (error) {
      console.error("Error sending messages:", error.response?.data || error.message);
      alert("Failed to send messages.");
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchAudienceSegments();
  }, []);

  return (
    <Box sx={{ padding: "30px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: "30px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          color: "#2C3E50",
          fontWeight: "bold",
        }}
      >
        Campaign Management
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#9b59b6",
          color: "#FFF",
          padding: "10px 20px",
          borderRadius: "25px",
          fontSize: "16px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          "&:hover": { backgroundColor: "#2980b9" },
        }}
        onClick={() => setOpenDialog(true)}
      >
        Create New Campaign
      </Button>

      <Grid container spacing={4} sx={{ marginTop: "30px" }}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign._id}>
            <Card
              sx={{
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "#34495e",
                    fontWeight: "bold",
                  }}
                >
                  {campaign.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: "10px", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#7f8c8d" }}
                >
                  {campaign.message}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginTop: "10px", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#95a5a6" }}
                >
                  Audience Size: {campaign.audienceSize}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", padding: "20px" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#9b59b6",
                    color: "#FFF",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#2980b9" },
                  }}
                  onClick={() => handleViewStatistics(campaign._id)}
                >
                  View Campaign Stats
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#3498db",
                    color: "#FFF",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#1f78d1" },
                  }}
                  onClick={() => handleSendMessages(campaign._id)}
                >
                  Send Messages
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#e74c3c",
                    color: "#FFF",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#c0392b" },
                  }}
                  onClick={() => handleDeleteCampaign(campaign._id)}
                >
                  Delete
                </Button>
              </CardActions>
              {sentMessages[campaign._id] && (
                <Box sx={{ padding: "10px" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      color: "#34495e",
                    }}
                  >
                    Sent Messages:
                  </Typography>
                  {sentMessages[campaign._id].map((log, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        color: log.status === "SENT" ? "#27ae60" : "#e74c3c",
                      }}
                    >
                      {log.message} - {log.status}
                    </Typography>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Create Campaign Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {/* Dialog Content */}
      </Dialog>

      {/* Campaign Statistics Dialog */}
      <Dialog open={openStatsDialog} onClose={() => setOpenStatsDialog(false)}>
        {/* Dialog Content */}
      </Dialog>
    </Box>
  );
};

export default Campaigns;
