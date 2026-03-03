import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/Onboarding.css"; // Alag CSS file for styling

export default function Onboarding({ setFirstTime }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Get user geolocation
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          localStorage.setItem("userLocation", coords);
          setLocation(coords);
          // Simulate fetching nearby clinics
          setClinics([
            { name: "Ayur Clinic A", distance: "1.2 km" },
            { name: "Wellness Center B", distance: "2.3 km" },
            { name: "Herbal Therapy C", distance: "3.0 km" },
          ]);
        },
        (err) => {
          alert("Location access denied. Default location set.");
          setLocation("Jaipur");
          localStorage.setItem("userLocation", "Jaipur");
          setClinics([
            { name: "Ayur Clinic A", distance: "5 km" },
            { name: "Wellness Center B", distance: "6 km" },
          ]);
        }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const finishOnboarding = () => {
    setFirstTime();
    navigate("/patient/dashboard");
  };

  const sendMessage = () => {
    if (!chatMessage) return;
    // Simulate AI chatbot response
    const newChat = [...chatHistory, { sender: "You", text: chatMessage }];
    const botReply = {
      sender: "AyurBot",
      text: `Based on your info, I suggest trying Abhyanga therapy this week.`,
    };
    setChatHistory([...newChat, botReply]);
    setChatMessage("");
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-box">
        <h1>Welcome to AyurSutra!</h1>
        <p>Let's set up your profile and explore nearby clinics.</p>

        <div className="location-section">
          <h3>Your Location:</h3>
          <p>{location || "Fetching location..."}</p>
          <button onClick={fetchLocation}>Update Location</button>
        </div>

        <div className="clinics-section">
          <h3>Nearby Clinics:</h3>
          <ul>
            {clinics.map((c, i) => (
              <li key={i}>
                {c.name} - {c.distance}
              </li>
            ))}
          </ul>
        </div>

        <div className="chatbot-section">
          <h3>AyurBot Chat</h3>
          <div className="chat-window">
            {chatHistory.map((m, i) => (
              <div
                key={i}
                className={`chat-message ${m.sender === "You" ? "user" : "bot"}`}
              >
                <strong>{m.sender}:</strong> {m.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={chatMessage}
              placeholder="Ask about therapies..."
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        <button className="finish-btn" onClick={finishOnboarding}>
          Finish Onboarding
        </button>
      </div>
    </div>
  );
}
