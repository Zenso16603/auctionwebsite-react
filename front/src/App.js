import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register/register";
import Portal from "./Portal"; // Assume this is your portal component
import PrivateRoute from "./components/PrivateRoute"; // Import the HOC
import Home from "./Home/Home";
import Login from "./login/login";
import Landing from "./Landing/Landing";
import Auction from "./Auction/Auction";
import ServiceReq from "./ServiceReq/ServiceReq";
import SubmitReq from "./submitreq/submitreq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submitrequirements" element={<PrivateRoute><SubmitReq /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route
          path="/portal"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auctiondetails" element={<PrivateRoute><Auction /></PrivateRoute>} />
        <Route path="/service" element={<PrivateRoute><ServiceReq /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
