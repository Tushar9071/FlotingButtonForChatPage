import ChatOnWhatsapp from "./ChatOnWhatsapp";

const Chatbox1_1 = ({ widgetConfig }: { widgetConfig: any }) => {
  return (
    <div className="relative h-auto w-auto rounded-2xl shadow-lg overflow-hidden">
      <nav className="flex items-center px-5 py-3 bg-[#075E54]">
        <button className="rounded-full w-10 h-10 bg-white ml-2 overflow-hidden">
          <img
            className="h-full w-full"
            src={
              "https://raw.githubusercontent.com/Tushar9071/FlotingButtonForChatPage/refs/heads/main/frontend/src/assets/EmmaAvatar.png"
            }
            alt="Image"
          />
        </button>
        <div className="flex flex-col px-5 gap-[2px]">
          <h2 className="text-base text-white font-semibold">
            {widgetConfig.brandName}
          </h2>
          <p className=" text-xs text-gray-200">AI Chatbot Assistant</p>
        </div>
      </nav>
      <div
        className={`w-full py-6 `}
        style={{
          backgroundImage: `url(/src/assets/background.png)`, // Using the placeholder background
          backgroundSize: "cover",
        }}>
        <div className="flex flex-col w-80 gap-6 rounded-lg px-5">
          {/* Left-aligned message */}
          <div className="flex justify-start">
            <div className="bg-white max-w-60 px-3 py-2 pb-5 rounded-md relative">
              <p className="text-sm">
                {widgetConfig.welcomeText?.split("\n").map((line: string) => {
                  return (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </p>
              <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                09:41 AM
              </span>
              <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-white"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <ChatOnWhatsapp
              backgroundColor={widgetConfig.backgroundprimaryColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox1_1;
