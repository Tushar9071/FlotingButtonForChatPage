import { useState } from "react";
import GenWidgetCode from "./genWidgetCode";

const GenCDNPage = () => {
  const [formData, setFormData] = useState({
    id: 1.1,
    name: "",
    backgroundprimaryColor: "#000000",
    buttonText: "#000000",
    position: "right",
    brandName: "Xyz",
    brandImg:
      "https://raw.githubusercontent.com/Tushar9071/FlotingButtonForChatPage/refs/heads/main/frontend/src/assets/liliya_logo.png",
    welcomeText: "Hi there!\nHow can I help you?",
    email: "",
    phone: "",
  });

  const [showWidget, setShowWidget] = useState(false);

  const handleChange = (key: any, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-screen p-10">
      <div className="w-full flex justify-center items-center">
        <div className="bg-green-50 p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-center font-bold text-4xl mb-8">
            Create WhatsApp Live Chat Widgets
          </h1>

          {/* Button Style Section */}
          <div className="bg-white p-6 rounded-md shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Button Style</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Brand Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.backgroundprimaryColor}
                    onChange={(e) =>
                      handleChange("backgroundprimaryColor", e.target.value)
                    }
                    className="border rounded w-12 h-10 p-1"
                  />
                  <input
                    type="text"
                    value={formData.backgroundprimaryColor}
                    onChange={(e) =>
                      handleChange("backgroundprimaryColor", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-medium">Position</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="position"
                    value="left"
                    checked={formData.position === "left"}
                    onChange={(e) => handleChange("position", e.target.value)}
                  />
                  Bottom-Left
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="position"
                    value="right"
                    checked={formData.position === "right"}
                    onChange={(e) => handleChange("position", e.target.value)}
                  />
                  Bottom-Right
                </label>
              </div>
            </div>
          </div>

          {/* Chat Widget Settings Section */}
          <div className="bg-white p-6 rounded-md shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Chat Widget Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Brand Name</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleChange("brandName", e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Phone Number with Country Code
                </label>
                <input
                  type="text"
                  placeholder="919000012345"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-1 font-medium">
                Welcome Text (max 40 chars)
              </label>
              <textarea
                value={formData.welcomeText}
                onChange={(e) => handleChange("welcomeText", e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-1 font-medium">Brand Image URL</label>
              <input
                type="text"
                value={formData.brandImg}
                onChange={(e) => handleChange("brandImg", e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setShowWidget(true);
              }}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded shadow">
              Generate Widget Code
            </button>
          </div>
          {showWidget && <GenWidgetCode formData={formData} />}
        </div>
      </div>
    </div>
  );
};

export default GenCDNPage;
