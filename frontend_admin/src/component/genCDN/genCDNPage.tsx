"use client";
import { useState } from "react";
import GenWidgetCode from "./genWidgetCode";
import toast, { Toaster } from "react-hot-toast";
import Chatbox1_1 from "./Chatbox1_1"; // Import the new Chatbox1_1 component

const GenCDNPage = () => {
  const [formData, setFormData] = useState({
    id: 1.1,
    name: "",
    backgroundprimaryColor: "#25D366", // Default to WhatsApp green
    buttonText: "Chat with us",
    position: "right",
    brandName: "Liliya WhatsApp",
    brandImg: "/src/assets/EmmaAvatar.png", // Use EmmaAvatar for the chat header
    welcomeText: "Hi there!\nHow can I help you?",
    email: "",
    phone: "",
    token: "",
  });
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateInputs = () => {
    if (!formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please enter both email and phone number.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      return false;
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number. Use digits only (10-15 length).");
      return false;
    }
    if (formData.welcomeText.length > 40) {
      toast.error("Welcome text must be at most 40 characters.");
      return false;
    }
    return true;
  };

  const handleSaveUserInDatabase = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      // This part assumes a backend is running at localhost:8000
      // For a full Vercel deployment, you would typically use Vercel Serverless Functions
      // or a different backend service.
      const res = await fetch("http://localhost:8000/api/add/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          data: {
            backgroundprimaryColor: formData.backgroundprimaryColor,
            buttonText: formData.buttonText,
            position: formData.position,
            brandName: formData.brandName,
            brandImg: formData.brandImg,
            welcomeText: formData.welcomeText,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to save user.");
      }

      const data = await res.json();
      setFormData({ ...formData, token: data.token });
      toast.success("User saved & widget generated! and send to your email.");
      setShowCode(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-3">
            <svg
              className="animate-spin h-5 w-5 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-800 font-medium">
              Generating widget...
            </span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-green-500 to-green-700 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <img
              src="/src/assets/main-logo-dark.png"
              alt="Liliya Logo"
              className="h-12 mb-4 mx-auto md:mx-0"
            />
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Create Your WhatsApp Live Chat Widget
            </h1>
            <p className="mt-3 text-lg opacity-90">
              Seamlessly connect with your customers directly on WhatsApp.
            </p>
          </div>
          {/* <div className="md:w-1/3 flex justify-center md:justify-end">
            <img
              src="/src/assets/user-work-svg.png"
              alt="Illustration"
              className="h-40 sm:h-48 object-contain"
            />
          </div> */}
        </div>

        <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Widget Configuration
            </h2>
            {/* Button Style Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Button Style
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="brandColor"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="brandColor"
                    value={formData.backgroundprimaryColor}
                    onChange={(e) =>
                      handleChange("backgroundprimaryColor", e.target.value)
                    }
                    className="border rounded-md w-14 h-10 p-1 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.backgroundprimaryColor}
                    onChange={(e) =>
                      handleChange("backgroundprimaryColor", e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      value="left"
                      checked={formData.position === "left"}
                      onChange={(e) => handleChange("position", e.target.value)}
                      className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    Bottom-Left
                  </label>
                  <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      value="right"
                      checked={formData.position === "right"}
                      onChange={(e) => handleChange("position", e.target.value)}
                      className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    Bottom-Right
                  </label>
                </div>
              </div> */}
            </div>
            {/* Chat Widget Settings Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Chat Widget Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brandName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    value={formData.brandName}
                    onChange={(e) => handleChange("brandName", e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number with Country Code
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="919000012345"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="welcomeText"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Welcome Text (max 40 chars)
                </label>
                <textarea
                  id="welcomeText"
                  value={formData.welcomeText}
                  onChange={(e) => handleChange("welcomeText", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500 resize-y min-h-[80px]"
                  maxLength={40}
                />
              </div>
              <div>
                <label
                  htmlFor="brandImg"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Image URL
                </label>
                <input
                  type="text"
                  id="brandImg"
                  value={formData.brandImg}
                  onChange={(e) => handleChange("brandImg", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleSaveUserInDatabase}
                className="px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Generating..." : "Generate Widget Code"}
              </button>
            </div>
          </div>
          {/* Widget Preview Section */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-inner border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              Live Widget Preview
            </h3>
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center">
              {/* Render Chatbox1_1 component */}
              <Chatbox1_1 widgetConfig={formData} />
            </div>
          </div>
        </div>
        {showCode && (
          <div className="p-8 sm:p-10 border-t border-gray-200 mt-8">
            <GenWidgetCode formData={formData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenCDNPage;
