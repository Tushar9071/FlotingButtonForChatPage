import { useState } from "react";

const GenWidgetCode = ({ formData }: any) => {
  const scriptString = `
<script>
  let id = ${formData.id};

  document.addEventListener("DOMContentLoaded", function () {
    window.chatButtonOptions = {
      id: id,
      token: "${formData.token}",
      backgroundprimaryColor: "${formData.backgroundprimaryColor}",
      buttonText: "Chat with us",
      position: "${formData.position}",
    };

    window.brandOptions = {
      brandName: "${formData.brandName}",
      brandImg: "${formData.brandImg}",
      welcomeText: \`${formData.welcomeText}\`,
      backgroundprimaryColor: "${formData.backgroundprimaryColor}",
      backgroundsecondaryColor: "${formData.backgroundprimaryColor}",
      textprimaryColor: "#ffffff",
      textsecondaryColor: "#000000",
      buttonText: "Chat with us",
    };

    var s = document.createElement("script");
    s.src = "./dist/index.js";
    s.async = true;

    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  });
</script>
`.trim();

  const htmlBody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="${formData.brandImg}" alt="${
    formData.brandName
  }" style="max-height: 50px;"/>
    <h2 style="color: #333;">Hello from ${formData.brandName} 👋</h2>
  </div>

  <p style="font-size: 16px; color: #555;">
    Thank you for choosing our chat widget! Below is your unique script snippet.  
    Please copy and paste it into your website's <code>&lt;head&gt;</code> section.
  </p>

  <div style="background: #f9f9f9; border: 1px solid #ccc; padding: 15px; margin: 20px 0;">
    <textarea readonly style="width:100%; height:250px; border:none; resize:none; font-family: monospace; font-size:13px; color:#333; background:transparent;">
${scriptString}
    </textarea>
  </div>

  <p style="font-size: 14px; color: #777; text-align: center;">
    Need help? <a href="mailto:support@example.com" style="color: ${
      formData.backgroundprimaryColor
    }; text-decoration: none;">Contact our support</a>
  </p>

  <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
    © ${new Date().getFullYear()} ${formData.brandName}. All rights reserved.
  </div>
</div>

`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Generated Widget Code</h2>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700">
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      <div className="h-auto bg-white text-black p-4 rounded overflow-x-auto">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm">
          {htmlBody}
        </pre>
      </div>
    </div>
  );
};

export default GenWidgetCode;
