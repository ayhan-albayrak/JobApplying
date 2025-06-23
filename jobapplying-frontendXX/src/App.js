import { useEffect, useState } from "react";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(`${process.env.REACT_APP_API_BASE_URL}/api/JobApplications`);
    console.log(process.env.REACT_APP_API_BASE_URL);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/JobApplications`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  return (
    <div>
      <h1>Job Applying App</h1>
      <p>API Response: {message}</p>
    </div>
  );

  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   console.log(`${process.env.REACT_APP_API_BASE_URL}/api/JobApplications`);
  //   console.log(process.env.REACT_APP_API_BASE_URL);
  //   fetch(`${process.env.REACT_APP_API_BASE_URL}/api/JobApplications`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error fetching API:", error));
  // }, []);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //     <h1>Job Appliying App</h1>
  //     <p> API response : {message}</p>
  //   </div>
  // );
}

export default App;
