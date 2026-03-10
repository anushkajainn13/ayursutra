import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './Stylesheet/RecommendationPage.css'; 
import { TbRobot } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { LuSend } from "react-icons/lu";

// --- Dynamic AI Data ---
const symptomTags = [
  "Digestive Issues", "Stress & Anxiety", "Joint Pain", 
  "Insomnia", "Skin problems", "Fatigue", 
  "Weight management", "Headaches"
];

const therapyResponses = {
  "digestive issues": `Based on your concern about **digestive issues**, here are my recommendations:

### 🌿 Recommended Therapies
1. **Panchakarma Detox** — A comprehensive five-action detox program that cleanses the digestive tract and restores *Agni* (digestive fire).
   - *Available at:* Vedic Wellness Center (₹5,800) · AyurVida Spa (₹7,200)
2. **Udvartana** — Herbal powder massage that stimulates metabolism and aids digestion.
   - *Available at:* Prakruti Ayurveda Clinic (₹2,800)

### 🍵 Lifestyle Tips
- Start your day with warm water and lemon
- Avoid cold drinks during meals
- Practice mindful eating — chew each bite 20-30 times

Would you like to **book an appointment** for any of these therapies?`,

  "stress & anxiety": `For **stress & anxiety**, Ayurveda offers deeply calming therapies:

### 🧘 Recommended Therapies
1. **Shirodhara** — A continuous stream of warm herbal oil on the forehead that profoundly calms the nervous system.
   - *Available at:* Vedic Wellness Center (₹3,200) · AyurVida Spa (₹3,500)
   - *Practitioners:* Dr. Ananya Sharma, Dr. Suresh Pillai
2. **Abhyanga Massage** — Full-body warm oil massage to balance Vata dosha and release tension.
   - *Available at:* Vedic Wellness Center (₹2,500) · Prakruti Clinic (₹2,200)

### 🌙 Wellness Tips
- Practice *Pranayama* (breathing exercises) for 10 mins daily
- Use Brahmi or Ashwagandha supplements (consult your practitioner)
- Maintain a consistent sleep schedule

Shall I help you **schedule a Shirodhara session**?`,

  "joint pain": `For **joint pain**, here are the best Ayurvedic treatments:

### 💪 Recommended Therapies
1. **Pizhichil** — A royal oil bath combining warm medicated oil massage with heat therapy, excellent for joint stiffness.
   - *Available at:* AyurVida Spa & Resort (₹4,500)
   - *Practitioner:* Dr. Lakshmi Menon
2. **Abhyanga Massage** — Targeted oil massage that improves circulation and reduces inflammation in joints.
   - *Available at:* All clinics (₹2,200–₹2,500)

### 🏃 Lifestyle Recommendations
- Apply warm sesame oil to affected joints before bed
- Include turmeric and ginger in your diet
- Gentle yoga poses like *Trikonasana* and *Virabhadrasana*

Want me to help you **book a Pizhichil session**?`,

  "insomnia": `For **insomnia and sleep issues**, Ayurveda offers natural solutions:

### 😴 Recommended Therapies
1. **Shirodhara** — The warm oil stream on the forehead induces deep relaxation and resets your sleep cycle.
   - *Available at:* Vedic Wellness Center (₹3,200) · AyurVida Spa (₹3,500)
2. **Abhyanga Massage** — Evening oil massage calms Vata dosha, the primary cause of sleeplessness.
   - *Available at:* All clinics

### 🌿 Sleep Hygiene Tips
- Drink warm milk with nutmeg and ashwagandha before bed
- Massage your feet with warm sesame oil
- Avoid screens 1 hour before sleep
- Practice *Yoga Nidra* guided meditation

Would you like to **schedule a Shirodhara session** for better sleep?`,

  "skin problems": `For **skin problems**, here are Ayurvedic approaches:

### ✨ Recommended Therapies
1. **Udvartana** — Herbal powder massage that exfoliates, detoxifies, and rejuvenates the skin.
   - *Available at:* Prakruti Ayurveda Clinic (₹2,800)
2. **Panchakarma Detox** — Internal purification that addresses root causes of skin issues.
   - *Available at:* Vedic Wellness Center (₹5,800) · AyurVida Spa (₹7,200)

### 🌸 Skin Care Tips
- Apply neem and turmeric paste as a weekly face mask
- Drink aloe vera juice daily
- Identify your *Prakriti* (constitution) for personalized skincare

Shall I book a **skin consultation** with one of our practitioners?`,

  "fatigue": `For **chronic fatigue**, Ayurveda focuses on restoring vital energy:

### ⚡ Recommended Therapies
1. **Abhyanga Massage** — Nourishing oil massage that revitalizes tissues and boosts energy.
   - *Available at:* All clinics (₹2,200–₹2,500)
2. **Panchakarma Detox** — Removes accumulated toxins (*Ama*) that cause fatigue.
   - *Available at:* Vedic Wellness Center (₹5,800) · AyurVida Spa (₹7,200)

### 🔋 Energy-Boosting Tips
- Take Ashwagandha and Shatavari supplements
- Practice *Surya Namaskar* (Sun Salutation) every morning
- Eat warm, freshly cooked meals — avoid processed foods

Want to **schedule a rejuvenation therapy**?`,

  "weight management": `For **weight management**, Ayurveda offers holistic solutions:

### ⚖️ Recommended Therapies
1. **Udvartana** — Herbal powder massage that breaks down subcutaneous fat and improves metabolism.
   - *Available at:* Prakruti Ayurveda Clinic (₹2,800)
   - *Practitioner:* Dr. Meera Iyer
2. **Panchakarma Detox** — Eliminates toxins and resets metabolic function.
   - *Available at:* Vedic Wellness Center · AyurVida Spa

### 🥗 Diet & Lifestyle
- Follow a Kapha-pacifying diet (light, warm, spicy foods)
- Drink warm water with honey and lemon each morning
- Exercise during *Kapha time* (6–10 AM) for best results

Shall I help you **book an Udvartana session**?`,

  "headaches": `For **chronic headaches**, Ayurveda addresses the root cause:

### 🧠 Recommended Therapies
1. **Nasya Therapy** — Medicated nasal drops that clear sinuses and relieve head tension.
   - *Available at:* Prakruti Ayurveda Clinic (₹1,800)
   - *Practitioner:* Dr. Meera Iyer
2. **Shirodhara** — Calms the nervous system and relieves tension headaches and migraines.
   - *Available at:* Vedic Wellness Center (₹3,200) · AyurVida Spa (₹3,500)

### 💆 Quick Relief Tips
- Apply sandalwood paste on forehead and temples
- Practice *Anulom Vilom* (alternate nostril breathing)
- Stay hydrated — drink warm water throughout the day

Want to **book a Nasya therapy session**?`,
};

