// import "./chatbox.css";
import background from "../../assets/background.png";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  buttons?: MessageButton[];
}

interface MessageButton {
  id: string;
  text: string;
  type: "trigger" | "response";
}

const ChatboxTest = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedMessages, setClickedMessages] = useState<Set<string>>(
    new Set()
  );
  const [selectedButtons, setSelectedButtons] = useState<
    Record<string, string>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Fetch initial welcome message and available buttons
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch initial welcome message
      const welcomeResponse = await fetch(
        "http://localhost:8000/api/chat/welcome"
      );
      let welcomeMessage: Message | null = null;

      if (welcomeResponse.ok) {
        const welcomeData = await welcomeResponse.json();
        if (welcomeData.message) {
          welcomeMessage = {
            id: "welcome",
            text: welcomeData.message,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
      }

      // Fetch available buttons
      const buttonsResponse = await fetch(
        "http://localhost:8000/api/chat/buttons"
      );
      let initialButtons: MessageButton[] = [];

      if (buttonsResponse.ok) {
        const buttonsData = await buttonsResponse.json();
        initialButtons = buttonsData.buttons || [];
      }

      // Set messages
      const messages: Message[] = [];

      if (welcomeMessage) {
        messages.push(welcomeMessage);
      }

      // Add button message if there are initial buttons
      if (initialButtons.length > 0) {
        const buttonMessage: Message = {
          id: "initial-buttons",
          text: "",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          buttons: initialButtons,
        };
        messages.push(buttonMessage);
      }

      setMessages(messages);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      // Fallback to default message with default button
      const defaultMessage: Message = {
        id: "default",
        text: "Hi there 👋\nHow can I help you today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const defaultButtonMessage: Message = {
        id: "default-buttons",
        text: "",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        buttons: [{ id: "1", text: "hi", type: "trigger" }],
      };

      setMessages([defaultMessage, defaultButtonMessage]);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = async (buttonText: string, messageId: string) => {
    if (!buttonText.trim() || isLoading) return;

    // Mark which button was selected
    setSelectedButtons((prev) => ({ ...prev, [messageId]: buttonText }));

    // Add a small delay to show the button selection, then hide all buttons in this message
    setTimeout(() => {
      setClickedMessages((prev) => new Set([...prev, messageId]));
    }, 200);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: buttonText,
      sender: "user",
      timestamp: getCurrentTime(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: buttonText }),
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

      // Add button message if there are next buttons
      if (data?.nextButtons && data.nextButtons.length > 0) {
        const buttonMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "", // Empty text for button message
          sender: "bot",
          timestamp: getCurrentTime(),
          buttons: data.nextButtons, // Add buttons to message
        };
        setMessages((prev) => [...prev, buttonMessage]);
      } else {
        // If no next buttons provided, conversation ends
        console.log("Conversation completed");
      }
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-20 right-6 z-50"
    >
      <div className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-green-600 font-bold text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">AI Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <p className="text-sm opacity-90">Online now</p>
            </div>
          </div>
          <div className="text-white/80 hover:text-white transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="h-96 overflow-y-auto bg-gray-50 px-4 py-3"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col max-w-xs">
                  {/* Message bubble */}
                  {message.text && (
                    <div
                      className={`px-4 py-3 rounded-2xl relative shadow-md ${
                        message.sender === "user"
                          ? "bg-green-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.text}
                      </p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.sender === "user"
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  )}

                  {/* Inline buttons */}
                  {message.buttons && message.buttons.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2">
                      {!clickedMessages.has(message.id) ? (
                        <AnimatePresence>
                          {message.buttons.map((button) => {
                            const isSelected =
                              selectedButtons[message.id] === button.text;
                            return (
                              <motion.button
                                key={button.id}
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                whileHover={{
                                  scale: isSelected ? 1 : 1.02,
                                  backgroundColor: isSelected
                                    ? "#10b981"
                                    : "#2563eb",
                                }}
                                whileTap={{
                                  scale: 0.95,
                                  backgroundColor: "#10b981",
                                }}
                                onClick={() =>
                                  sendMessage(button.text, message.id)
                                }
                                disabled={isLoading || isSelected}
                                className={`px-4 py-2 text-white text-sm rounded-full shadow-md transition-all duration-200 border hover:shadow-lg active:shadow-sm ${
                                  isSelected
                                    ? "bg-green-500 border-green-600 cursor-default"
                                    : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed border-blue-600"
                                }`}
                              >
                                {isSelected && <span className="mr-2">✓</span>}
                                {button.text}
                              </motion.button>
                            );
                          })}
                        </AnimatePresence>
                      ) : (
                        // Show selected button briefly after selection
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="px-4 py-2 bg-green-500 text-white text-sm rounded-full shadow-md border border-green-600"
                        >
                          <span className="mr-2">✓</span>
                          {selectedButtons[message.id]}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-gray-200 max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
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
                    <span className="text-xs text-gray-500 ml-2">
                      AI is typing...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Footer Status */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs">
                {isLoading ? "AI is responding..." : "Powered by AI Assistant"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatboxTest;
