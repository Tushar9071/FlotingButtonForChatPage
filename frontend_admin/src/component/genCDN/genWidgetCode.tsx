import { useState } from "react";

const GenWidgetCode = ({ formData }: any) => {
  const scriptString = `
<script>
  let id = ${formData.id};

  document.addEventListener("DOMContentLoaded", function () {
    window.chatButtonOptions = {
      id: ${formData.id},
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

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptString);
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
          {scriptString}
        </pre>
      </div>
    </div>
  );
};

export default GenWidgetCode;
