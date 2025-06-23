import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupComponent from "./PopupComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "../style.css";

const JobApplicationList = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch job applications from API
  const fetchJobApplications = async () => {
    try {
      const response = await fetch("http://localhost:5242/api/JobApplications");
      const data = await response.json(); // Parse the JSON response
      console.log(data);
      // Check the response format in the console
      if (data && Array.isArray(data) && data.length > 0) {
        setJobApplications(data); // Set state if data exists
      } else {
        setError("No job applications found");
      }
    } catch (error) {
      setError("Error fetching job applications: " + error.message);
    }
  };

  // const updateJob = async (id) => {
  //   alert(id);
  // };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "" : parsedDate.toLocaleDateString("en-US");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job application?"
    );
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5242/api/JobApplications/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("✅ Job application deleted successfully");
        setJobApplications(jobApplications.filter((job) => job.id !== id)); // ✅ Update UI
        // 🔹 Redirect to job list after a short delay
        setTimeout(() => {
          navigate("/job-applications");
        }, 1000);
      } else {
        toast.error("❌ Failed to delete job application.");
      }
    } catch (error) {
      toast.error("❌ Error deleting job application.");
      // console.error("Error deleting job application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    console.log("handleEdit::", job);
    setSelectedJob(job); // ✅ Set the selected job for editing
    setIsOpen(true); // ✅ Open the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedJob.id) return;
    try {
      const response = await fetch(
        `http://localhost:5242/api/JobApplications/${selectedJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedJob),
        }
      );

      if (response.ok) {
        toast.success("✅ Job application updated successfully");
        // 🔹 Update the jobApplications list with the new data
        setJobApplications((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob.id ? { ...job, ...selectedJob } : job
          )
        );
        setIsOpen(false);
        // Refresh the list
        //fetchJobApplications();
      } else {
        toast.error("❌ Failed to update job application.");
      }
    } catch (error) {
      toast.error("❌ Error updating job application.");
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Job Applications</h1>
      {error && <p>{error}</p>}
      <ul className="form-control">
        {jobApplications
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((job) => (
            <li className="form-control" key={job.id}>
              <strong>Company:</strong> {job.company} <br />
              <strong>Position:</strong> {job.position} <br />
              <strong>Apply Date:</strong> {formatDate(job.applyDate)}
              <br />
              <strong>City:</strong> {job.city} <br />
              <strong>State:</strong> {job.state} <br />
              <strong>Zip Code:</strong> {job.zipCode} <br />
              <strong>Applying Link:</strong> {job.applyingLink || "N/A"} <br />
              <strong>Search Website:</strong> {job.searcWebsite} <br />
              {/* Trigger Popup for Editing */}
              <Button
                onClick={() => handleEdit(job)}
                variant="primary"
                size="lg"
              >
                ✏️ Edit
              </Button>
              {/* ✅ Add this Edit button */}
              <PopupComponent
                onConfirm={handleUpdate}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedJob={selectedJob}
              >
                <Form>
                  <Form.Group controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company"
                      name="company"
                      value={selectedJob.company || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter position"
                      name="position"
                      value={selectedJob.position || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="searcWebsite">
                    <Form.Label>Search Website</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter search website"
                      name="searcWebsite"
                      value={selectedJob.searcWebsite || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={selectedJob.city || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter state"
                      name="state"
                      value={selectedJob.state || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter zip code"
                      name="zipCode"
                      value={selectedJob.zipCode || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="applylink">
                    <Form.Label>Applying Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter applying link"
                      name="applyingLink"
                      value={selectedJob.applyingLink || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="applyDate">
                    <Form.Label>Apply Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="applyDate"
                      value={selectedJob.applyDate || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </PopupComponent>
              <Button
                onClick={() => handleDelete(job.id)}
                disabled={loading}
                size="lg"
                style={{ margin: "0px 0px 0px 5px" }}
                variant="danger"
              >
                {loading ? "Deleting...." : "🗑️ Delete"}
              </Button>
            </li>
          ))}
        {jobApplications.length > itemsPerPage && (
          <div className="d-flex justify-content-center mt-3">
            {Array.from(
              { length: Math.ceil(jobApplications.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`btn btn-sm mx-1 ${
                  page == currentPage ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </ul>
      <ToastContainer />
      {/* 🔹 Toast notifications */}
    </div>
  );
};
export default JobApplicationList;
