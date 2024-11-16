import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Grid, Typography, Card } from "@mui/material";
import axios from "axios";

const Audience = () => {
  const [conditions, setConditions] = useState([]); // Stores all conditions
  const [newCondition, setNewCondition] = useState({
    field: "",
    operator: "",
    value: "",
  }); // Temporarily stores a single condition
  const [logic, setLogic] = useState("AND"); // Logic (AND/OR) between conditions
  const [segmentName, setSegmentName] = useState(""); // Segment name
  const [segmentSize, setSegmentSize] = useState(null); // Segment size from backend
  const [matchedCustomers, setMatchedCustomers] = useState([]); // Matched customers from backend
  const [error, setError] = useState(""); // Error messages

  // Add a new condition
  const addCondition = () => {
    if (newCondition.field && newCondition.operator && newCondition.value) {
      setConditions([
        ...conditions,
        {
          ...newCondition,
          value: parseFloat(newCondition.value), // Ensure value is a number
        },
      ]);
      setNewCondition({ field: "", operator: "", value: "" }); // Reset input fields
      setError("");
    } else {
      setError("Please complete all fields before adding a condition.");
    }
  };

  // Remove a condition
  const removeCondition = (index) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  // Calculate segment size without saving
  const calculateSegmentSize = async () => {
    try {
      const payload = {
        conditions,
        logic, // Pass the selected logic (AND/OR)
        segmentName,
        saveSegment: false, // Do not save the segment
      };

      console.log("Request Payload:", payload); // Debugging the payload

      const response = await axios.post(
        "http://localhost:5000/api/audience-segment/calculatesegmentsize",
        payload
      );

      setSegmentSize(response.data.segmentSize); // Set the segment size
      setMatchedCustomers(response.data.matchedCustomers); // Set the matched customers
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while calculating the segment size."
      );
    }
  };

  // Save segment
  const saveSegment = async () => {
    try {
      const payload = {
        conditions,
        logic, // Pass the selected logic (AND/OR)
        segmentName,
        saveSegment: true, // Save the segment
      };

      console.log("Save Payload:", payload); // Debugging the payload

      await axios.post("http://localhost:5000/api/audience-segment/calculatesegmentsize", payload);

      setError("");
      alert("Segment saved successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while saving the segment."
      );
    }
  };

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Create Audience Segment
      </Typography>
      <Grid container spacing={2}>
        {/* Add Conditions Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Add Conditions:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Select
            value={newCondition.field}
            onChange={(e) => setNewCondition({ ...newCondition, field: e.target.value })}
            fullWidth
            displayEmpty
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
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={addCondition}>
            Add Condition
          </Button>
        </Grid>

        {/* List Conditions */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Conditions:</Typography>
          {conditions.map((condition, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <Typography>{`${condition.field} ${condition.operator} ${condition.value}`}</Typography>
              <Button
                onClick={() => removeCondition(index)}
                color="error"
                style={{ marginLeft: "8px" }}
              >
                Remove
              </Button>
            </div>
          ))}
        </Grid>

        {/* Logic Selector */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Logic Between Conditions:</Typography>
          <Select
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            fullWidth
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
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={6}>
          <Button variant="contained" onClick={calculateSegmentSize}>
            Calculate Segment Size
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={saveSegment}>
            Save Segment
          </Button>
        </Grid>

        {/* Error Messages */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        {/* Segment Size */}
        {segmentSize !== null && (
          <Grid item xs={12}>
            <Typography variant="h6">Segment Size: {segmentSize}</Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Audience;
