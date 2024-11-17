import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import API from '../utils/api';

const Audience = () => {
  const [conditions, setConditions] = useState([]); 
  const [newCondition, setNewCondition] = useState({
    field: "",
    operator: "",
    value: "",
  }); // Temporarily stores a single condition
  const [logic, setLogic] = useState("AND"); 
  const [segmentName, setSegmentName] = useState(""); 
  const [segmentSize, setSegmentSize] = useState(null); 
  const [matchedCustomers, setMatchedCustomers] = useState([]); 
  const [error, setError] = useState("");

  const addCondition = () => {
    if (newCondition.field && newCondition.operator && newCondition.value) {
      setConditions([
        ...conditions,
        {
          ...newCondition,
          value: parseFloat(newCondition.value.trim()), 
        },
      ]);
      setNewCondition({ field: "", operator: "", value: "" });
      setError("");
    } else {
      setError("Please complete all fields before adding a condition.");
    }
  };

  const removeCondition = (index) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  const calculateSegmentSize = async () => {
    if (conditions.length === 0) {
      setSegmentSize(null); 
      setMatchedCustomers([]); 
    }

    try {
      const payload = {
        conditions,
        logic,
        saveSegment: false, 
      };

      const response = await API.post(
        "https://crm-campaign.onrender.com/api/audience-segment/calculatesegmentsize",
        payload
      );

      setSegmentSize(response.data.segmentSize); 
      setMatchedCustomers(response.data.matchedCustomers); 
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while calculating the segment size."
      );
    }
  };

  const saveSegment = async () => {
    try {
      const payload = {
        conditions,
        logic, 
        segmentName,
        saveSegment: true, // Save the segment
      };

      await API.post("https://crm-campaign.onrender.com/api/audience-segment/calculatesegmentsize", payload);

      setError("");
      alert("Segment saved successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while saving the segment."
      );
    }
  };

  const styles = {
    container: {
      margin: "20px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      fontFamily: "'Bricolage Grotesque', sans-serif",
      color: "#080A45",
    },
    header: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: 700,
      color: "#080A45",
    },
    subtitle: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: 500,
      color: "#080A45",
    },
    addConditionButton: {
      backgroundColor: "#6C63FF", 
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      borderRadius: "8px",
    },
    viewAudienceButton: {
      backgroundColor: "#4F46E5", 
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      borderRadius: "8px",
    },
    saveSegmentButton: {
      backgroundColor: "#4338CA", 
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      borderRadius: "8px",
    },
    tableHeader: {
      backgroundColor: "#080A45",
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <Card style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.header}>
        Create Audience Segment
      </Typography>
      <Grid container spacing={2}>
        {/* Add Conditions Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={styles.subtitle}>
            Add Conditions:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Select
            value={newCondition.field}
            onChange={(e) => setNewCondition({ ...newCondition, field: e.target.value })}
            fullWidth
            displayEmpty
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <MenuItem value="" disabled>
              Select Field
            </MenuItem>
            <MenuItem value="totalSpending">Total Spending</MenuItem>
            <MenuItem value="visitCount">Visit Count</MenuItem>
            <MenuItem value="lastVisitInMonths">Last Visit (Months)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select
            value={newCondition.operator}
            onChange={(e) => setNewCondition({ ...newCondition, operator: e.target.value })}
            fullWidth
            displayEmpty
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <MenuItem value="" disabled>
              Select Operator
            </MenuItem>
            <MenuItem value=">">Greater Than (&gt;)</MenuItem>
            <MenuItem value=">=">Greater Than or Equal (&gt;=)</MenuItem>
            <MenuItem value="<">Less Than (&lt;)</MenuItem>
            <MenuItem value="<=">Less Than or Equal (&lt;=)</MenuItem>
            <MenuItem value="==">Equal To (==)</MenuItem>
            <MenuItem value="!=">Not Equal To (!=)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            value={newCondition.value}
            onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
            placeholder="Value"
            fullWidth
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" style={styles.addConditionButton} onClick={addCondition}>
            Add Condition
          </Button>
        </Grid>

        {/* List Conditions */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={styles.subtitle}>
            Conditions:
          </Typography>
          {conditions.map((condition, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography style={styles.subtitle}>{`${condition.field} ${condition.operator} ${condition.value}`}</Typography>
              <Button
                onClick={() => removeCondition(index)}
                style={{
                  color: "#f44336",
                  fontWeight: "bold",
                  marginLeft: "8px",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </Grid>

        {/* Logic Selector */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={styles.subtitle}>
            Logic Between Conditions:
          </Typography>
          <Select
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            fullWidth
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <MenuItem value="AND">AND</MenuItem>
            <MenuItem value="OR">OR</MenuItem>
          </Select>
        </Grid>

        {/* Segment Name */}
        <Grid item xs={12}>
          <TextField
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Segment Name (Optional)"
            fullWidth
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={styles.viewAudienceButton}
            onClick={calculateSegmentSize}
          >
            View Audience
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={styles.saveSegmentButton}
            onClick={saveSegment}
          >
            Save Segment
          </Button>
        </Grid>

        {/* Error Messages */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {error}
            </Typography>
          </Grid>
        )}

        {/* Segment Size */}
        {segmentSize !== null && (
          <Grid item xs={12}>
            <Typography variant="h6" style={styles.subtitle}>
              Segment Size: {segmentSize}
            </Typography>
          </Grid>
        )}

        {/* Matched Customers Table */}
        {matchedCustomers.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper} style={{ marginTop: "20px", borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={styles.tableHeader}>Name</TableCell>
                    <TableCell style={styles.tableHeader}>Email</TableCell>
                    <TableCell style={styles.tableHeader}>Total Spending</TableCell>
                    <TableCell style={styles.tableHeader}>Visit Count</TableCell>
                    <TableCell style={styles.tableHeader}>Last Visit Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matchedCustomers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.totalSpending}</TableCell>
                      <TableCell>{customer.visitCount}</TableCell>
                      <TableCell>{new Date(customer.lastVisitDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Audience;
