import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";
import Dashboard from "../dashboard";
import Team from "../team";
import Form from "../form";
import FAQ from "../faq";
import BAP from "../bap";
import Calendar from "../calendar";

const ProtectedRoutes = () => {
  const user = useUser(); 
  const navigate = useNavigate();

  if (!user.loggedIn) {
    navigate("/login");
    return null;
  }

  return (
    
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/team" element={<Team teamData={teamData} />} />
      <Route path="/form" element={<Form onSubmit={handleFormSubmit} />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/bap" element={<BAP />} />
    </Routes>
  );
};

export default ProtectedRoutes;