const defaultResponse = `Thank you for sharing your health concerns. Based on what you've described, I'd recommend starting with a **consultation** at one of our wellness centers for a personalized assessment.

### 🌿 General Recommendations
1. **Abhyanga Massage** — A great starting point for overall wellness and balance.
2. **Panchakarma Detox** — For deep cleansing and rejuvenation.

You can browse our therapies on the **Therapy Scheduling** page, or tell me more specific symptoms and I'll tailor my recommendations.`;

const welcomeMessage = `Welcome to **AyurSutra AI Consultation** 🙏\n\nI'm your Ayurvedic wellness assistant. I can help you find the right therapy based on your symptoms and health goals.\n\n**How can I help you today?** You can:\n- Describe your symptoms in your own words\n- Click on a symptom tag below to get started\n- Ask about specific Ayurvedic therapies\n\n*Tell me what's bothering you, and I'll recommend personalized treatments.*`;

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(therapyResponses)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes("digest") || lower.includes("stomach") || lower.includes("bloat")) return therapyResponses["digestive issues"];
  if (lower.includes("stress") || lower.includes("anxiety") || lower.includes("nervous")) return therapyResponses["stress & anxiety"];
  if (lower.includes("joint") || lower.includes("arthri") || lower.includes("knee") || lower.includes("back pain")) return therapyResponses["joint pain"];
  if (lower.includes("sleep") || lower.includes("insomnia")) return therapyResponses["insomnia"];
  if (lower.includes("skin") || lower.includes("acne") || lower.includes("eczema")) return therapyResponses["skin problems"];
  if (lower.includes("tired") || lower.includes("fatigue") || lower.includes("energy")) return therapyResponses["fatigue"];
  if (lower.includes("weight") || lower.includes("fat") || lower.includes("slim")) return therapyResponses["weight management"];
  if (lower.includes("headache") || lower.includes("migraine") || lower.includes("head")) return therapyResponses["headaches"];
  return defaultResponse;
}

// --- Main Component ---
const RecommendationPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTags, setShowTags] = useState(true);
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: welcomeMessage }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const newUserMsg = { id: Date.now(), sender: 'user', text: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    setShowTags(false);
    setIsTyping(true);

    // 2. Fetch AI Response
    setTimeout(() => {
      const responseText = getResponse(text);
      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200); // 1.2s delay for realism
  };

  const handleTagClick = (symptom) => {
    handleSendMessage(`I'm experiencing ${symptom}`);
  };

  return (
    <div className="ai-chat-container">
      
      {/* Chat Messages Area */}
      <div className="chat-history">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            
            <div className={`avatar ${msg.sender}`}>
              {msg.sender === 'ai' ? <TbRobot /> : <FiUser />}
            </div>

            <div className={`message-bubble ${msg.sender}`}>
              {/* ReactMarkdown magically renders all the bolding, headers, and lists! */}
              <div className="markdown-body">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>

          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="message-wrapper ai">
            <div className="avatar ai"><TbRobot /></div>
            <div className="message-bubble ai typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="chat-input-area">
        {showTags && (
          <div className="quick-tags-container">
            <p className="tags-label">Quick select a concern:</p>
            <div className="tags-scroll">
              {symptomTags.map(symptom => (
                <button 
                  key={symptom} 
                  className="ai-tag-btn"
                  onClick={() => handleTagClick(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-box-wrapper">
          <BsStars className="sparkle-icon" />
          <input 
            type="text" 
            className="ai-chat-input"
            placeholder="Describe your symptoms or ask about therapies..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            disabled={isTyping}
          />
          <button 
            className="send-btn"
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            style={{ opacity: (!inputText.trim() || isTyping) ? 0.5 : 1 }}
          >
            <LuSend />
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecommendationPage;