import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 For redirection
import { Button } from "@mui/material";

const JobApplicationForm = () => {
  const navigate = useNavigate(); //initialize navigate

  const [formData, setFormData] = useState({
    applyDate: "",
    company: "",
    position: "",
    searcWebsite: "",
    city: "",
    state: "",
    zipCode: "",
    applyingLink: "",
  });

  // Helper function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const day = String(parsedDate.getDate()).padStart(2, "0"); // Add leading zero if necessary
    return `${year}-${month}-${day}`; // Returns date in YYYY-MM-DD format
  };

  //Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Handle Add Record submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5242/api/JobApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("Job Application saved successfully");
    } else {
      console.log("Failed to save Job Application");
    }
    if (response.ok) {
      console.log("✅ Job Application saved successfully");
      navigate("/job-applications"); // ✅ Redirect after successful save
    } else {
      console.log("❌ Failed to save Job Application");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div>
          <h2 className="text-center">Job Application Form</h2>
          <form onSubmit={handleSubmit} className="form-group">
            <div className="mb-3">
              <label className="form-label">Apply Date</label>
              <input
                type="date"
                name="applyDate"
                className="form-control"
                value={formData.applyDate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                type="text"
                name="position"
                className="form-control"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Searc Website</label>
              <input
                type="text"
                name="searcWebsite"
                className="form-control"
                value={formData.searcWebsite}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                className="form-control "
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apply Link</label>
              <input
                type="text"
                name="applyingLink"
                className="form-control"
                value={formData.applyingLink}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default JobApplicationForm;
