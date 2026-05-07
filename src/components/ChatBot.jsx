import React, { useState, useRef, useEffect } from "react";
import "../css/ChatBot.css";

const ChatBot = ({ darkMode }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m ZuriBot. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const similarityScore = (text, keyword) => {
  text = text.toLowerCase();
  keyword = keyword.toLowerCase();

  if (text.includes(keyword)) return 1;

  // partial match (fuzzy-like)
  let matches = 0;
  const words = keyword.split(" ");

  words.forEach(word => {
    if (text.includes(word)) matches += 1;
  });

  return matches / words.length;
};

  // SIMPLE RULE-BASED BRAIN
 const getBotResponse = (msg) => {
  const input = msg.toLowerCase();

  const intents = [
    {
      keywords: ["hello", "hi", "hey"],
      response: "Hello 👋 Welcome to ZuriCrafters!"
    },
    {
      keywords: ["product", "sell", "items", "crafts", "what do you sell"],
      response: "We sell handmade crafts like baskets, jewelry, and artwork"
    },
    {
      keywords: ["price", "cost", "how much"],
      response: "Prices vary depending on the craft. You can view them in the home section"
    },
    {
      keywords: ["delivery", "shipping", "deliver", "order", "get my item"],
      response: "We offer delivery across different locations. Delivery time depends on your area."
    },
    {
      keywords: ["pay", "payment", "mpesa", "card"],
      response: "We accept M-Pesa"
    },
    {
      keywords: ["location", "where", "based"],
      response: "ZuriCrafters connects artisans from different regions in Kenya"
    },
    {
      keywords: ["contact", "support", "help"],
      response: "You can contact us through the contact page or support email"
    },
    {
        keywords: ["thanks", "thank you", "thx"],
        response: "You're welcome! Is there anything else I can help you with?"
    },
    {
        keywords: ["bye", "goodbye", "see you"],
        response: "Goodbye! Have a great day"
    },
    {
        keywords: ["zuri", "crafters", "zuri crafters"],
        response: "ZuriCrafters is a platform that connects talented artisans across Kenya with customers who appreciate handmade crafts. We offer a wide range of products including baskets, jewelry, and artwork, all crafted with love and care. Our mission is to empower local artisans and promote Kenyan culture through unique, high-quality crafts."
    },
    {
        keywords: ["artisans", "makers", "craftspeople"],
        response: "Our artisans are skilled craftspeople from various regions in Kenya, each bringing their unique style and cultural heritage to their work. They create beautiful handmade products such as baskets, jewelry, and artwork using traditional techniques passed down through generations."
    },
    {
        keywords: ["sustainability", "eco-friendly", "environment"],
        response: "At ZuriCrafters, we are committed to sustainability. We work with artisans who use eco-friendly materials and traditional methods that minimize environmental impact. By supporting our platform, you are contributing to a more sustainable future for both the artisans and the planet."
    },
    {
        keywords: ["custom", "personalized", "bespoke"],
        response: "Yes! We offer custom orders. If you have a specific design or idea in mind, please contact us through the contact page and we will connect you with an artisan who can bring your vision to life."
    },
    {
        keywords: ["feedback", "suggestion", "improve"],
        response: "We value your feedback! Please reach out to us through the contact page with any suggestions or comments you have. Your input helps us improve and serve you better."
    },
    {
        keywords: ["events", "workshops", "classes"],
        response: "We occasionally host events and workshops to connect customers with our artisans. Please follow us on social media or subscribe to our newsletter for updates on upcoming events."
    },
    {
        keywords: ["return", "refund", "exchange"],
        response: "We want you to be happy with your purchase. If you have any issues with your order, please contact our support team through the contact page and we will assist you with returns, refunds, or exchanges."
    },
    {
        keywords: ["collaborate", "partnership", "work together"],
        response: "We are always open to collaborations and partnerships! If you are interested in working with us, please reach out through the contact page and we will get back to you as soon as possible."
    },
    {
        keywords: ["story", "about you", "who are you"],
        response: "I’m ZuriBot, your friendly assistant here to help you with any questions about ZuriCrafters. I can provide information about our products, artisans, payment options, and more. Feel free to ask me anything!"
    },
    {
        keywords: ["help", "assist", "support"],
        response: "I’m here to help! You can ask me about our products, prices, delivery options, payment methods, and more. Just type your question and I’ll do my best to assist you."
    },
    {
        keywords: ["recommend", "suggest", "what should i buy"],
        response: "I’d be happy to recommend something! If you’re looking for a unique piece of jewelry, our handmade beaded necklaces are very popular. For home decor, our woven baskets are a great choice. Let me know if you want more details on any of our products!"
    },
    {
        keywords:["bestseller", "popular", "favorite"],
        response: "Our bestsellers include our handmade beaded necklaces and woven baskets. They are loved by our customers for their unique designs and high quality. You can check them out in the home section!"
    },
    {
        keywords: ["gift", "present", "special occasion"],
        response: "Our crafts make wonderful gifts for special occasions! Whether you’re looking for a birthday present, anniversary gift, or something unique for a loved one, we have a variety of handmade items that would be perfect. Let me know if you need help finding the right gift!"
    }
  ];

  let bestMatch = {
    score: 0,
    response: null
  };

  intents.forEach((intent) => {
    intent.keywords.forEach((keyword) => {
      const score = similarityScore(input, keyword);

      if (score > bestMatch.score) {
        bestMatch = {
          score,
          response: intent.response
        };
      }
    });
  });

  if (bestMatch.score > 0.4) {
    return bestMatch.response;
  }

  return "Sorry, I didn’t understand that 🤔 Try asking about products, prices, delivery, or payment.";
};

  // 📩 SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotResponse(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className={`chat-box ${darkMode ? "chatbot-dark" : "chatbot-light"}`}>
          <div className="chat-header">
            ZuriBot
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "user" ? "msg user" : "msg bot"}
              >
                {msg.text}
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="chat-input"
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;