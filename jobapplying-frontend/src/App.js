import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate  } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import JobApplicationForm from "./Components/JobApplicationForm.js";
import JobApplicationList from "./Components/JobApplicationList.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import TeamMembers from "./TeamMembers.js";

function App() {
  //Added Form to add new job applying.
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/job-applications" element={<JobApplicationList />} />
          <Route path="/add-job" element={<JobApplicationForm />} />
          {/* <Route path="/update-job/:id" element={<UpdateJobApplication />} />
            <Route path="/delete-job" element={<h2>Delete Job Apply</h2>} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
