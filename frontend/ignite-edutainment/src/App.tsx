import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./auth/StudentLogin";
import StudentRegister from "./auth/StudentRegister";
import TeacherLogin from "./auth/TeacherLogin";
import TeacherRegister from "./auth/TeacherRegister";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import GamesDashboard from "./components/student/GamesDashboard";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import React, { useEffect } from "react";
import "./App.css";

declare global {
  interface Window {
    botpressWebChat: any;
  }
}


const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // This function will run once when the component loads
    const openChat = () => {
      // This is the official Botpress function to open the chat window
      if (window.botpressWebChat) {
        window.botpressWebChat.send({ type: "trigger" });
      }
    };

    const chatButton = document.getElementById("clarifAI-button");
    if (chatButton) {
      chatButton.addEventListener("click", openChat);
    }

    // Cleanup the event listener when the component is unmounted
    return () => {
      if (chatButton) {
        chatButton.removeEventListener("click", openChat);
      }
    };
  }, []); // The empty array ensures this effect runs only once
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Student Routes */}
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/games" element={<GamesDashboard />} />

            {/* Teacher Routes */}
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher/register" element={<TeacherRegister />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

            {/* Common Routes */}
            <Route path="/search" element={<SearchPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      {/* START OF clarifAI CHATBOT BUTTON */}
      <div id="clarifAI-button" className="clarifAI-hexagon">
        <span>🦉</span>
      </div>
      {/* END OF clarifAI CHATBOT BUTTON */}
    </QueryClientProvider>
  );
};
export default App;