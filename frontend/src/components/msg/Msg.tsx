// import "./chatbox.css";
import background from "../../assets/background.png";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const ChatboxTest = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there 👋\nHow can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: getCurrentTime(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: inputMessage }),
      });

      const data = await response.json();

      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data?.message || "Sorry, I didn't understand that.",
        sender: "bot",
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-20 bg-transparent right-6 rounded-full"
    >
      <div
        className={`sm:bottom-[70px] right-6 z-50 h-auto w-auto rounded-2xl shadow-lg overflow-hidden`}
      >
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-600 font-semibold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Chat Assistant</h3>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className={`w-full py-4 h-80 overflow-y-auto`}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col w-80 gap-4 rounded-lg px-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-60 px-3 py-2 pb-5 rounded-md relative ${
                    message.sender === "user" ? "bg-[#d8fcd2]" : "bg-white"
                  }`}
                >
                  <p
                    className={`text-sm whitespace-pre-line ${
                      message.sender === "user" ? "mr-5" : ""
                    }`}
                  >
                    {message.text}
                  </p>
                  <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                    {message.timestamp}
                  </span>
                  {/* Message tail */}
                  <div
                    className={`absolute top-3 w-0 h-0 border-t-8 border-b-8 ${
                      message.sender === "user"
                        ? "-right-2 border-l-8 border-transparent border-l-[#d8fcd2]"
                        : "-left-2 border-r-8 border-transparent border-r-white"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white max-w-60 px-3 py-2 pb-5 rounded-md relative">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full bg-white flex flex-col justify-center py-2 gap-2">
          <div className="px-5 flex flex-col gap-1">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatboxTest;
